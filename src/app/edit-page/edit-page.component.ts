import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Freelancer, FreelancerModel } from '../model/freelancer';
import { FreelancersService } from '../service/freelancers.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {
  modelFreelancer = new FreelancerModel('', '', '', '');


  constructor(
    private freelancerService: FreelancersService ,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.freelancerService.getFreelancer(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe(resp => this.modelFreelancer = resp)
  }

  validateNo(e: any):boolean{
    const charCode = e.which ? e.which: e.keyCode;
    if(charCode > 31 && (charCode < 48 || charCode > 57)){
      return false
    }
    return true
  }

  onSubmit(): void {
    this.editFreelancer();
  }

  editFreelancer(
    id: number = Number(this.route.snapshot.paramMap.get('id')),
    name: string = this.modelFreelancer.name,
    phone: string = this.modelFreelancer.phone,
    skill: string = this.modelFreelancer.skill,
    notes: string = this.modelFreelancer.notes): void{
      name = name.trim();
      phone = phone.trim();
      skill = skill.trim();
      notes = notes.trim();
      if(!name || !phone || !skill || !notes){return}
      this.freelancerService.putFreelancer({id, name, phone, skill, notes} as Freelancer)
        .subscribe(resp => {
          alert(`Success edit: \n
            Name: ${resp.name}\n
            Phone: ${resp.phone}\n
            Skill: ${resp.skill}\n
            Notes: ${resp.notes}`);
          this.router.navigate(['home']);
      })
  }

}
