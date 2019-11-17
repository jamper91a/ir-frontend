import {Company} from '../../pojo/Company';

export class UpdateCompanyRequest implements InventarioRealRequest {
    public photo: File = null;
    public name = '';

    constructor() {
    }


    getBody(): FormData {
        const formData: FormData = new FormData();
        if (this.photo) {
            formData.append('photo', this.photo);
        }
        formData.append('name', this.name);
        return formData;
        // return {
        //     photo: this.photo,
        //     name: this.name
        // };
    }

    validate(): boolean {
        return true;
    }

    putData(company: Company) {
        this.name = company.name;
    }

    clean() {
        this.name = '';
        this.photo = null;
    }


}
