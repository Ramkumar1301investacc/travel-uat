import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-travellers-age',
  templateUrl: './travellers-age.component.html',
  styleUrls: ['./travellers-age.component.css']
})
export class TravellersAgeComponent {

  currentValue: number = 1;
  toggleClass(e: any, className: string) {
    const hasClass = e.target.classList.contains(className);
    this.currentValue = e.target.value;
    if (hasClass) {
      e.target.classList.remove("active")
    }
    else {
      e.target.classList.add("active");

      let allSibling = e.target.parentElement.children;

      let allSiblingArray = Array.from(allSibling);

      allSiblingArray.map((sibling: any) => {
        if (sibling.value != this.currentValue) {
          sibling.classList.remove("active")
        }
      })
    }



    // let getAllLists = document.getElementsByTagName('li');
    // let getAllListsArray = Array.from(getAllLists)
    // console.log(getAllListsArray)

    // getAllListsArray.map((list) => {
    //   list.addEventListener('click', () => {

    //   })
    // })
  }

  statusValue = false;

  @Output() onButtonClick = new EventEmitter<object>();


   updateProgressBar(){
    console.log("clicked Buttton")
    const moveProgress=document.querySelector('.cable-car') as HTMLElement | null;
    if (moveProgress) {
      
      moveProgress.style.marginLeft = '430px';
      
      // transition properties
      moveProgress.style.transition = 'margin-left 5s ease';

      moveProgress.style.animationDuration = '3s';

      moveProgress.style.animationIterationCount = 'infinite';
      moveProgress.style.animationDirection = 'alternate';
    }else{
      console.log('Style Not Applied ')
    }
      // Emit an event to notify the parent component
      this.onButtonClick.emit();
   }


  
 


}
