import { Component, OnInit } from '@angular/core';
import {History} from '../../../shared/interfaces';
import {HttpService} from '../../../shared/services/http.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-histories-page',
  templateUrl: './histories-page.component.html',
  styleUrls: ['./histories-page.component.scss']
})
export class HistoriesPageComponent implements OnInit {

  histories: History[] = [];
  loading = false;
  currentPage = 1;
  amountPages: number;

  constructor(private httpService: HttpService,
              private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.httpService.getHistories()
      .subscribe(response => {
        this.histories = response;
        this.amountPages = Math.ceil(this.histories.length / 10);
        this.loading = false;

        console.log(this.currentPage);
        console.log(this.amountPages);
      }, () => {
        this.router.navigate(['/error']);
      });

  }

  setPage(value: number) {
    this.currentPage = value;
  }

  delete(id: number) {
    this.httpService.deleteHistory(id)
      .subscribe(() => {
        console.log('deleted');
        this.histories = this.histories.filter(history => history.id !== id);
        this.amountPages = Math.ceil(this.histories.length / 10);
      });
  }
}
