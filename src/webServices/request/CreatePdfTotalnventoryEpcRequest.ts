import {CreatePdfRequest} from './CreatePdfRequest';

export class CreatePdfTotalnventoryEpcRequest extends CreatePdfRequest {
    public shop: string;
    constructor() {
        super();
        this.templateId = '65287';
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
