import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuOption {
  label: string;
  sublabel: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: 'side-menu-options.component.html'
})
export class SideMenuOptionsComponent { 
  menuOptions: MenuOption[] = [
    {
      label: 'Trending',
      sublabel: 'Gifs Trending',
      icon: 'fa-solid fa-fire fa-arrow-trend-up',
      route: '/dashboard/trending',
    },
    {
      label: 'Seaerch',
      sublabel: 'Search Gifs',
      icon: 'fa-solid fa-magnifying-glass',
      route: '/dashboard/search'
    },
    {
      label: 'Reports',
      sublabel: 'Manage Reports',
      icon: 'fa-solid fa-chart-line',
      route: '/dashboard/reports'
    },
  ]
}
