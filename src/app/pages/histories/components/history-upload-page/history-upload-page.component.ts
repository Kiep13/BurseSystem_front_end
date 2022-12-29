import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../../shared/services/http.service';
import {Router} from '@angular/router';
import {AlertService} from '../../../../shared/services/alert-service';

@Component({
  selector: 'app-history-upload-page',
  templateUrl: './history-upload-page.component.html',
  styleUrls: ['./history-upload-page.component.scss']
})
export class HistoryUploadPageComponent implements OnInit {

  file: File | null;
  submitted = false;

  constructor(private httpService: HttpService,
              private router: Router,
              private alert: AlertService) { }

  ngOnInit(): void {
  }

  submit() {
    if (!this.file) {
      return;
    }
    this.submitted = true;

    const data = new FormData();
    data.append('file', this.file);

    this.httpService.uploadHistory(data)
      .subscribe(response => {
          this.submitted = false;
          this.alert.success('The file was read successfully');
          this.router.navigate(['/histories']);
        },
        (error) => {
          console.log(error);
          this.submitted = false;
          this.alert.danger('Error when trying to read the file');
        });
  }

}
