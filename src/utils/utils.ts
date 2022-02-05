import { ICliente } from './../domain/types/ICliente';
import { RefObject } from "hoist-non-react-statics/node_modules/@types/react";
import { userInfo } from "os";
import { Toast } from "primereact/toast";
import { FileImg } from "../domain/types/FileImg";
import { IFrete } from "../domain/types/IFrente";
import { IProduto } from "../domain/types/IProduto";
import { IUser } from "../domain/types/IUser";
import { logout } from "../services/auth";

export class Utils {

    /**
    * Format bytes as human-readable text.
    * 
    * @param bytes Number of bytes.
    * @param si True to use metric (SI) units, aka powers of 1000. False to use 
    *           binary (IEC), aka powers of 1024.
    * @param dp Number of decimal places to display.
    * 
    * @return Formatted string.
    */
    /**
     *@momen lib que formata datas e horas
    */


    static fileConvertSizeByte = (bytes: number) => {
        const si = true, dp = 1
        const thresh = si ? 1000 : 1024;

        if (Math.abs(bytes) < thresh) {
            return bytes + ' B';
        }

        const units = si
            ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
            : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
        let u = -1;
        const r = 10 ** dp;

        do {
            bytes /= thresh;
            ++u;
        } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


        return bytes.toFixed(dp) + ' ' + units[u];
    }

    static formatCurrency = (value: number) => {
        let valor = '';
        if (value !== undefined) {
            valor = value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        }
        return valor;
    }
    /**
     * @params de type = 'success', 'error', 'info','warn'
    */
    static messagemShow = (toast: RefObject<Toast>, type: string, title: string, body: string, time: number) => {
        if (toast.current != null) {
            toast.current.show({ severity: type, summary: title, detail: body, life: time });
        }

    }

    static calculaFrete = (Frete: IFrete) => {

    }

    static buscaCEP = (CEP: string) => {

    }

    static rastreioPedido = (codigo: string) => {

    }

    public static validarProduto(produto: IProduto): string {
        let response = '';
        let soma = Number(produto.comprimento) + Number(produto.altura) + Number(produto.largura);
        if (produto.comprimento < 15 || produto.altura < 5 || produto.largura < 10) {
            response = 'Limite minino do produto é comprimento=15cm, altura=5cm, largura=10cm';
        } else if (produto.peso < 0.3) {
            response = 'Limite minino do produto é peso=300g';
        } else if (produto.peso > 30) {
            response = 'Limite máximo do produto é peso=30kg';
        } else if (soma > 200) {
            response = 'Limite máximo do produto é 200cm';
        } else if (produto.comprimento > 105 || produto.altura > 105 || produto.largura > 105) {
            response = 'Limite máximo do produto é comprimento=105cm, altura=105cm, largura=105cm';
        } else if (produto.categoria.nome.length === 0) {
            response = 'Selecione uma categoria';
        }
        return response;
    }

    public static convertFileByFileImg(file: any): FileImg {
        const imge: FileImg = { objectURL: '', name: '', size: 0, hash: '' };
        imge.objectURL = file.objectURL;
        imge.hash = '';
        imge.name = file.name;

        return imge;
    }

    public static getEmogi() {
        return ['🤑', '😀', '😱', '😰', '😥'];
    }

    public static isValidEmail(email: string) {
        if (email.length >= 5) {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
                return false;
            }
        }
    }

    /**
     * 
     * @param value string cpf
     * @returns retorna true se for valido e false se não for
     */
    public static validCPF(CPF: string) {
        let cpf = CPF.replace(/[\s.-]*/igm, '')
        if (
            !cpf ||
            cpf.length !== 11 ||
            cpf === "00000000000" ||
            cpf === "11111111111" ||
            cpf === "22222222222" ||
            cpf === "33333333333" ||
            cpf === "44444444444" ||
            cpf === "55555555555" ||
            cpf === "66666666666" ||
            cpf === "77777777777" ||
            cpf === "88888888888" ||
            cpf === "99999999999"
        ) {
            return false
        }
        var soma = 0
        var resto
        for (var i = 1; i <= 9; i++)
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
        resto = (soma * 10) % 11
        if ((resto == 10) || (resto == 11)) resto = 0
        if (resto != parseInt(cpf.substring(9, 10))) return false
        soma = 0
        for (var i = 1; i <= 10; i++)
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
        resto = (soma * 10) % 11
        if ((resto == 10) || (resto == 11)) resto = 0
        if (resto != parseInt(cpf.substring(10, 11))) return false
        return true
    }
    /**
     * 
     * @param value string cnpj
     * @returns retorna true se for valido e false se não for
     */
    public static isValidCNPJ(value: string) {
        let cnpj = value.replace(/[^\d]+/g, '');

        if (cnpj == '') return false;

        if (cnpj.length != 14)
            return false;

        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" ||
            cnpj == "11111111111111" ||
            cnpj == "22222222222222" ||
            cnpj == "33333333333333" ||
            cnpj == "44444444444444" ||
            cnpj == "55555555555555" ||
            cnpj == "66666666666666" ||
            cnpj == "77777777777777" ||
            cnpj == "88888888888888" ||
            cnpj == "99999999999999")
            return false;

        // Valida DVs
        let tamanho = cnpj.length - 2
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2)
                pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != parseInt(digitos.charAt(0)))
            return false;

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != parseInt(digitos.charAt(1)))
            return false;

        return true;
    }




    public static convertArrayNumberByArrayMoney(array: any[]) {
        let _array = array.map(valor => this.formatCurrency(valor));
        return _array;
    }

    public static geraTokenLogin(user: IUser){
        let key = this.encrypt(this.geraStringAleatoria(10)+'&'+user.nome+'&'+this.geraStringAleatoria(20)+'&'+user.role+'&'+this.geraStringAleatoria(15)+'&'+user.id+"&"+this.geraStringAleatoria(5)+'&'+user.status+"&"+this.geraStringAleatoria(8));
        localStorage.setItem("p-text-left", key);
    }

    public static getTokenLogin(){
        let key = localStorage.getItem("p-text-left");
        if(key != null){
            const array = this.decrypt(key).split('&');
            const userLogado: IUser={
                id: Number(array[5]),
                nome: array[1], 
                login:'', 
                email:'', 
                dataCriacao: null, 
                dataAtualizacao: null, 
                status: 'ATIVO', 
                password: '', 
                role: array[3]
            } 
            return userLogado;
        }
        
    }



    public static setClienteLocal(user: ICliente){
        let key = this.encrypt(JSON.stringify(user));
        localStorage.setItem("p-text-cli", key);
    }

    public static getClienteLocal(): ICliente{
        let key = localStorage.getItem("p-text-cli");
        return key!= null ?  {...JSON.parse(this.decrypt(key))} :  {};
        
    }

    public static logout(){
        logout();
    }


    private static  encrypt(dados: string){
        var result = "";
        for(let i=0;i<dados.length;i++){
          if(i<dados.length-1) {
              result+=dados.charCodeAt(i)+10;
              result+="-";
          } else{
              result+=dados.charCodeAt(i)+10;
          }
        }
        return result;
    }

    private  static decrypt(key: string){
        var result="";
        var array = key.split("-");
        for(let i=0;i<array.length;i++){
          result+=String.fromCharCode(Number(array[i])-10);
        }
        return result;
    }

    private static geraStringAleatoria(tamanho: number) {
        var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var stringAleatoria = '';
        for (var i = 0; i < tamanho; i++) {
            stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return stringAleatoria;
    }




}