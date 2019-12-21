export class CreatePdfRequest implements InventarioRealRequest {
    public templateId: string;
    public title: string;
    public logo: string;
    public header: [{}];
    public rows = [];
    constructor() {
    }

    getBody() {
        // return {
        //     templateId: this.templateId,
        //     data: {
        //         title: this.title,
        //         logo: this.logo,
        //         header: this.header,
        //         rows: this.rows
        //     }
        //
        // };
    }

    validate(): boolean {
        return true;
    }

    clean() {
    }


}
