import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowModule } from '@seniorsistemas/workflow-cockpit-angular';

import { SharedModule } from '../shared/shared.module';
import { UtilService } from '../services/util.service';
import { ValidacaoComponent } from './validacao/validacao.component';
import { SolicitacaoComponent } from './solicitacao/solicitacao.component';
import { RevisaoComponent } from './revisao/revisao.component';

@NgModule({
  declarations: [SolicitacaoComponent, ValidacaoComponent, RevisaoComponent],
  imports: [CommonModule, WorkflowModule, SharedModule],
  providers: [UtilService]
})
export class VagasEstacionamentoModule {}
