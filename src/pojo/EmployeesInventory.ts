import {InventarioRealPojo} from './InventarioRealPojo';
import {Inventory} from './Inventory';
import {Employee} from './Employee';

export class EmployeesInventory extends InventarioRealPojo {
    public inventory: Inventory;
    public employee: Employee;

}
