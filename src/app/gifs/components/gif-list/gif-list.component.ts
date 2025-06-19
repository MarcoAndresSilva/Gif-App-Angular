import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-gif-list',
  imports: [],
  templateUrl: './gif-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifListComponent { }
