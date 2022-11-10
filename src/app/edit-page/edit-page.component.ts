import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Freelancer, FreelancerModel } from '../model/freelancer';
import { FreelancersService } from '../service/freelancers.service';
import { SpinnerService } from '../service/spinner.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {
  title:string = "";
  body:string = "";
  freelancer?: Freelancer;
  empty: boolean = true;
  modelFreelancer = new FreelancerModel('', '', '', '');
  @ViewChild('content') mymodal: ElementRef | undefined;


  constructor(
    private freelancerService: FreelancersService ,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.spinnerService.requestStarted();
    this.freelancerService.getFreelancer(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe({
        next:  (resp) => {
          this.empty=false;
          this.modelFreelancer = resp;
          this.spinnerService.resetSpinner();
        },
        error: (err) => {
          this.spinnerService.resetSpinner();
        }
      })
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
      this.spinnerService.requestStarted();
      if(!name || !phone || !skill || !notes){
        this.spinnerService.resetSpinner();
        this.title = "Failed Edit Data";
        this.body = "All field musn't empty!";
        this.modalService.open(this.mymodal, { ariaLabelledBy: 'modal-basic-title' });
        return;
      }
      this.freelancerService.putFreelancer({id, name, phone, skill, notes} as Freelancer)
        .subscribe({
          next: (resp) => {
                  this.spinnerService.requestEnded();
                  this.title = "Succes Edit Data";
                  this.body = ""
                  this.freelancer = resp;
                  this.modalService.open(this.mymodal, { ariaLabelledBy: 'modal-basic-title' });
                  this.router.navigate(['home']);
                },
          error: (err) => {
                  this.spinnerService.resetSpinner();
                  this.title = "Failed Edit Data";
                  this.body = err.message;
                  this.modalService.open(this.mymodal, { ariaLabelledBy: 'modal-basic-title' });
          }
        })
  }

}
