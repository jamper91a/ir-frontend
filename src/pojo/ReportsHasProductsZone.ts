/* tslint:disable:variable-name */
import {InventarioRealPojo} from './InventarioRealPojo';
import {Report} from './Report';
import {Employee} from './Employee';
import {ProductHasZone} from './ProductHasZone';

export class ReportsHasProductsZone extends InventarioRealPojo {
    public product: ProductHasZone;
    public report: Report;
    public homologatorEmployee: Employee;
    public state: boolean;

}
