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

  @Output()
  onDeleteClick: EventEmitter<{ id: number; event: Event }> = new EventEmitter();

  deleteItem(id: number, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.onDeleteClick.emit({ id, event });
  }
}
