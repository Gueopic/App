import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaygroundHomePage } from './playground-home.page';
import { PlaygroundComponentsPage } from './views/components/playground-components.page';

const routes: Routes = [
  {
    path: '',
    component: PlaygroundHomePage,
    children: [
      {
        path: '',
        redirectTo: 'components',
        pathMatch: 'full',
      },
      {
        path: 'components',
        component: PlaygroundComponentsPage,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaygroundPageRoutingModule {}
