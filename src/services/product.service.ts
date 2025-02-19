import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http: HttpClient = inject(HttpClient);

  // For production
  // productsUrl = 'http://13.53.249.97/api/products';

  // For local
  productsUrl = 'http://localhost:3000/api/products';

  constructor() {}

  getUserIP() {
    this.http.get('https://api64.ipify.org?format=json').subscribe((data) => {
      // here we get user IP
      console.log(data);
    });
  }

  getAllProducts() {
    return this.http.get(this.productsUrl);
  }

  createProduct(product: any) {
    return this.http.post(this.productsUrl, product);
  }

  updateProduct(id: any, product: any) {
    return this.http.put(this.productsUrl + '/' + id, product);
  }

  deleteProduct(id: any) {
    return this.http.delete(this.productsUrl + '/' + id);
  }
}
