import {CreatePdfRequest} from './CreatePdfRequest';

export class CreatePdfReturnUnitsRequest extends CreatePdfRequest {
    public shop: string;

    constructor() {
        super();
        this.templateId = '65733';
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
