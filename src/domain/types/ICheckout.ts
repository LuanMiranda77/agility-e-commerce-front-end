export  interface ICheckout{
    transaction_amount: number,
    token: string,
    description: string,
    installments: number,
    payment_method_id: string,
    issuer_id: string,
    payer: {
      email: string,
      first_name: string,//nome 
      last_name: string,// sobre nome
      identification: {
        type: string,
        number: string
      }
    }
    // address:  {
    //   zip_code: string, //cep
    //   street_name: string, //endereço
    //   street_number: string,// numero
    //   neighborhood: string,// bairro
    //   city: string, // cidade
    //   federal_unit: string // estado
    // }
    
    type:string;
}