import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from '../components/mat-dialog/mat-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  constructor(private productService: ProductService) {}

  displayedColumns: string[] = ['Name', 'Price', 'Quantity', 'Actions'];
  products: any = [];
  isLoading = false;
  ngOnInit() {
    this.isLoading = true;
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (res: any) => {
        this.products = res;
        this.isLoading = false;
      },
    });
  }

  onCancel() {
    this.editMode = false;
    this.addNew = false;
    this.productId = null;
    this.productName = null;
    this.productPrice = null;
    this.productQuantity = null;
  }

  onSubmit() {
    this.isLoading = true;
    // After API response
    let obj: any = {
      name: this.productName,
      price: this.productPrice,
      quantity: this.productQuantity,
    };
    if (this.productId) {
      this.productService.updateProduct(this.productId, obj).subscribe({
        next: (res: any) => {
          console.log(res);
          this.openSnackBar('Product updated successfully', 'SUCCESS');
          this.onCancel();
          this.getAllProducts();
        },
      });
    } else {
      this.productService.createProduct(obj).subscribe({
        next: (res: any) => {
          console.log(res);
          this.openSnackBar('Product added successfully', 'SUCCESS');
          this.onCancel();
          this.getAllProducts();
        },
      });
    }
  }

  editMode = false;
  addNew = false;
  productId: any;
  productName: any;
  productPrice: any;
  productQuantity: any;
  onEdit(element: any) {
    this.editMode = true;
    this.productId = element._id;
    this.productName = element.name;
    this.productPrice = element.price;
    this.productQuantity = element.quantity;
  }

  onAddProduct() {
    this.addNew = true;
    this.editMode = true;
  }

  onDelete(element: any) {
    const dialogRef = this.dialog.open(MatDialogComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog result:', result);
      if (result && result.confirmed) {
        this.productService
          .deleteProduct(result.productId)
          .subscribe((res: any) => {
            console.log(res);
            this.openSnackBar(res.message, 'SUCCESS');
            this.getAllProducts();
          });
      }
    });
  }

  private _snackBar = inject(MatSnackBar);
  openSnackBar(message: any, messageType: any) {
    this._snackBar.open(message, messageType, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000,
    });
  }

  title = 'table-task';

  // Sample data for the table
  tableData: any = [
    {
      name: 'Vamsi',
      showName: true,
      age: 30,
      showAge: true,
      city: 'Hyderabad',
      showCity: true,
    },
    {
      name: 'Kutti',
      showName: true,
      age: 29,
      showAge: true,
      city: 'Hyderabad',
      showCity: true,
    },
    {
      name: 'Pavani',
      showName: true,
      age: 29,
      showAge: true,
      city: 'Hyderabad',
      showCity: true,
    },
    {
      name: 'Kalyan',
      showName: true,
      age: 31,
      showAge: true,
      city: 'Hyderabad',
      showCity: true,
    },
    {
      name: 'Surya',
      showName: true,
      age: 29,
      showAge: true,
      city: 'Hyderabad',
      showCity: true,
    },
    {
      name: 'Pavan',
      showName: true,
      age: 30,
      showAge: true,
      city: 'Hyderabad',
      showCity: true,
    },
    {
      name: 'Jane Smith',
      showName: true,
      age: 34,
      showAge: true,
      city: 'Los Angeles',
      showCity: true,
    },
    {
      name: 'Sam Green',
      showName: true,
      age: 45,
      showAge: true,
      city: 'Chicago',
      showCity: true,
    },
    {
      name: 'Alice Johnson',
      showName: true,
      age: 30,
      showAge: true,
      city: 'Houston',
      showCity: true,
    },
  ];

  // Table headers
  tableHeaders = ['Name', 'Age', 'City'];

  userClicked(property: any, index: number) {
    console.log(property, index);
    this.tableData[index][property] = !!!this.tableData[index][property];
  }

  userKeyPress(
    property: any,
    hideInput: any,
    value: any,
    event: any,
    index: number
  ) {
    console.log(value, event, index);
    if (event.key === 'Enter') {
      this.tableData[index][property] = value;
      this.tableData[index][hideInput] = true;
    }
  }
}
