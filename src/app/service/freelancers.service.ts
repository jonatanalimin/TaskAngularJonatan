import { Injectable } from '@angular/core';
import { Freelancer } from '../model/freelancer';
import { Observable} from 'rxjs';
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

  getFreelancer(id: number): Observable<Freelancer>{
    return this.http.get<Freelancer>(`${this.baseUrl}/${id}`)
  }

  getFreelancerByName(name: string): Observable<Freelancer[]>{
    let httpOptionsCustom = {
      headers: new HttpHeaders({'Content-type': 'application/json'}),
      params: {'name_like': name}
    };
    return this.http.get<Freelancer[]>(this.baseUrl, httpOptionsCustom);
  }

  deleteFreelancer(id: number): Observable<Freelancer>{
    return this.http.delete<Freelancer>(`${this.baseUrl}/${id}`)
  }

  postFreelancer(freelancer: Freelancer): Observable<Freelancer>{
    return this.http.post<Freelancer>(this.baseUrl, freelancer, this.httpOptions);
  }

  putFreelancer(freelancer: Freelancer): Observable<Freelancer>{
    return this.http.put<Freelancer>(`${this.baseUrl}/${freelancer.id}`, freelancer, this.httpOptions);
  }
}
