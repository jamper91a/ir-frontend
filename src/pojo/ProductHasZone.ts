/* tslint:disable:variable-name */
import {InventarioRealPojo} from './InventarioRealPojo';
import {Product} from './Product';
import {Devolution} from './Devolution';
import {Epc} from './Epc';
import {Inventory} from './Inventory';
import {Sell} from './Sell';
import {Zone} from './Zone';

export class ProductHasZone extends InventarioRealPojo {
    public admission_date: string;
    public sell_date: string;
    public return_date: string;
    public notes_return: string;
    public logs_users: string;
    public product: Product;
    public zone: Zone;
    public devolution: Devolution;
    public sell: Sell;
    public epc: Epc;
    public inventories: Inventory[];
    public total = 1; // Extra field to get the Total of items
    public vendidas = 0;
    public error: boolean;

}
