import { Component, OnInit } from '@angular/core';
import { Freelancer, FreelancerModel } from '../model/freelancer';
import { FreelancersService } from '../service/freelancers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit {

  modelFreelancer = new FreelancerModel('', '', '', '');


  constructor(
    private freelancerService: FreelancersService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  validateNo(e: any):boolean{
    const charCode = e.which ? e.which: e.keyCode;
    if(charCode > 31 && (charCode < 48 || charCode > 57)){
      return false
    }
    return true
  }

  onSubmit(): void {
    this.addFreelancer();
  }

  addFreelancer(
    name: string = this.modelFreelancer.name,
    phone: string = this.modelFreelancer.phone,
    skill: string = this.modelFreelancer.skill,
    notes: string = this.modelFreelancer.notes): void{
      name = name.trim();
      phone = phone.trim();
      skill = skill.trim();
      notes = notes.trim();
      if(!name || !phone || !skill || !notes){return}
      this.freelancerService.postFreelancer({name, phone, skill, notes} as Freelancer)
        .subscribe(resp => {
          alert(`Success add: \n
            Name: ${resp.name}\n
            Phone: ${resp.phone}\n
            Skill: ${resp.skill}\n
            Notes: ${resp.notes}`);
          this.router.navigate(['home']);
      })
  }

}
