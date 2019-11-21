/* tslint:disable:variable-name */
import {InventarioRealPojo} from './InventarioRealPojo';
import {ConsolidatedInventory} from './ConsolidatedInventory';
import {ReportsHasProductsZone} from './ReportsHasProductsZone';

export class Report extends InventarioRealPojo {
    public type: number;
    public amount: number;
    public units_sell: number;
    public units_returned: number;
    public firstDate: string;
    public secondDate: string;
    public firstInventory: ConsolidatedInventory ;
    public secondInventory: ConsolidatedInventory ;
    public products: ReportsHasProductsZone[];

}
