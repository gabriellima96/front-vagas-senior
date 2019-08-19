import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SolicitacaoComponent } from './vagas-estacionamento/solicitacao/solicitacao.component';
import { ValidacaoComponent } from './vagas-estacionamento/validacao/validacao.component';
import { RevisaoComponent } from './vagas-estacionamento/revisao/revisao.component';

const routes: Routes = [
  { path: 'solicitacao', component: SolicitacaoComponent },
  { path: 'revisao', component: RevisaoComponent },
  { path: 'validacao', component: ValidacaoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
