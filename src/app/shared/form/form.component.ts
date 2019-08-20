import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FormConfig } from './form-config';
import { FormData } from './form-data';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  private isLoading = true;
  private formGroup: FormGroup;
  public formConfig: FormConfig = {
    justificativa: {
      show: false,
      review: false
    }
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
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

  public updateFormData(data: FormData) {
    this.formGroup.patchValue({
      nome: data.nome,
      cargo: data.cargo,
      veiculo: {
        nome: data.veiculo.nome || '',
        placa: data.veiculo.placa || '',
        ano: data.veiculo.ano || null
      },
      justificativa: data.justificativa || '',
      solicitante: data.solicitante
    });
  }

  public updateFormConfig(config: FormConfig) {
    this.formConfig = config;
  }

  public justificativaRequired() {
    const { justificativa } = this.formGroup.value;
    this.formGroup.controls.justificativa.setValidators([Validators.required]);
    this.formGroup.controls.justificativa.updateValueAndValidity();
    this.formGroup.patchValue({
      justificativa
    });
  }

  public getData() {
    return this.formGroup.value;
  }

  public isValid() {
    this.formGroup.markAllAsTouched();
    return this.formGroup.valid;
  }

  public setLoading(value: boolean) {
    this.isLoading = value;
  }
}
