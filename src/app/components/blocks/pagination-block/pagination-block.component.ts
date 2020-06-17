import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination-block',
  templateUrl: './pagination-block.component.html',
  styleUrls: ['./pagination-block.component.scss']
})
export class PaginationBlockComponent implements OnInit {

  @Input() currentPage: number;
  @Input() amountPages: number;

  @Output() onPage: EventEmitter<number> =  new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  setPage(value: number) {
    this.currentPage = value;
    this.onPage.emit(this.currentPage);
  }

}
