import {InventarioRealPojo} from './InventarioRealPojo';
import {Company} from './Company';
import {User} from './User';
import {Shop} from './Shop';

export class Employee extends InventarioRealPojo {
    public company: Company;
    public user: User;
    public shop: Shop;

}
