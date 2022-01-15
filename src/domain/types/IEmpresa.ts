
export interface IEmpresa{
  id: Number | null,
  CNPJ: string;
	instEstadual: string;
	instMunicipal: string;
	razaoSocial: string;
	nomeFantasia: string;
  logradouro: string;
	numero: string;
	complemento: string;
	bairro: string;
	cidade: string;
	cep: string;
  uf: string;

  // -------contatos----------------

  emailPrincipal: string;
	emailSegundario: string;
	celular1: string;
	celular2: string;
	foneFixo: string;
}