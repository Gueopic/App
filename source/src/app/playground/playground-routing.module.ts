import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaygroundHomePage } from './playground-home.page';
import { PlaygroundComponentsPage } from './views/components/playground-components.page';
import { PlaygroundDatabasePage } from './views/database/playground-database.page';
import { PlaygroundStatesPage } from './views/states/playground-states.page';

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
      {
        path: 'states',
        component: PlaygroundStatesPage,
      },
      {
        path: 'database',
        component: PlaygroundDatabasePage,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaygroundPageRoutingModule {}
