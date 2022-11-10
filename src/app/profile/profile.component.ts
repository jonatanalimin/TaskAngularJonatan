import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Freelancer } from '../model/freelancer';
import { FreelancersService } from '../service/freelancers.service';
import { SpinnerService } from '../service/spinner.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  person: Freelancer | undefined

  constructor(
    private route: ActivatedRoute,
    private freelancerService: FreelancersService,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.getProfile()
  }

  getProfile(): void {
    this.spinnerService.requestStarted();
    this.freelancerService.getFreelancer(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe({
        next: (resp) => {
          this.person = resp;
          this.spinnerService.requestEnded();
        },
        error: () => this.spinnerService.resetSpinner()
      })
  }

}
