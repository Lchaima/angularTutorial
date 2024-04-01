import { Component} from '@angular/core';
import {ProductsService} from "../products.service";

@Component({
  selector: 'app-products-api',
  templateUrl: './products-api.component.html',
  styleUrl: './products-api.component.css'
})
export class ProductsApiComponent {


  constructor(private productsService : ProductsService){}

  products : any[] = []
  showProducts(searchText :string){
    this.productsService.getExtrnalProducts(searchText)
        .subscribe(data => {this.products= data.products.map((product:any)=> {
          return {
            name : product.name,
            image : product.images[0],
            category : product.categories[0].name
          }
            })
        }
        )
  }
}
