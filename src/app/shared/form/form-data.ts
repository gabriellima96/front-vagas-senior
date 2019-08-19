export interface FormData {
  nome: string;
  cargo: string;
  veiculo: {
    nome: string;
    placa: string;
    ano: number;
  };
  justificativa: string;
  solicitante: string;
}
