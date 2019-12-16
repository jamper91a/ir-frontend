import {Dealer} from '../../pojo/Dealer';
import {InventarioRealResponse} from './InventarioRealResponse';

export class GetAllCompaniesByDealerResponse extends InventarioRealResponse {
    public data: Dealer;
}
