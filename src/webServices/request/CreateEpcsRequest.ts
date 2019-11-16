import {Epc} from '../../pojo/Epc';

export class CreateEpcsRequest implements InventarioRealRequest {
    public epcs: Epc[];


    constructor() {
        this.epcs = [];
    }

    getBody() {
        const aux = [];
        for (const epc of this.epcs) {
            aux.push({
               epc: epc.epc,
               dealer: epc.dealer.id,
               company: epc.company.id,
               state: 0
            });
        }
        console.log(aux);
        return {
            epcs: aux
        };
    }

    validate(): boolean {
        return true;
    }

    clean() {
        this.epcs = [];
    }



}
