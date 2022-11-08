import { Component, OnInit } from '@angular/core';
import { Freelancer } from '../model/freelancer';
import { FreelancersService } from '../service/freelancers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  freelancers: Freelancer[] = [];

  constructor(private freelancersService: FreelancersService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void{
    this.freelancersService.getFreelancers()
      .subscribe(resp => this.freelancers = resp);
  }

}
