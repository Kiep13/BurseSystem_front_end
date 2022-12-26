import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {HistorySecurity, Options} from '../../shared/interfaces';
import {HttpService} from '../../shared/services/http.service';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-total-page',
  templateUrl: './total-page.component.html',
  styleUrls: ['./total-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TotalPageComponent implements OnInit {

  total: HistorySecurity[];
  loading = false;

  currentPage = 1;
  amountPages: number;

  form: UntypedFormGroup;
  tableHeaders = ['Secid', 'Registration number', 'Name', 'Emitent title', 'Trade date',
    'Number of trades', 'Starting price', 'Price for the last transaction'];

  mapTableHeaders = new Map([
    ['None', 'id'],
    ['Secid', 'secid'],
    ['Registration number', 'security.regNumber'],
    ['Name', 'security.name'],
    ['Emitent title', 'security.emitentTitle'],
    ['Trade date', 'tradedate'],
    ['Number of trades', 'numTrades'],
    ['Starting price', 'open'],
    ['Price for the last transaction', 'close']
  ]);


  constructor(private httpService: HttpService,
              private router: Router) {

    this.form = new UntypedFormGroup({
      sortList: new UntypedFormControl('None'),
      directionList: new UntypedFormControl('inc'),
      filterList: new UntypedFormControl('no filter'),
      dateMask: new UntypedFormControl(''),
      titleMask: new UntypedFormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.httpService.getTotalStatement()
      .subscribe(response => {
        this.total = response;
        this.amountPages = Math.ceil(this.total.length / 10);
        this.loading = false;
      }, () => {
        this.router.navigate(['/error']);
      });
  }

  setPage(value: number) {
    this.currentPage = value;
  }

  setSortField() {
    switch (this.form.get('filterList').value) {
      case 'no filter': this.makeSortedRequest(); break;
      case 'emitentTitle': this.makeFilterTitle(); break;
      case 'tradedate': this.makeFilterData(); break;
    }
  }

  setFilterType() {
    if (this.form.get('filterList').value === 'no filter') {
      this.makeSortedRequest();
      this.form.get('dateMask').reset();
      this.form.get('titleMask').reset();
      return;
    } else if (this.form.get('filterList').value === 'emitentTitle') {
      this.form.get('titleMask').reset();
    } else {
      this.form.get('dateMask').reset();
    }
  }

  makeSortedRequest() {
    const options: Options =  {
      sortField: this.mapTableHeaders.get(this.form.get('sortList').value),
      direction: this.form.get('directionList').value
    };

    this.httpService.getSortedTotal(options)
      .subscribe(response => {
        this.total = response;
        this.amountPages = Math.ceil(this.total.length / 10);
      });
  }

  makeFilterData() {
    const date = new Date(this.form.get('dateMask').value);
    date.setMinutes(date.getTimezoneOffset());
    console.log(date);

    const options: Options =  {
      sortField: this.mapTableHeaders.get(this.form.get('sortList').value),
      direction: this.form.get('directionList').value,
      filterDate: date
    };

    this.httpService.getFilteredByDataTotal(options)
      .subscribe(response => {
        this.total = response;
        this.amountPages = Math.ceil(this.total.length / 10);
      });
  }

  makeFilterTitle() {
    const options: Options =  {
      sortField: this.mapTableHeaders.get(this.form.get('sortList').value),
      direction: this.form.get('directionList').value,
      filterTitle: this.form.get('titleMask').value
    };

    this.httpService.getFilteredByTitleTotal(options)
      .subscribe(response => {
        this.total = response;
        this.amountPages = Math.ceil(this.total.length / 10);
      }, () => {
        this.router.navigate(['/error']);
      });
  }
}
