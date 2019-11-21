/* tslint:disable */
import {InventarioRealPojo} from './InventarioRealPojo';
import {ProductHasZone} from './ProductHasZone';
import {Transfer} from './Transfer';

export class TransfersHasZonesProduct extends InventarioRealPojo {
    public product: ProductHasZone;
    public transfer: Transfer;
    public state: boolean;



}
