import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { FormBuilder } from '@angular/forms';
import {Product} from "../products";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  items = this.cartService.getItems();
  error : string = ''

  checkoutForm = this.formBuilder.group({
    name: '',
    address: '',
  });

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {}

  onSubmit(): void {
    if (this.items.length != 0){
      this.items = this.cartService.clearCart();
      window.alert("Your order has been submitted")
      this.checkoutForm.reset();
    }else{
      this.error =" the cart is empty ! "
    }
  }

  remove(product : Product) {
    this.cartService.removeProduct(product);
    console.warn('Your order has been removed');
  }
}
