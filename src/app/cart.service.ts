import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './products';


@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: Product[] = [];
  constructor(private http: HttpClient) {}

  addToCart(product: Product) {
    this.items.push(product);
  }

  removeProduct(productToRemove: Product) {
    const index= this.items.findIndex(product => product === productToRemove)
    if (index !== -1){
      this.items.splice(index,1)
    }
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  getShippingPrices(){
    return this.http.get<{type:string , price:number}[]>('/assets/shipping.json');
  }
}
