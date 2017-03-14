import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[app-dropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') get opened(){
    return this.isOpen;
  }

  @HostListener('mouseenter') open(){
    this.isOpen = !this.isOpen;
  }
  @HostListener('mouseleave') close(){
    this.isOpen = false;
  }

  isOpen: boolean = false;

  constructor() { }

}
