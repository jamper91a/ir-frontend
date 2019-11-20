/* tslint:disable:variable-name */
import {InventarioRealPojo} from './InventarioRealPojo';
import {Dealer} from './Dealer';
import {User} from './User';
import {Company} from './Company';
import {Supplier} from './Supplier';

export class Product extends InventarioRealPojo {
    public ean: string;
    public plu: string;
    public plu2: string;
    public plu3: string;
    public brand: string;
    public gender: string;
    public color: string;
    public size: string;
    public category: string;
    public description: string;
    public amount: number;
    public image: string;
    public cost_price: number;
    public sell_price: number;
    public company: Company;
    public supplier: Supplier;

}
