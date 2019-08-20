import { Component, OnInit, ViewChild } from '@angular/core';

import { WorkflowService } from '@seniorsistemas/workflow-cockpit-angular';
import { UtilService } from 'src/app/services/util.service';
import { FormComponent } from 'src/app/shared/form/form.component';
import { FormConfig } from 'src/app/shared/form/form-config';
import { FormData } from 'src/app/shared/form/form-data';
import { ToastrService } from 'ngx-toastr';

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
    private utilService: UtilService,
    private toastrService: ToastrService
  ) {}

  async ngOnInit() {
    const formConfig: FormConfig = {
      justificativa: {
        show: true,
        review: true
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
    } catch (error) {
      this.utilService.handleError(error);
    }

    this.formComponent.setLoading(false);
    this.workflowService.onSubmit(this.saveForm.bind(this));
  }

  saveForm() {
    this.formComponent.setLoading(true);
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
      this.toastrService.error(
        'Verifique todos os campos obrigatórios',
        'Ocorreu um erro no formulário'
      );
    }

    this.formComponent.setLoading(false);
    this.workflowService.abortSubmit();
  }
}
