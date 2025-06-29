import { GifService } from 'src/app/gifs/services/gifs.service';
import { Gif } from './../../interfaces/gif.interface';
import {Component, computed, inject, signal } from '@angular/core';

@Component({
  selector: 'app-gif-history',
  imports: [],
  templateUrl: './gif-history.component.html',

})
export default class GifHistoryComponent { 
  GifService = inject(GifService);
  gifHistory = computed(() => this.GifService.searchHistory());


  
}
