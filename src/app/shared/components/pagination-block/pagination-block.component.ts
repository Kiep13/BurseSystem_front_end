import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-block',
  templateUrl: './pagination-block.component.html',
  styleUrls: ['./pagination-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationBlockComponent {
  @Input() public currentPage: number;
  @Input() public amountPages: number;

  @Output() public selectedPage: EventEmitter<number> = new EventEmitter<number>();

  public setPage(value: number): void {
    this.currentPage = value;
    this.selectedPage.emit(this.currentPage);
  }
}
