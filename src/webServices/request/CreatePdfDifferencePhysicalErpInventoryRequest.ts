import {CreatePdfRequest} from './CreatePdfRequest';

export class CreatePdfDifferencePhysicalErpInventoryRequest extends CreatePdfRequest {
    public shop: string;

    constructor() {
        super();
        this.templateId = '65409';
    }

    getBody() {
        return {
            templateId: this.templateId,
            data: {
                title: this.title,
                rows: this.rows,
                shop: this.shop
            }

        };
    }


}
