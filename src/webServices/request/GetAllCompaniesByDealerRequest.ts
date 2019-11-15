export class GetAllCompaniesByDealerRequest implements InventarioRealRequest {
    public justActive: boolean;


    constructor() {
        this.justActive = false;
    }

    getBody() {
        return {
            justActive: this.justActive
        };
    }

    validate(): boolean {
        return true;
    }

    clean() {
    }



}
