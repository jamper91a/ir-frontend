export class AllDealersRequest implements InventarioRealRequest {
    public justActiveDealers: boolean;


    constructor() {
        this.justActiveDealers = false;
    }

    getBody() {
        return {
            justActiveDealers: this.justActiveDealers
        };
    }

    validate(): boolean {
        return true;
    }

    clean() {
    }



}
