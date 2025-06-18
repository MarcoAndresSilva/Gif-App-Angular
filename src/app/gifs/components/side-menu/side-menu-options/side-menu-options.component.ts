import { Component } from '@angular/core';

interface MenuOption {
  label: string;
  sublabel: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [],
  templateUrl: 'side-menu-options.component.html'
})
export class SideMenuOptionsComponent { 
  MenuOptions: MenuOption[] = [
    {
      label: 'Trending',
      sublabel: 'Gifs Trending',
      icon: 'fa-solid fa-fire fa-chart-line',
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
