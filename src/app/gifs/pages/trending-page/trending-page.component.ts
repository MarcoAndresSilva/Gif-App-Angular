import { Component, inject,  viewChild, ElementRef } from '@angular/core';
import { GifService } from './../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
})

export default class TrendingPageComponent {

  gifService = inject(GifService);
  scrollStateService = inject(ScrollStateService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  onScroll(event: Event){
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop; // determinar el viewpoint
    const scrollHeight = scrollDiv.scrollHeight; // cuanto el usuario ha hecoh scroll
    const clientHeight = scrollDiv.clientHeight;

    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;
    this.scrollStateService.trendingScrollService.set(scrollTop);

    console.log({isAtBottom});

    if(isAtBottom){
      this.gifService.loadTrendingGifs();
    }
    

  }
}
