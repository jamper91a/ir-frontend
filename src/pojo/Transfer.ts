/* tslint:disable */
import {InventarioRealPojo} from './InventarioRealPojo';
import {Shop} from './Shop';
import {Employee} from './Employee';
import {TransfersHasZonesProduct} from './TransfersHasZonesProduct';

export class Transfer extends InventarioRealPojo {
    public state: boolean;
    public manifest: String;
    public message: String;
    public employee: Employee;
    public shopSource: Shop;
    public shopDestination: Shop;
    public products: TransfersHasZonesProduct[];



}
