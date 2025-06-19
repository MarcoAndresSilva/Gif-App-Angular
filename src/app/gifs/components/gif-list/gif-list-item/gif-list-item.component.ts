import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-gif-list-item',
  imports: [],
  templateUrl: './gif-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifListItemComponent { }
