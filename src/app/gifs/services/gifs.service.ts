import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import type  { GiphyResponse } from '../interfaces/giphy.interfaces';
import type { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';

const GIF_KEY = 'gifs';
const loadFromLocalStorage = () => {
    const gifsFromLocalStorage = localStorage.getItem('GIF_KEY') ?? '{}'; // record<string, Gif[]> 
    const gifs = JSON.parse(gifsFromLocalStorage);

    return gifs;
}

@Injectable({providedIn: 'root'})

export class GifService {
    private http = inject(HttpClient);

    trendingGifs = signal<Gif[]>([]);
    trendingGifsLoading = signal(true);

    searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
    searchHistoryKeys = computed(() => Object.keys(this.searchHistory())) ;  

    constructor() {
        this.loadTrendingGifs();
    }

    saveGifsToLocalStorage = effect(() => {
        const historyStrings = JSON.stringify(this.searchHistory());    
        localStorage.setItem('GIF_KEY', historyStrings);
    })


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
    
    searchGifs(query: string):Observable<Gif[]>{
        return this.http
        .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`,{
            params: {
                api_key: environment.giphyApiKey,
                q: query,
                limit: 20,
            },
        })
        .pipe(
            map(({data}) =>data),
            map((items) => GifMapper.mapGiphyItemToGifArray(items)),

            tap((items) => {
                this.searchHistory.update((history) => ({
                    ...history,
                    [query.toLowerCase()]: items,
                }));
            })
        );

    };

    getHistoryGifs(query: string): Gif[] {
        return this.searchHistory()[query] ?? []
    } 
}