import {Zone} from '../../pojo/Zone';

export class UpdateZoneRequest implements InventarioRealRequest {
    public id = '';
    public name = '';

    constructor() {
    }

    putData(zone: Zone) {
        this.name = zone.name;
        this.id = zone.id + '';
    }

    getBody() {
        return {
            name: this.name

        };
    }

    validate(): boolean {
        if (!this.name) {
            throw Error ('fields_empty');
        }
        return true;
    }

    clean() {
        this.name = '';
    }


}
