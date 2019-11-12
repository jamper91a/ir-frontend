import {Employee} from '../../pojo/Employee';

export class LoginResponse extends InventarioRealResponse {
    public data: {
        employee: Employee,
        token: string
    };
}
