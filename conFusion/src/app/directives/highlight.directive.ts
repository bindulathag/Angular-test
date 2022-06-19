import { Directive, ElementRef, Renderer2, HostListener  } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private elementRef: ElementRef,
    private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.addClass(this.elementRef.nativeElement, 'highlight');//highlight is css class
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeClass(this.elementRef.nativeElement, 'highlight');
  }

}
