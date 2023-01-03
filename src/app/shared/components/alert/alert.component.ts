import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { DEFAULT_ALERT_DELAY } from '../../constants';
import { AlertTypes } from '../../enums';
import { IAlert } from '../../interfaces';
import { AlertService } from '../../services';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() public delay = DEFAULT_ALERT_DELAY;

  public text: string;
  public type: AlertTypes;

  private subscription: Subscription;

  public get solvedClass(): Record<string, boolean> {
    return {
      'alert-success': this.type === AlertTypes.Success,
      'alert-warning': this.type === AlertTypes.Warning,
      'alert-danger': this.type === AlertTypes.Danger,
    };
  }

  constructor(private alertService: AlertService,
              private changeDetector: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    this.subscription = this.alertService.alert$.subscribe((alert: IAlert) => {
      this.text = alert.text;
      this.type = alert.type;
      this.changeDetector.detectChanges();

      const timeout = setTimeout(() => {
        this.text = '';
        this.changeDetector.detectChanges();

        clearTimeout(timeout);
      }, this.delay);
    });
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
