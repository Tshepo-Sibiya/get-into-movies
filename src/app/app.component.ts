import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MovieModel } from './core/models/movie.model';
import { MoviesService } from './core/services/movies.service';

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
  dataReturned = false;

  constructor(
    private fb: FormBuilder,
    private movieService: MoviesService
  ) {

  };

  onSearch() {
    this.loading = true;
    const title = this.movieForm.value.title;

    this.movieService.searchMovie(title).subscribe(
      (data) => {
        this.searchProgressMessage = 'Login';
        this.movieModel = data;
        this.loading = false;
        this.loaded = true;
        console.log(data);
        this.dataReturned = data.Response;
        console.log(this.dataReturned);
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
    });
  }


}
