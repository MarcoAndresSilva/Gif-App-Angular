import { Component } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifListItemComponent } from "../../components/gif-list/gif-list-item/gif-list-item.component";

@Component({
  selector: 'app-trending-page',
  imports: [GifListComponent, GifListItemComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent { }
