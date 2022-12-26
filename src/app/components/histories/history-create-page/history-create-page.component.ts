import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {FormValidators} from '../../../shared/validators/FormValidators';
import {HttpService} from '../../../shared/services/http.service';
import {History} from '../../../shared/interfaces';
import {Router} from '@angular/router';
import {AlertService} from '../../../shared/services/alert-service';


@Component({
  selector: 'app-history-create-page',
  templateUrl: './history-create-page.component.html',
  styleUrls: ['./history-create-page.component.scss']
})
export class HistoryCreatePageComponent implements OnInit {

  form: UntypedFormGroup;
  submitted = false;

  constructor(private httpService: HttpService,
              private router: Router,
              private alert: AlertService) {}

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      boardid: new UntypedFormControl('', [Validators.required]),
      tradedate: new UntypedFormControl('', [Validators.required]),
      shortName: new UntypedFormControl('', [Validators.required]),
      secid: new UntypedFormControl('', [Validators.required]),
      numTrades: new UntypedFormControl('',
        [FormValidators.negativeNumber]),
      value: new UntypedFormControl('',
        [FormValidators.negativeNumber]),
      open: new UntypedFormControl('',
        [FormValidators.negativeNumber]),
      low: new UntypedFormControl('',
        [FormValidators.negativeNumber]),
      high: new UntypedFormControl('',
        [FormValidators.negativeNumber]),
      legalClosePrice: new UntypedFormControl('',
        [FormValidators.negativeNumber]),
      waprice: new UntypedFormControl('',
        [FormValidators.negativeNumber]),
      close: new UntypedFormControl('',
        [FormValidators.negativeNumber]),
      volume: new UntypedFormControl('',
        [FormValidators.negativeNumber]),
      marketPrice2: new UntypedFormControl('',
        [FormValidators.negativeNumber]),
      marketPrice3: new UntypedFormControl('',
        [FormValidators.negativeNumber]),
      admittedQuite: new UntypedFormControl('',
        [FormValidators.negativeNumber]),
      mp2ValTrd: new UntypedFormControl('',
        [FormValidators.negativeNumber]),
      marketPrice3TradeValue: new UntypedFormControl('',
        [FormValidators.negativeNumber]),
      admittedValue: new UntypedFormControl('',
        [FormValidators.negativeNumber]),
      waVal: new UntypedFormControl('',
        [FormValidators.negativeNumber])
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    const date = new Date(this.form.get('tradedate').value);
    date.setMinutes(date.getTimezoneOffset());
    console.log(date);

    const history: History = {
      boardid: this.form.get('boardid').value,
      tradedate: date,
      shortName: this.form.get('shortName').value,
      secid: this.form.get('secid').value,
      numTrades: parseFloat(this.form.get('numTrades').value),
      value: parseFloat(this.form.get('value').value),
      open: parseFloat(this.form.get('open').value),
      low: parseFloat(this.form.get('low').value),
      high: parseFloat(this.form.get('high').value),
      legalClosePrice: parseFloat(this.form.get('legalClosePrice').value),
      waprice: parseFloat(this.form.get('waprice').value),
      close: parseFloat(this.form.get('close').value),
      volume: parseFloat(this.form.get('volume').value),
      marketPrice2: parseFloat(this.form.get('marketPrice2').value),
      marketPrice3: parseFloat(this.form.get('marketPrice3').value),
      admittedQuite: parseFloat(this.form.get('admittedQuite').value),
      mp2ValTrd: parseFloat(this.form.get('mp2ValTrd').value),
      marketPrice3TradeValue: parseFloat(this.form.get('marketPrice3TradeValue').value),
      admittedValue: parseFloat(this.form.get('admittedValue').value),
      waVal: parseFloat(this.form.get('waVal').value),
    };

    this.httpService.addHistory(history)
      .subscribe(response => {
        this.form.reset();
        this.submitted = false;
        this.alert.success('The history was added successfully');
        this.router.navigate(['/histories']);
      },
        (error) => {
          console.log(error);
          this.alert.danger('Error when trying to add the history');
        });

  }
}
