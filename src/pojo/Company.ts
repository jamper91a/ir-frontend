import {InventarioRealPojo} from './InventarioRealPojo';
import {Dealer} from './Dealer';
import {User} from './User';

export class Company extends InventarioRealPojo {
    public name: string;
    public dealer: Dealer;
    public user: User;

}
