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

@NgModule({
  declarations: [SolicitacaoComponent, ValidacaoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WorkflowModule,
    InputTextModule,
    InputMaskModule,
    InputTextareaModule
  ],
  providers: [UtilService]
})
export class VagasEstacionamentoModule {}
