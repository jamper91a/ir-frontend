import {Employee} from '../../pojo/Employee';
import {User} from '../../pojo/User';
import {Dealer} from '../../pojo/Dealer';
import {Inventory} from '../../pojo/Inventory';

export class GetLastConsolidatedInventory extends InventarioRealResponse {
    public data: {
        name: string;
        employee: Employee;
        total_products: number;
        inventories: Inventory [];
    };
}
