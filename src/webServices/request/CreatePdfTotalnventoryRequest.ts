import {CreatePdfRequest} from './CreatePdfRequest';

export class CreatePdfTotalnventoryRequest extends CreatePdfRequest {
    public shop: string;
    constructor() {
        super();
        this.templateId = '63425';
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
