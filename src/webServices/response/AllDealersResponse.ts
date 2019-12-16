import {Dealer} from '../../pojo/Dealer';
import {InventarioRealResponse} from './InventarioRealResponse';

export class AllDealersResponse extends InventarioRealResponse {
    public data: Dealer[];
}
