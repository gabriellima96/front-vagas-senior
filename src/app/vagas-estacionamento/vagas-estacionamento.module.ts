import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WorkflowModule } from '@seniorsistemas/workflow-cockpit-angular';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { UtilService } from '../services/util.service';

import { ValidacaoComponent } from './validacao/validacao.component';
import { SolicitacaoComponent } from './solicitacao/solicitacao.component';
import { SharedModule } from '../shared/shared.module';
import { RevisaoComponent } from './revisao/revisao.component';

@NgModule({
  declarations: [SolicitacaoComponent, ValidacaoComponent, RevisaoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WorkflowModule,
    InputTextModule,
    InputMaskModule,
    InputTextareaModule,
    SharedModule
  ],
  providers: [UtilService]
})
export class VagasEstacionamentoModule {}
