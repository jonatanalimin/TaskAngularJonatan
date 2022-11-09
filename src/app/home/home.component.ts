import { Component, OnInit, Input } from '@angular/core';
import { Freelancer } from '../model/freelancer';
import { FreelancersService } from '../service/freelancers.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  freelancers: Freelancer[] = [];
  searchText: string = "";
  closeResult: string = "";
  name: string="";

  constructor(
    private freelancersService: FreelancersService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void{
    this.freelancersService.getFreelancers()
      .subscribe(resp => this.freelancers = resp);
  }

  delete(content:any, person:Freelancer): void{
    this.name = person.name;
    const modalDelete = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    modalDelete.result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {
        console.log("Yes");
        this.freelancersService.deleteFreelancer(person.id)
          .subscribe(() => {
            window.location.reload();
            alert(`Success delete data ${this.name}`);
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
