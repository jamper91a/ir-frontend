import {UltimoInventarioResponse} from '../../pojo/UltimoInventarioResponse';
import {InventarioRealResponse} from './InventarioRealResponse';

export class GetLastConsolidatedInventory extends InventarioRealResponse {
    public data: UltimoInventarioResponse;
}
