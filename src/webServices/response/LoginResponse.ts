import {Employee} from '../../pojo/Employee';
import {User} from '../../pojo/User';
import {Dealer} from '../../pojo/Dealer';

export class LoginResponse extends InventarioRealResponse {
    public data: {
        employee: Employee,
        user: User,
        dealer: Dealer,
        token: string
    };
}
