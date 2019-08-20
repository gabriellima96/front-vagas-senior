import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkflowService } from '@seniorsistemas/workflow-cockpit-angular';
import { UtilService } from 'src/app/services/util.service';
import { FormComponent } from 'src/app/shared/form/form.component';
import { FormConfig } from 'src/app/shared/form/form-config';
import { FormData } from 'src/app/shared/form/form-data';
import { ToastrService } from 'ngx-toastr';

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
    private utilService: UtilService,
    private toastrService: ToastrService
  ) {}

  async ngOnInit() {
    const formConfig: FormConfig = {
      justificativa: {
        show: true,
        review: false
      }
    };

    this.formComponent.updateFormConfig(formConfig);

    try {
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
    } catch (error) {
      this.utilService.handleError(error);
    }

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
        this.toastrService.error(
          'Justificativa é obrigátorio caso o veículo seja reprovado!',
          'Ocorreu um erro no formulário'
        );
      }
    } else {
      try {
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
      } catch (error) {
        this.utilService.handleError(error);
      }
    }

    this.workflowService.abortSubmit();
  }
}
