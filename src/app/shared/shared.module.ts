import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkflowModule } from '@seniorsistemas/workflow-cockpit-angular';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WorkflowModule,
    InputTextModule,
    InputMaskModule,
    InputTextareaModule
  ],
  exports: [FormComponent]
})
export class SharedModule {}
