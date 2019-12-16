/* tslint:disable:variable-name */
import {InventarioRealPojo} from './InventarioRealPojo';
import {Company} from './Company';
import {Supplier} from './Supplier';

export class Product extends InventarioRealPojo {
    public ean: string;
    public plu: string;
    public plu2: string;
    public plu3: string;
    public branch: string;
    public gender: string;
    public color: string;
    public size: string;
    public category: string;
    public description: string;
    public amount: number;
    public imagen: string;
    public cost_price: number;
    public sell_price: number;
    public company: Company;
    public supplier: Supplier;

}
