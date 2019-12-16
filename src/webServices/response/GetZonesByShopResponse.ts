import {Zone} from '../../pojo/Zone';
import {InventarioRealResponse} from './InventarioRealResponse';

export class GetZonesByShopResponse extends InventarioRealResponse {
    public data: Zone[];
}
