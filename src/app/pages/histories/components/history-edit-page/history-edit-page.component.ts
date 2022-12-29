import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpService} from '../../../../shared/services/http.service';
import {History} from '../../../../shared/interfaces';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {FormValidators} from '../../../../shared/validators/FormValidators';
import {AlertService} from '../../../../shared/services/alert-service';

@Component({
  selector: 'app-history-edit-page',
  templateUrl: './history-edit-page.component.html',
  styleUrls: ['./history-edit-page.component.scss']
})
export class HistoryEditPageComponent implements OnInit {

  history: History = null;
  form: UntypedFormGroup;
  loading = true;
  submitted = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private httpService: HttpService,
              private alert: AlertService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.httpService.getHistoryById(+params.id)
        .subscribe(response => {
          this.history = response;
          this.form = new UntypedFormGroup({
            boardid: new UntypedFormControl(this.history.boardid, [Validators.required]),
            tradedate: new UntypedFormControl(new Date(this.history.tradedate), [Validators.required]),
            shortName: new UntypedFormControl(this.history.shortName, [Validators.required]),
            secid: new UntypedFormControl(this.history.secid, [Validators.required]),
            numTrades: new UntypedFormControl(this.history.numTrades,
              [FormValidators.negativeNumber]),
            value: new UntypedFormControl(this.history.value,
              [FormValidators.negativeNumber]),
            open: new UntypedFormControl(this.history.open,
              [FormValidators.negativeNumber]),
            low: new UntypedFormControl(this.history.low,
              [FormValidators.negativeNumber]),
            high: new UntypedFormControl(this.history.high,
              [FormValidators.negativeNumber]),
            legalClosePrice: new UntypedFormControl(this.history.legalClosePrice,
              [FormValidators.negativeNumber]),
            waprice: new UntypedFormControl(this.history.waprice,
              [FormValidators.negativeNumber]),
            close: new UntypedFormControl(this.history.close,
              [FormValidators.negativeNumber]),
            volume: new UntypedFormControl(this.history.volume,
              [FormValidators.negativeNumber]),
            marketPrice2: new UntypedFormControl(this.history.marketPrice2,
              [FormValidators.negativeNumber]),
            marketPrice3: new UntypedFormControl(this.history.marketPrice3,
              [FormValidators.negativeNumber]),
            admittedQuite: new UntypedFormControl(this.history.admittedQuite,
              [FormValidators.negativeNumber]),
            mp2ValTrd: new UntypedFormControl(this.history.mp2ValTrd,
              [FormValidators.negativeNumber]),
            marketPrice3TradeValue: new UntypedFormControl(this.history.marketPrice3TradeValue,
              [FormValidators.negativeNumber]),
            admittedValue: new UntypedFormControl(this.history.admittedValue,
              [FormValidators.negativeNumber]),
            waVal: new UntypedFormControl(this.history.waVal,
              [FormValidators.negativeNumber])
          });
          this.loading = false;
        });
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
      id: this.history.id,
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

    this.httpService.editHistory(history)
      .subscribe(response => {
        console.log(response);
        this.form.reset();
        this.submitted = false;
        this.alert.success('The history was updated successfully');
        this.router.navigate(['/histories']);
      },
        (error) => {
          console.log(error);
          this.alert.danger('Error when trying to update the history');
        });

  }
}
