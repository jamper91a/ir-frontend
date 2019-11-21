/* tslint:disable:variable-name */
import {InventarioRealPojo} from './InventarioRealPojo';
import {Employee} from './Employee';
import {Inventory} from './Inventory';

export class ConsolidatedInventory extends InventarioRealPojo {
    public name: string;
    public employee: Employee;
    public total_products: number;
    public inventories: Inventory[];

}
