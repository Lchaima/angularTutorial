import {Component} from '@angular/core';
import {ProductsService} from "../products.service";
import {error} from "protractor";

@Component({
  selector: 'app-products-api',
  templateUrl: './products-api.component.html',
  styleUrl: './products-api.component.css'
})
export class ProductsApiComponent {

    message: string ='' ;
  constructor(private productsService : ProductsService){
  }

  products : any[] = []
  showProducts(searchText :string){
      this.message='Downloading'
    this.productsService.getExtrnalProducts(searchText)
        .subscribe((rep) => {
                if (rep && rep.data) {
                    this.products = rep.data.products.map((product: any) => {
                        return {
                            title: product.product_title,
                            image: product.product_photo,
                            rate: product.product_star_rating,
                            price: product.product_price
                        }
                    });
                    this.message = "";
                }
            }
        )
  }
}
