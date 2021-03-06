import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpService} from '../../../shared/services/http.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Security} from '../../../shared/interfaces';
import {FormValidators} from '../../../shared/validators/FormValidators';
import {AlertService} from '../../../shared/services/alert-service';

@Component({
  selector: 'app-security-edit-page',
  templateUrl: './security-edit-page.component.html',
  styleUrls: ['./security-edit-page.component.scss']
})
export class SecurityEditPageComponent implements OnInit {

  security: Security = null;
  form: FormGroup;
  loading = true;
  submitted = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private httpService: HttpService,
              private alert: AlertService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.httpService.getSecurityById(+params.id)
        .subscribe(response => {
          this.security = response;
          this.form = new FormGroup({
            secid: new FormControl(this.security.secid, [Validators.required]),
            shortName: new FormControl(this.security.shortName, [Validators.required]),
            regNumber: new FormControl(this.security.regNumber, [Validators.required]),
            name: new FormControl(this.security.name, [Validators.required, FormValidators.securityName]),
            isIn: new FormControl(this.security.isIn, [Validators.required]),
            isTraded: new FormControl(this.security.traded), // boolean
            emitentId: new FormControl(this.security.emitentId, [Validators.required, FormValidators.negativeNumber]),
            emitentTitle: new FormControl(this.security.emitentTitle, [Validators.required]),
            emitentInn: new FormControl(this.security.emitentInn, [Validators.required]),
            emitentOkpo: new FormControl(this.security.emitentOkpo, [Validators.required]),
            gosReg: new FormControl(this.security.gosReg, [Validators.required]),
            type: new FormControl(this.security.type, [Validators.required]),
            group_: new FormControl(this.security.group_, [Validators.required]),
            primaryBoarDid: new FormControl(this.security.primaryBoarDid, [Validators.required]),
            marketPriceBoarDid: new FormControl(this.security.marketPriceBoarDid, [Validators.required]),
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

    const security: Security = {
      id: this.security.id,
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

    this.httpService.editSecurity(security)
      .subscribe(response => {
        console.log(response);
        this.form.reset();
        this.submitted = false;
        this.alert.success('The security was updated successfully');
        this.router.navigate(['/securities']);
      },
        (error) => {
          console.log(error);
          this.alert.danger('Error when trying to update the history');
        });
  }

}
