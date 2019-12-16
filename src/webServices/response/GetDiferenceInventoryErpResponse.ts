import {InventarioRealResponse} from './InventarioRealResponse';
import {DiferenceInventoryErp} from '../../pojo/DiferenceInventoryErp';

export class GetDiferenceInventoryErpResponse extends InventarioRealResponse {
    public data: DiferenceInventoryErp[];

    constructor() {
        super();
        this.data = [];

    }
}
