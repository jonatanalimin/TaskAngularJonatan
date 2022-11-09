import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Freelancer } from '../model/freelancer';
import { FreelancersService } from '../service/freelancers.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  person: Freelancer | undefined

  constructor(
    private route: ActivatedRoute,
    private freelancerService: FreelancersService
  ) { }

  ngOnInit(): void {
    this.getProfile()
  }

  getProfile(): void {
    this.freelancerService.getFreelancer(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe(resp => this.person = resp)
  }

}
