import {InventarioRealResponse} from './InventarioRealResponse';
import {Employee} from '../../pojo/Employee';

export class GetEmployeesByAdminResponse extends InventarioRealResponse {
    public data: Employee[];
}
