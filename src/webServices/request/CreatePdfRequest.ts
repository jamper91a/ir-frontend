export class CreatePdfRequest implements InventarioRealRequest {
    public templateId: string;
    public title: string;
    public header: [{}];
    public rows = [];
    constructor() {
    }

    getBody() {
        return {
            templateId: this.templateId,
            data: {
                title: this.title,
                header: this.header,
                rows: this.rows
            }

        };
    }

    validate(): boolean {
        return true;
    }

    clean() {
    }


}
