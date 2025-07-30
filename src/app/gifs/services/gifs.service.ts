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
    trendingGifsIsLoading = signal(false);
    private trendingGifsPage = signal(0);

    //[[gif,gif,gif],[gif,gif,gif],[gif,gif,gif]]
    trendingGifGroup = computed<Gif[][]>(() => {
        const groups = [];
        for (let index = 0; index < this.trendingGifs().length; index+=3) {
            const gifs = this.trendingGifs().slice(index, index + 3);
            groups.push(gifs);
        }
        console.log({groups});
        
        return groups; //[[g1,g2,g3],[g4,g5,g6],[g7,g8,g9]]
    })

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

        if(this.trendingGifsIsLoading()) return;

        this.trendingGifsIsLoading.set(true); // significa que entro la peticion

        this.http
            .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`,{
                params: {
                    api_key: environment.giphyApiKey,
                    limit: 20,
                    offset: this.trendingGifsPage() * 20
                },
            })
            .subscribe((resp) => {
                const gifs = GifMapper.mapGiphyItemToGifArray(resp.data);
                this.trendingGifs.update(currentGifs => [...currentGifs, ...gifs]); //voy a esparcir lso gifs actuales y los nuevos
                this.trendingGifsPage.update(page => page + 1);
                this.trendingGifsIsLoading.set(false);
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