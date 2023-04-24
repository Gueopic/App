import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ROUTE_NAMES } from 'src/utils/global-variables.utils';

const routes: Routes = [
  {
    path: ROUTE_NAMES.home,
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: ROUTE_NAMES.home,
    pathMatch: 'full',
  },
  {
    path: ROUTE_NAMES.menu,
    loadChildren: () =>
      import('./menu/menu.module').then((m) => m.MenuPageModule),
  },
  {
    path: ROUTE_NAMES.playground,
    loadChildren: () =>
      import('./playground/playground.module').then(
        (m) => m.PlaygroundPageModule,
      ),
  },
  // Sidebar outlet
  {
    path: '',
    loadChildren: () =>
      import('./menu/menu.module').then((m) => m.MenuPageModule),
    outlet: 'sidebar',
    data: {
      isSidebar: true,
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
