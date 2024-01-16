import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-country-search-box',
  templateUrl: './country-search-box.component.html',
  styleUrls: ['./country-search-box.component.css']
})
export class CountrySearchBoxComponent {
  enteredSearchValue: any = '';

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>

  onSearchTextChanged() {
    this.searchTextChanged.emit(this.enteredSearchValue)
  }
}
