import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MovieModel } from './core/models/movie.model';
import { MoviesService } from './core/services/movies.service';

import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'get-into-movies';
  movieForm: FormGroup;
  movieModel: MovieModel;
  errorMessage: string;
  hasError = false;
  searchProgressMessage: string;
  loading: boolean = false;
  loaded: boolean = false;
  dataReturned = 'False';
  searchBy = 'title';

  constructor(
    private fb: FormBuilder,
    private movieService: MoviesService,
    updates: SwUpdate
  ) {
    updates.activateUpdate().then(() => document.location.reload());
  };

  onSearch() {
    console.log(this.movieForm.value.searchBy);
    this.loading = true;
    this.loaded = false;
    let title = this.movieForm.value.title;
    let year = this.movieForm.value.year;
    let plot = this.movieForm.value.plot;
    this.searchBy = this.movieForm.value.searchBy;

    this.movieService.searchMovie(title, this.searchBy, year, plot).subscribe(
      (data) => {
        this.movieModel = data;
        this.loading = false;
        this.loaded = true;

        this.dataReturned = data.Response;

      },
      error => {
        this.hasError = true;
        this.loading = false;
        this.loaded = true;
        this.errorMessage = error.error.error.errors[0].message;

      }
    );
  }

  ngOnInit() {
    this.movieForm = this.fb.group({
      title: [''],
      searchBy: ['title'],
      year: [''],
      plot: ['']
    });
  }


}
