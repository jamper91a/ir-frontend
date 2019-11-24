import {Shop} from '../../pojo/Shop';

export class UpdateShopRequest implements InventarioRealRequest {
    public id = '';
    public name = '';

    constructor() {
    }

    putData(shop: Shop) {
        this.name = shop.name;
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
