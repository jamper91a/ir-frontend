import {InventarioRealResponse} from './InventarioRealResponse';

export class TagsByDealerByMonthResponse extends InventarioRealResponse {
    public data: [{
        amount: string,
        day: string,
        month: string,
    }];
}
