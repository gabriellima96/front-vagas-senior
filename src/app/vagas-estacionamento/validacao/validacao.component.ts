import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { WorkflowService } from '@seniorsistemas/workflow-cockpit-angular';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-validacao',
  templateUrl: './validacao.component.html',
  styleUrls: ['./validacao.component.css']
})
export class ValidacaoComponent implements OnInit {
  public formData: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private workflowService: WorkflowService,
    private utilService: UtilService
  ) {
    this.formData = this.formBuilder.group({
      nome: [''],
      cargo: [''],
      veiculo: this.formBuilder.group({
        nome: ['', Validators.required],
        placa: ['', Validators.required],
        ano: [null, Validators.required]
      }),
      justificativa: [''],
      solicitante: ['', Validators.required]
    });
  }

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

    this.updateFormData({
      nome: colaborador_nome,
      cargo: colaborador_cargo,
      veiculo: {
        nome: veiculo_nome,
        placa: veiculo_placa,
        ano: veiculo_ano
      },
      justificativa,
      solicitante
    });

    this.workflowService.onSubmit(this.saveForm.bind(this));
  }

  updateFormData(form) {
    this.formData.patchValue({
      nome: form.nome,
      cargo: form.cargo,
      veiculo: {
        nome: form.veiculo.nome,
        placa: form.veiculo.placa,
        ano: form.veiculo.ano
      },
      justificativa: form.justificativa,
      solicitante: form.solicitante
    });
  }

  async saveForm(processStep, info) {
    if (!processStep.nextAction.finish) {
      const { justificativa } = this.formData.value;

      this.formData.controls.justificativa.setValidators([Validators.required]);
      this.formData.controls.justificativa.updateValueAndValidity();
      this.formData.patchValue({
        justificativa
      });

      if (this.formData.valid) {
        return {
          formData: {
            justificativa: this.formData.value.justificativa
          }
        };
      } else {
        console.log('Ocorreu um error no formulário');
      }
    } else {
      console.log('Inserir os dados na tabela customizada');

      const token = await this.workflowService.getToken();

      const result = await this.utilService.postSaveForm(
        {
          veiculoNome: this.formData.value.veiculo.nome,
          veiculoPlaca: this.formData.value.veiculo.placa.replace('-', ''),
          veiculoAno: this.formData.value.veiculo.ano,
          solicitante: this.formData.value.solicitante
        },
        token
      );

      return {
        formData: {
          justificativa: this.formData.value.justificativa
        }
      };
    }

    this.workflowService.abortSubmit();
  }
}
