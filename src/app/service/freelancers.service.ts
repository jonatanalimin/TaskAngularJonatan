import { Injectable } from '@angular/core';
import { Freelancer } from '../model/freelancer';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FreelancersService {
  private baseUrl: string = 'http://localhost:3000/freelancers';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'})
  }

  getFreelancers(): Observable<Freelancer[]>{
    return this.http.get<Freelancer[]>(this.baseUrl)
  }
}
