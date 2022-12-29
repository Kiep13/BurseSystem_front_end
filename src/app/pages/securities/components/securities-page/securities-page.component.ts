import {Component, OnInit} from '@angular/core';
import {Security} from '../../../../shared/interfaces';
import {HttpService} from '../../../../shared/services/http.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-securities-page',
  templateUrl: './securities-page.component.html',
  styleUrls: ['./securities-page.component.scss']
})
export class SecuritiesPageComponent implements OnInit {

  securities: Security[];
  loading = false;
  currentPage = 1;
  amountPages: number;

  constructor(private httpService: HttpService,
              private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.httpService.getSecurities()
      .subscribe(response => {
        this.securities = response;
        this.amountPages = Math.ceil(this.securities.length / 10);
        this.loading = false;
      },  () => {
        this.router.navigate(['/error']);
      });
  }

  setPage(value: number) {
    this.currentPage = value;
    console.log(this.currentPage);
  }

  delete(id: number) {
    console.log(id);
    this.httpService.deleteSecurity(id)
      .subscribe(() => {
        console.log('deleted');
        this.securities = this.securities.filter(security => security.id !== id);
        this.amountPages = Math.ceil(this.securities.length / 10);
      });
  }
}
