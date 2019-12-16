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
        const error = new Error();
        // @ts-ignore
        error.code = 'VAL_FAIL';
        if (!this.name) {
            error.message = 'fields_empty';
            throw error;
        }
        return true;
    }

    clean() {
        this.name = '';
    }


}
