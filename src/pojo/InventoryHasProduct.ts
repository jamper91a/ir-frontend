import {InventarioRealPojo} from './InventarioRealPojo';
import {Zone} from './Zone';
import {Epc} from './Epc';
import {Inventory} from './Inventory';
import {ProductHasZone} from './ProductHasZone';

export class InventoryHasProduct extends InventarioRealPojo {
    public inventory: Inventory ;
    public epc: Epc ;
    public zone: Zone ;
    public product: ProductHasZone;

}
