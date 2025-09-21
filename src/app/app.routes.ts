import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { ElPolloLocoComponent } from './projects/el-pollo-loco/el-pollo-loco.component';

export const routes: Routes = [
    {path: '', component: MainContentComponent},
    {path: 'projects/el-pollo-loco', component: ElPolloLocoComponent}
];
