import { Component, Pipe, Renderer2 } from '@angular/core';

@Pipe({
  name: "phone"
})
export class PhonePipe {
  transform(rawNumb: string){
    rawNumb = rawNumb.charAt(0) != "0" ? "0" + rawNumb : rawNumb;
    let newStr = "";
    let i = 0;
    
    for(; i < (Math.floor(rawNumb.length / 4) - 1); i++){
      newStr = newStr + rawNumb.substring(i*4, i*4+4) + "-";
    }

    if(rawNumb.length % 4 > 0){
      newStr = newStr + rawNumb.substring(i*4, i*4+4) + "-";
      i++;
    }

    return newStr + rawNumb.substring(i*4);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TaskAngularJonatan';

  constructor() { }

}
