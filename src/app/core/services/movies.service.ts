import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MovieModel } from '../models/movie.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient,) { }
  httpOptions = {
    headers: new HttpHeaders({})
  };

  searchMovie(title: string, searchBy, year: string, plot: string): Observable<MovieModel> {
    let _searchBy: string;
    switch (searchBy) {
      case 'title':
        _searchBy = `t=${title}`;
        break;
      case 'IMDb ID':
        _searchBy = `i=${title}`;
        break;

    };
    if (year != '')
      _searchBy = _searchBy + `&y=${year}`;
    if (plot != '')
      _searchBy = _searchBy + `&plot=${plot}`;
    return this.http
      .post<MovieModel>(
        environment.moviesBaseUrl + _searchBy,
        null
      )
      .pipe(
        map((movie) => {
          return movie;
        })
      );
  }
}
