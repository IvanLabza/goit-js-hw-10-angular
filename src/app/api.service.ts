import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatApiService {
  private API_KEY =
    'live_EjHzbfxMfvNmIb0A1vYAtO3H8fByy8xAuyP3earydIzjE8qgyzmbVybgiRJNbJkK';
  private baseUrl = 'https://api.thecatapi.com/v1/';

  constructor(private http: HttpClient) {}

  fetchBreeds(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}breeds`, {
      headers: {
        'x-api-key': this.API_KEY,
      },
    });
  }

  fetchCatByBreed(breedId: string): Observable<any> {
    return this.http.get<any[]>(
      `${this.baseUrl}images/search?breed_ids=${breedId}`,
      {
        headers: {
          'x-api-key': this.API_KEY,
        },
      }
    );
  }
}
