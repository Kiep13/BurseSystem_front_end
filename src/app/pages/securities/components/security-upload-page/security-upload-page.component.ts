import { Component } from '@angular/core';
import {Router} from '@angular/router';

import {AlertService, HttpService} from '../../../../shared/services';

@Component({
  selector: 'app-security-upload-page',
  templateUrl: './security-upload-page.component.html',
  styleUrls: ['./security-upload-page.component.scss']
})
export class SecurityUploadPageComponent {

  file: File | null;
  submitted = false;

  constructor(private httpService: HttpService,
              private router: Router,
              private alert: AlertService) {
  }

  submit() {
    if (!this.file) {
      return;
    }
    this.submitted = true;
    const data = new FormData();
    data.append('file', this.file);

    this.httpService.uploadSecurity(data)
      .subscribe(response => {
          console.log(response);
          this.submitted = false;
          this.alert.success('The file was read successfully');
          this.router.navigate(['/securities']);
        },
        (error) => {
          console.log(error);
          this.submitted = false;
          this.alert.danger('Error when trying to read the file');
        });
  }

}
