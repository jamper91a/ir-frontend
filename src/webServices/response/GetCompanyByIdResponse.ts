import {Company} from '../../pojo/Company';
import {InventarioRealResponse} from './InventarioRealResponse';

export class GetCompanyByIdResponse extends InventarioRealResponse {
    public data: Company;
}
