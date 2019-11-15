import {InventarioRealPojo} from './InventarioRealPojo';
import {User} from './User';
import {Company} from './Company';

export class Dealer extends InventarioRealPojo {
    public name: string;
    public user: User;
    public companies: Company[];

}
