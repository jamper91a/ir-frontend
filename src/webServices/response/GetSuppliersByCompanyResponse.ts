import {Supplier} from '../../pojo/Supplier';
import {InventarioRealResponse} from './InventarioRealResponse';

export class GetSuppliersByCompanyResponse extends InventarioRealResponse {
    public data: Supplier[];
}
