import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-small-information-card',
  templateUrl: './small-information-card.component.html',
  styleUrl: './small-information-card.component.scss'
})
export class SmallInformationCardComponent {
  @Input() data!: any;

  @Output()
  onCardClick: EventEmitter<any> = new EventEmitter();

}
