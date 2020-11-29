import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getAllCountry = () => {
    const url = `https://api.covid19api.com/countries`;
    return this.http.get(url).pipe(map(x => x));
  }
  getAllCountryDetails = () => {
    const url = `https://api.covid19api.com/summary`;
    return this.http.get(url).pipe(map(x => x));
  }
  getDataByDate = (country, fromDate, Todate) => {
    const url = ` https://api.covid19api.com/country/` + country + `?from=${fromDate}&to=${Todate}`;
    return this.http.get(url).pipe(map(x => x));
  }

}
