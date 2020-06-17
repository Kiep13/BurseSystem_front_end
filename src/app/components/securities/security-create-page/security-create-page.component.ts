import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormValidators} from '../../../shared/validators/FormValidators';
import {Security} from '../../../shared/interfaces';
import {HttpService} from '../../../shared/services/http.service';
import {Router} from '@angular/router';
import {AlertService} from '../../../shared/services/alert-service';

@Component({
  selector: 'app-security-create-page',
  templateUrl: './security-create-page.component.html',
  styleUrls: ['./security-create-page.component.scss']
})
export class SecurityCreatePageComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(private httpService: HttpService,
              private router: Router,
              private alert: AlertService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      secid: new FormControl('', [Validators.required]),
      shortName: new FormControl('', [Validators.required]),
      regNumber: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, FormValidators.securityName]),
      isIn: new FormControl('', [Validators.required]),
      isTraded: new FormControl(''), // boolean
      emitentId: new FormControl('', [Validators.required, FormValidators.negativeNumber]),
      emitentTitle: new FormControl('', [Validators.required]),
      emitentInn: new FormControl('', [Validators.required]),
      emitentOkpo: new FormControl('', [Validators.required]),
      gosReg: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      group_: new FormControl('', [Validators.required]),
      primaryBoarDid: new FormControl('', [Validators.required]),
      marketPriceBoarDid: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    const security: Security = {
      secid: this.form.get('secid').value,
      shortName: this.form.get('shortName').value,
      regNumber: this.form.get('regNumber').value,
      name: this.form.get('name').value,
      isIn: this.form.get('isIn').value,
      traded: this.form.get('isTraded').value,
      emitentId: this.form.get('emitentId').value,
      emitentTitle: this.form.get('emitentTitle').value,
      emitentInn: this.form.get('emitentInn').value,
      emitentOkpo: this.form.get('emitentOkpo').value,
      gosReg: this.form.get('gosReg').value,
      type: this.form.get('type').value,
      group_: this.form.get('group_').value,
      primaryBoarDid: this.form.get('primaryBoarDid').value,
      marketPriceBoarDid: this.form.get('marketPriceBoarDid').value,
    };

    this.httpService.addSecurity(security)
      .subscribe(response => {
        console.log(response);
        this.form.reset();
        this.submitted = false;
        this.alert.success('The security was added successfully');
        this.router.navigate(['/securities']);
      },
        (error) => {
          console.log(error);
          this.alert.danger('Error when trying to add the security');
        });
  }

}
