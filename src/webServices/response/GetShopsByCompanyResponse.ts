import {Shop} from '../../pojo/Shop';
import {InventarioRealResponse} from './InventarioRealResponse';

export class GetShopsByCompanyResponse extends InventarioRealResponse {
    public data: Shop[];
}
