import {CreatePdfRequest} from './CreatePdfRequest';

export class CreatePdfEanPluInventoryRequest extends CreatePdfRequest {
    public shop: string;
    public ean: string;
    constructor() {
        super();
        this.templateId = '65263';
    }

    getBody() {
        return {
            templateId: this.templateId,
            data: {
                title: this.title,
                rows: this.rows,
                shop: this.shop,
                ean: this.ean
            }

        };
    }


}
