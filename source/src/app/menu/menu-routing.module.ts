import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LanguageSelectorPage } from './language-selector/language-selector.page';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'language',
    component: LanguageSelectorPage,
  },
  {
    pathMatch: 'full',
    path: '',
    component: MenuPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
