import {CreatePdfRequest} from './CreatePdfRequest';

export class CreatePdfTotalnventoryRequest extends CreatePdfRequest {
    constructor() {
        super();
        this.templateId = '63425';
        this.header = [{
            col1: 'Total',
            col2: 'EPC',
            col3: 'Description'
        }];
    }


}
