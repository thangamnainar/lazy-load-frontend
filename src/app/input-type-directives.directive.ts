import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[checkNumber]'
})
export class CheckNumber {

  constructor(private el: ElementRef) { }
  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const inputValue = this.el.nativeElement.value;
    const parsedValue = Number(inputValue);

    if (isNaN(parsedValue)) {
      this.el.nativeElement.value = '';
    } else {
      console.error ('erorr');

    }
  }

}
