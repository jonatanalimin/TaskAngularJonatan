import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Freelancer, FreelancerModel } from '../model/freelancer';
import { FreelancersService } from '../service/freelancers.service';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerService } from '../service/spinner.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit {
  title:string = "";
  body:string = "";
  freelancer?: Freelancer;
  modelFreelancer = new FreelancerModel('', '', '', '');
  @ViewChild('content') mymodal: ElementRef | undefined;


  constructor(
    private freelancerService: FreelancersService,
    private router: Router,
    private modalService: NgbModal,
    private spinnerService: SpinnerService
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
      this.spinnerService.requestStarted();
      name = name.trim();
      phone = phone.trim();
      skill = skill.trim();
      notes = notes.trim();
      if(!name || !phone || !skill || !notes){
        this.spinnerService.resetSpinner();
        this.title = "Failed Add Data";
        this.body = "All field musn't empty!";
        this.modalService.open(this.mymodal, { ariaLabelledBy: 'modal-basic-title' });
        return;
      }
      this.freelancerService.postFreelancer({name, phone, skill, notes} as Freelancer)
        .subscribe({
          next: (resp) => {
                  this.spinnerService.requestEnded();
                  this.title = "Succes Add Data";
                  this.body = ""
                  this.freelancer = resp;
                  this.modalService.open(this.mymodal, { ariaLabelledBy: 'modal-basic-title' });
                  this.router.navigate(['home']);
                },
          error: (err) => {
                  this.spinnerService.resetSpinner();
                  this.title = "Failed Add Data";
                  this.body = err.message;
                  this.modalService.open(this.mymodal, { ariaLabelledBy: 'modal-basic-title' });
          }
        })
  }

}
