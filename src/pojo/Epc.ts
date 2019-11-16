import {InventarioRealPojo} from './InventarioRealPojo';
import {Dealer} from './Dealer';
import {Company} from './Company';

export class Epc extends InventarioRealPojo {
    public state: number;
    public company: Company;
    public epc: string;
    public dealer: Dealer;

}
