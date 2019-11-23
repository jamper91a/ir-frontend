/* tslint:disable */
import {InventarioRealPojo} from './InventarioRealPojo';
import {Employee} from './Employee';
import {Inventory} from './Inventory';

export class UltimoInventarioResponse extends InventarioRealPojo {
    public name: string;
    public employee: Employee;
    public total_products: number;
    public inventories: Inventory [];



}
