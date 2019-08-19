import { Component, OnInit, ViewChild } from '@angular/core';

import { WorkflowService } from '@seniorsistemas/workflow-cockpit-angular';
import { UtilService } from 'src/app/services/util.service';
import { FormComponent } from 'src/app/shared/form/form.component';
import { FormConfig } from 'src/app/shared/form/form-config';
import { FormData } from 'src/app/shared/form/form-data';

@Component({
  selector: 'app-revisao',
  templateUrl: './revisao.component.html',
  styleUrls: ['./revisao.component.css']
})
export class RevisaoComponent implements OnInit {
  @ViewChild(FormComponent, { static: true })
  private formComponent: FormComponent;

  constructor(
    private workflowService: WorkflowService,
    private utilService: UtilService
  ) {}

  async ngOnInit() {
    const formConfig: FormConfig = {
      justificativa: {
        show: true,
        review: true
      }
    };

    this.formComponent.updateFormConfig(formConfig);
    const plataformDataAndVariables = await this.workflowService.requestPlatformDataAndVariables();

    const {
      colaborador_nome,
      colaborador_cargo,
      veiculo_nome,
      veiculo_placa,
      veiculo_ano,
      justificativa,
      solicitante
    } = plataformDataAndVariables;

    const data: FormData = {
      nome: colaborador_nome,
      cargo: colaborador_cargo,
      veiculo: {
        nome: veiculo_nome,
        placa: veiculo_placa,
        ano: Number(veiculo_ano)
      },
      justificativa,
      solicitante
    };

    this.formComponent.updateFormData(data);

    this.workflowService.onSubmit(this.saveForm.bind(this));
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
