import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkflowService } from '@seniorsistemas/workflow-cockpit-angular';

import { UtilService } from 'src/app/services/util.service';
import { FormComponent } from 'src/app/shared/form/form.component';
import { FormConfig } from 'src/app/shared/form/form-config';
import { FormData } from 'src/app/shared/form/form-data';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.component.html',
  styleUrls: ['./solicitacao.component.css']
})
export class SolicitacaoComponent implements OnInit {
  public revisao = false;

  @ViewChild(FormComponent, { static: true })
  private formComponent: FormComponent;

  constructor(
    private workflowService: WorkflowService,
    private utilService: UtilService
  ) {}

  async ngOnInit() {
    const formConfig: FormConfig = {
      justificativa: {
        show: false,
        review: false
      }
    };

    this.formComponent.updateFormConfig(formConfig);
    await this.loadUserDataAndProfile();
    this.workflowService.onSubmit(this.saveForm.bind(this));
  }

  async loadUserDataAndProfile() {
    const token = await this.workflowService.getToken();
    const userData = await this.workflowService.requestUserData();

    const response = await this.utilService.getProfile(userData.subject, token);

    const formData: FormData = {
      nome: userData.fullname,
      cargo: response[0].TitRed,
      solicitante: userData.subject,
      justificativa: '',
      veiculo: {
        nome: '',
        placa: '',
        ano: null
      }
    };

    this.formComponent.updateFormData(formData);
  }

  saveForm() {
    if (this.formComponent.isValid()) {
      const data = this.formComponent.getData();
      return {
        formData: {
          colaborador_nome: data.nome,
          colaborador_cargo: data.cargo,
          veiculo_nome: data.veiculo.nome,
          veiculo_placa: data.veiculo.placa,
          veiculo_ano: data.veiculo.ano,
          solicitante: data.solicitante
        }
      };
    } else {
      console.log('Ocorreu um erro no formulário');
      this.workflowService.abortSubmit();
    }
  }
}
