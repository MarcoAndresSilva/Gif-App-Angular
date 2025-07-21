import { Component, signal, inject, computed, viewChild, ElementRef } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from './../../services/gifs.service';

@Component({
  selector: 'app-trending-page',
  // imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
})

export default class TrendingPageComponent {

  gifService = inject(GifService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  onScroll(event: Event){
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop; // determinar el viewpoint
    const scrollHeight = scrollDiv.scrollHeight; // cuanto el usuario ha hecoh scroll
    const clientHeight = scrollDiv.clientHeight;

    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;

    console.log({isAtBottom});
    

  }
}
