import { inject, Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifService {

    private http = inject(HttpClient);

        loadTrendingGifs(){
            this.http.get('https://api.giphy.com/v1/gifs/trending?api_key=z29P1gtdUTknbqXFj64VHJB1osOyhQ6q')
        };
    
    
}