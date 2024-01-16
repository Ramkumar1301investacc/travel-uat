import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GetcountriesService {

  constructor(
    private http: HttpClient
  ) { }

  getCountriesApi() {
    return this.http.get('https://countriesnow.space/api/v0.1/countries')
  }
}
