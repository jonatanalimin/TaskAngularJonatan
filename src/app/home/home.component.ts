import { Component, OnInit, ViewChild,  ElementRef} from '@angular/core';
import { Freelancer } from '../model/freelancer';
import { FreelancersService } from '../service/freelancers.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerService } from '../service/spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title:string = "";
  body:string = "";
  freelancers: Freelancer[] = [];
  searchText: string = "";
  closeResult: string = "";
  name: string="";
  @ViewChild('contentDel') mymodal: ElementRef | undefined;

  constructor(
    private freelancersService: FreelancersService,
    private modalService: NgbModal,
    private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void{
    this.spinnerService.requestStarted();
    this.freelancersService.getFreelancers()
      .subscribe({
        next: (resp) => {
          this.freelancers = resp;
          this.spinnerService.requestEnded();
        },
        error: () => this.spinnerService.resetSpinner()
      });
  }

  delete(content:any, person:Freelancer): void{
    this.name = person.name;
    const modalDelete = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    modalDelete.result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {
        this.spinnerService.requestStarted();
        this.freelancersService.deleteFreelancer(person.id)
          .subscribe({
            next: () => {
              this.title = "Succes Delete";
              this.body = `Success delete data ${this.name}`;
              this.modalService.open(this.mymodal, { ariaLabelledBy: 'modal-basic-title' }).result.then(
                () => {
                  this.freelancersService.getFreelancers()
                  .subscribe({
                    next: (resp) => {
                      this.freelancers = resp;
                      this.spinnerService.requestEnded();
                    },
                    error: () => this.spinnerService.resetSpinner()
                  });
                }, () => {
                  this.freelancersService.getFreelancers()
                  .subscribe({
                    next: (resp) => {
                      this.freelancers = resp;
                      this.spinnerService.requestEnded();
                    },
                    error: () => this.spinnerService.resetSpinner()
                  });
                }
              )
            },
            error: (err) => {
              this.spinnerService.resetSpinner();
              this.title = "Failed Delete";
              this.body = err.message;
              this.modalService.open(this.mymodal, { ariaLabelledBy: 'modal-basic-title' })
            }
        }) 
      }  
    }, (reason) => {  
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
    });
  }

  private getDismissReason(reason: any): string {  
    if (reason === ModalDismissReasons.ESC) {  
      return 'by pressing ESC';  
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {  
      return 'by clicking on a backdrop';  
    } else {  
      return `with: ${reason}`;  
    }  
  }  

  onChange(newValue: string): void{
    this.freelancersService.getFreelancerByName(newValue)
      .subscribe(resp => this.freelancers = resp);
  }

}
