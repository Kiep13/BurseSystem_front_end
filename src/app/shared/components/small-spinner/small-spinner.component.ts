import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-small-spinner',
  templateUrl: './small-spinner.component.html',
  styleUrls: ['./small-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmallSpinnerComponent {
}
