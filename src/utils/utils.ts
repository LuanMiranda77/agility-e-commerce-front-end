import { RefObject } from "hoist-non-react-statics/node_modules/@types/react";
import { Toast } from "primereact/toast";
import { FileImg } from "../domain/types/FileImg";
import { IFrete } from "../domain/types/IFrente";
import { IProduto } from "../domain/types/IProduto";

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
        return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    }
    //@params de type = 'success', 'error', 'info','warn' 
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
        } else if (produto.categorias.length === 0) {
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

    public static getUltimosAnos() {
        const anos = [];
        for (let i = 0; i < 5; i++) {
            anos.push(new Date().getFullYear() - i);
        }
        return anos.reverse();
    }

    public static getUltimasHoras(){
        const moment = require('moment');
        const horas = [];
        for (let i = 0; i < 12; i++) {
            let hora = moment(moment().subtract(i, 'hour').zone("-03:00")).format('HH:mm');
            horas.push(hora);
        }
        return horas.reverse();
        
    }

    public static convertArrayNumberByArrayMoney(array: any[]){
        let _array = array.map(valor => this.formatCurrency(valor));
        return _array;
    }

    public static subtrairDiasByData(dias: number){
       const moment = require('moment');
       return moment().subtract(dias, 'days');
    }

    
}