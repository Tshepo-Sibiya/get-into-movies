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

  searchMovie(title: string,): Observable<MovieModel> {
    return this.http
      .post<MovieModel>(
        environment.authUrl + `${title}`,
        null
      )
      .pipe(
        map((movie) => {
          return movie;
        })
      );
  }
}
