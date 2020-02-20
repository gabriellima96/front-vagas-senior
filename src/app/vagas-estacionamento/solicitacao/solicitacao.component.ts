import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { WorkflowService } from "@seniorsistemas/workflow-cockpit-angular";

import { UtilService } from "src/app/services/util.service";
import { FormComponent } from "src/app/shared/form/form.component";
import { FormConfig } from "src/app/shared/form/form-config";
import { FormData } from "src/app/shared/form/form-data";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-solicitacao",
  templateUrl: "./solicitacao.component.html",
  styleUrls: ["./solicitacao.component.css"]
})
export class SolicitacaoComponent implements OnInit {
  public revisao = false;
  private integrationToken: string = "";

  @ViewChild(FormComponent, { static: true })
  private formComponent: FormComponent;

  constructor(
    private workflowService: WorkflowService,
    private utilService: UtilService,
    private toastrService: ToastrService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    const formConfig: FormConfig = {
      justificativa: {
        show: false,
        review: false
      }
    };

    this.formComponent.updateFormConfig(formConfig);

    /*
    try {
      await this.loadUserDataAndProfile();
    } catch (error) {
      this.utilService.handleError(error);
    }

    this.workflowService.onSubmit(this.saveForm.bind(this));*/

    this.route.queryParams.subscribe(({ integrationToken }) => {
      this.integrationToken = integrationToken;
    });

    this.formComponent.setLoading(false);
  }

  async loadUserDataAndProfile() {
    const token = this.workflowService.getToken();
    const userData = await this.workflowService.requestUserData();

    const response = await this.utilService.getProfile(userData.subject, token);

    const formData: FormData = {
      nome: userData.fullname,
      cargo: response[0].TitRed,
      solicitante: userData.subject,
      justificativa: "",
      veiculo: {
        nome: "",
        placa: "",
        ano: null
      }
    };

    this.formComponent.updateFormData(formData);
  }

  async saveForm() {
    this.formComponent.setLoading(true);
    if (this.formComponent.isValid()) {
      const data = this.formComponent.getData();

      const request = {
        token: this.integrationToken,
        data: {
          colaborador_nome: data.nome,
          colaborador_cargo: data.cargo,
          veiculo_nome: data.veiculo.nome,
          veiculo_placa: data.veiculo.placa,
          veiculo_ano: data.veiculo.ano,
          solicitante: data.solicitante
        }
      };

      try {
        const response = await this.utilService.startProcess(request);
        this.formComponent.setLoading(false);
      } catch (error) {
        this.toastrService.error(
          "Verifique todos os campos obrigatórios",
          "Ocorreu um erro no formulário"
        );
      }

      return null;
    } else {
      this.toastrService.error(
        "Verifique todos os campos obrigatórios",
        "Ocorreu um erro no formulário"
      );
    }

    this.formComponent.setLoading(false);
  }
}
