import {InventarioRealPojo} from './InventarioRealPojo';
import {Zone} from './Zone';
import {ConsolidatedInventory} from './ConsolidatedInventory';
import {Employee} from './Employee';
import {ProductHasZone} from './ProductHasZone';

export class Inventory extends InventarioRealPojo {
    public date: string;
    public parcial: number;
    public collaborative: number;
    public message: string;
    public zone: Zone;
    public consolidatedInventory: ConsolidatedInventory;
    public products: ProductHasZone[];
    public employees: Employee[];

}
