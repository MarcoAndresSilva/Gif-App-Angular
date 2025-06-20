import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifListItemComponent } from "../../components/gif-list/gif-list-item/gif-list-item.component"; 


@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, SideMenuComponent, GifListComponent, GifListItemComponent],
  templateUrl: './dashboard-page.component.html',
})
export default class DashboardComponent { }
