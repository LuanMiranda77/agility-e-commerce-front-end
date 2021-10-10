import { RefObject } from "hoist-non-react-statics/node_modules/@types/react";
import { Toast } from "primereact/toast";
import { IFrete } from "../domain/types/IFrente";

export  class  Utils{
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
    static fileConvertSizeByte = (bytes: number) => {
        const si=true, dp=1
        const thresh = si ? 1000 : 1024;

        if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
        }

        const units = si 
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] 
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
        let u = -1;
        const r = 10**dp;

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

    static  calculaFrete = (Frete: IFrete) =>{

    }

    static  buscaCEP = (CEP: string) =>{

    }

    static  rastreioPedido = (codigo: string) =>{

    }

}