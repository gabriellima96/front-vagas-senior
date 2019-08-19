import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkflowService } from '@seniorsistemas/workflow-cockpit-angular';
import { UtilService } from 'src/app/services/util.service';
import {
  FormComponent,
  FormConfig,
  FormData
} from 'src/app/shared/form/form.component';

@Component({
  selector: 'app-validacao',
  templateUrl: './validacao.component.html',
  styleUrls: ['./validacao.component.css']
})
export class ValidacaoComponent implements OnInit {
  @ViewChild(FormComponent, { static: true })
  private formComponent: FormComponent;

  constructor(
    private workflowService: WorkflowService,
    private utilService: UtilService
  ) {}

  async ngOnInit() {
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

    const formConfig: FormConfig = {
      justificativa: {
        show: true,
        review: false
      }
    };

    this.formComponent.updateFormConfig(formConfig);

    const formData: FormData = {
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

    this.formComponent.updateFormData(formData);

    this.workflowService.onSubmit(this.saveForm.bind(this));
  }

  async saveForm(processStep, info) {
    if (!processStep.nextAction.finish) {
      this.formComponent.justificativaRequired();

      if (this.formComponent.isValid()) {
        const { justificativa } = this.formComponent.getData();
        return {
          formData: {
            justificativa
          }
        };
      } else {
        console.log('Ocorreu um error no formulário');
      }
    } else {
      console.log('Inserir os dados na tabela customizada');

      const token = await this.workflowService.getToken();

      const data = await this.formComponent.getData();

      await this.utilService.postSaveForm(
        {
          veiculoNome: data.veiculo.nome,
          veiculoPlaca: data.veiculo.placa.replace('-', ''),
          veiculoAno: data.veiculo.ano,
          solicitante: data.solicitante
        },
        token
      );

      return {
        formData: {
          justificativa: data.justificativa
        }
      };
    }

    this.workflowService.abortSubmit();
  }
}
