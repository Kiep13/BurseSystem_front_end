import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-error-block',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent {
}
