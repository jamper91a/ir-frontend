import {Employee} from '../../pojo/Employee';
import {InventarioRealResponse} from './InventarioRealResponse';

export class GetEmployeesByCompanyResponse extends InventarioRealResponse {
    public data: Employee[];
}
