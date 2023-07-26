import { Directive, Renderer2, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[defaultImage]'
})
export class DefaultImageDirective {
  @Input() defaultImage: string = 'https://static.thenounproject.com/png/2616533-200.png';

  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.setPlaceholderImage();
  }

  @HostListener('error')
  onError() {
    this.setPlaceholderImage();
  }

  private setPlaceholderImage() {
    this.renderer.setAttribute(this.el.nativeElement, 'src', this.defaultImage);
  }
}
