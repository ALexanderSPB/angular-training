import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges{
  private currentDate = new Date();
  @Input('appHighlight') creationDate: Date;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnChanges() {
    const container = this.el.nativeElement.querySelector('.course');
    if (this.creationDate <= this.currentDate && this.creationDate.getDate() > this.currentDate.getDate() - 14) {
      this.renderer.setStyle(container, 'border', 'solid 2px limegreen')
    } else if (this.creationDate > this.currentDate) {
      this.renderer.setStyle(container, 'border', 'solid 2px blue')
    }
  }
}
