import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import type  { GiphyResponse } from '../interfaces/giphy.interfaces';
import type { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';

@Injectable({providedIn: 'root'})

export class GifService {
    private http = inject(HttpClient);

    trendingGifs = signal<Gif[]>([]);
    trendingGifsLoading = signal(true);

    constructor() {
        this.loadTrendingGifs();
        console.log('Servicio inicializado');
        
    }

    loadTrendingGifs(){
        this.http
        .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`,{
            params: {
                api_key: environment.giphyApiKey,
                limit: 20,
            },
        })
        .subscribe((resp) => {
            const gifs = GifMapper.mapGiphyItemToGifArray(resp.data);
            console.log({gifs});
            this.trendingGifs.set(gifs);
            this.trendingGifsLoading.set(false);
        });
    };    
}