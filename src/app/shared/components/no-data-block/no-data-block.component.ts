import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-no-data-block',
  templateUrl: './no-data-block.component.html',
  styleUrls: ['./no-data-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoDataBlockComponent {
}
