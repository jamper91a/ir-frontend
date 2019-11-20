import {Product} from '../../pojo/Product';

export class UpdateProductRequest implements InventarioRealRequest {
    public photo: File = null;
    public product: Product;

    constructor() {
    }


    getBody(): FormData {
        const formData: FormData = new FormData();
        formData.append('id' , this.product.id + '');
        formData.append('ean' , this.product.ean);
        formData.append('plu' , this.product.plu);
        formData.append('plu2' , this.product.plu2);
        formData.append('plu3' , this.product.plu3);
        formData.append('branch' , this.product.branch);
        formData.append('gender' , this.product.gender);
        formData.append('color' , this.product.color);
        formData.append('size' , this.product.size);
        formData.append('category' , this.product.category);
        formData.append('supplier' , this.product.supplier.id + '');
        formData.append('description' , this.product.description);
        formData.append('amount' , this.product.amount + '');
        formData.append('image' , this.product.imagen);
        formData.append('cost_price' , this.product.cost_price + '');
        formData.append('sell_price' , this.product.sell_price + '');
        if (this.photo) {
            formData.append('withPhoto', 'true');
            formData.append('photo', this.photo);
        } else {
            formData.append('withPhoto', 'false');
        }
        return formData;
    }

    validate(): boolean {
        return true;
    }

    putData(product: Product) {
        this.product = new Product();
        this.product.id = product.id;
        this.product.ean = product.ean;
        this.product.plu = product.plu;
        this.product.plu2 = product.plu2;
        this.product.plu3 = product.plu3;
        this.product.branch = product.branch;
        this.product.gender = product.gender;
        this.product.color = product.color;
        this.product.size = product.size;
        this.product.category = product.category;
        this.product.description = product.description;
        this.product.amount = product.amount;
        this.product.imagen = product.imagen;
        this.product.cost_price = product.cost_price;
        this.product.sell_price = product.sell_price;
        this.product.company = product.company;
        this.product.supplier = product.supplier;
    }

    clean() {
        // this.name = '';
        // this.photo = null;
    }


}
