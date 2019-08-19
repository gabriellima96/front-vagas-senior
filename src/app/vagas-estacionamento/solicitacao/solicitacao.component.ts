import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WorkflowService } from '@seniorsistemas/workflow-cockpit-angular';

import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.component.html',
  styleUrls: ['./solicitacao.component.css']
})
export class SolicitacaoComponent implements OnInit {
  public formData: FormGroup;
  public revisao = false;

  constructor(
    private formBuilder: FormBuilder,
    private workflowService: WorkflowService,
    private utilService: UtilService,
    private route: Router
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
    const { url } = this.route;

    if (url.startsWith('/revisao')) {
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

      this.updateFormData(
        colaborador_nome,
        colaborador_cargo,
        solicitante,
        veiculo_nome,
        veiculo_placa,
        veiculo_ano,
        justificativa
      );

      this.revisao = true;
    } else {
      await this.loadUserDataAndProfile();
    }

    this.workflowService.onSubmit(this.saveForm.bind(this));
  }

  async loadUserDataAndProfile() {
    const token = await this.workflowService.getToken();
    const userData = await this.workflowService.requestUserData();

    const response = await this.utilService.getProfile(userData.subject, token);

    this.updateFormData(
      userData.fullname,
      response[0].TitRed,
      userData.subject
    );
  }

  private updateFormData(
    nome,
    cargo,
    solicitante,
    veiculoNome = '',
    veiculoPlaca = '',
    veiculoAno = null,
    justificativa = ''
  ) {
    this.formData.patchValue({
      nome,
      cargo,
      veiculo: {
        nome: veiculoNome,
        placa: veiculoPlaca,
        ano: veiculoAno
      },
      justificativa,
      solicitante
    });
  }

  saveForm() {
    if (this.formData.valid) {
      return {
        formData: {
          colaborador_nome: this.formData.value.nome,
          colaborador_cargo: this.formData.value.cargo,
          veiculo_nome: this.formData.value.veiculo.nome,
          veiculo_placa: this.formData.value.veiculo.placa,
          veiculo_ano: this.formData.value.veiculo.ano,
          solicitante: this.formData.value.solicitante
        }
      };
    } else {
      console.log('Ocorreu um erro no formulário');
      this.workflowService.abortSubmit();
    }
  }
}
