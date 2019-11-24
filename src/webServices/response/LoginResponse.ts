import {Employee} from '../../pojo/Employee';
import {User} from '../../pojo/User';
import {Dealer} from '../../pojo/Dealer';
import {InventarioRealResponse} from './InventarioRealResponse';

export class LoginResponse extends InventarioRealResponse {
    public data: {
        employee: Employee,
        user: User,
        dealer: Dealer,
        token: string
    };
}
