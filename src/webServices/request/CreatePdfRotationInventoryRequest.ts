import {CreatePdfRequest} from './CreatePdfRequest';

export class CreatePdfRotationInventoryRequest extends CreatePdfRequest {
    public shop: string;

    constructor() {
        super();
        this.templateId = '65732';
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
