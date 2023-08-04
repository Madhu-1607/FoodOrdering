import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-item-form',
  template: `
  <section style="padding-top: 20px;"><div class="alert alert-primary" role="alert" *ngIf="!isLoggedIn">
  <i class="fas fa-info-circle mr-2"></i> Please login to view available restaurants.
</div>
<div class="row align-items-center" style="margin-top: 100px;">
<div *ngIf="isLoggedIn" class="col-lg-6 ">
    <h2 style="color: #61481C;font-family:cursive;font-weight:bold">Add Menu Item</h2><pre>
    <form (submit)="addMenuItem()" style="align-items:center">
      <label for="name" style="color:#61481C;font-size:20px;font-family:cursive">Name:</label>
      <input type="text" style="width: 400px;height:40px;border-radius:20px; background-color:#BF9742" id="name" [(ngModel)]="menuItem.name" name="name" required>
      <label for="price" style="color:#61481C;font-size:20px;font-family:cursive">Price:</label>
      <input type="number" style="width: 400px;height:40px;border-radius:20px; background-color:#BF9742" id="price" [(ngModel)]="menuItem.price" name="price" required>
      <label for="price" style="color:#61481C;font-size:20px;font-family:cursive">Restaurant Name:</label>
      <input type="text" style="width: 400px;height:40px; background-color:#BF9742;border-radius:20px" id="restaurantName" [(ngModel)]="menuItem.restaurantName" name="restaurantName" required>
      <button type="submit" style="margin-top:10px;background-color:#BF9742;border-radius:20px;font-size:20px">Add Menu Item</button>
    </form></pre></div>
    <div class="col-lg-6">
          <!-- <img src="https://source.unsplash.com/random/1920x1080/?restaurants'" alt="Restaurant Image" class="img-fluid"> -->
          <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img class="d-block w-100" src="https://source.unsplash.com/random/1920x1080/?desserts" alt="First slide">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="https://source.unsplash.com/random/1920x1080/?drinks" alt="Second slide">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="https://source.unsplash.com/random/1920x1080/?curry" alt="Third slide">
              </div>
            </div>
          </div>
        </div>
</div>
  </section>
  `,
})
export class MenuItemFormComponent {
  menuItem = {
    name: '',
    price: 0,
    restaurantName: ''
  };
  restaurantName : string;
  restaurantId!: string;
  userId!: string;
  private _isLoggedIn: boolean = false; // private backing field for isLoggedIn



  constructor(private route: ActivatedRoute, private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this._isLoggedIn = true;
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.restaurantId = params['restaurantId'];
      this.restaurantName = params['restaurantName'];
      this.userId = params['userId'];


    });
  }

  addMenuItem() {
    const userId = this.userId; // Replace with the actual user ID
    const restaurantId = this.restaurantId; // Replace with the actual restaurant ID

    const newMenuItem = {
      name: this.menuItem.name,
      price: this.menuItem.price,
      restaurantName : this.menuItem.restaurantName,
      // restaurantId : this.restaurantId,
    };


    console.log(this.restaurantName);

    this.http.post(`http://localhost:3000/menuitem`, newMenuItem).subscribe(
      (response) => {
        console.log('Menu item added successfully:', response);
        // Reset form values
        this.menuItem.name = '';
        this.menuItem.price = 0;
        this.menuItem.restaurantName='';
      },
      (error) => {
        console.error('Error adding menu item:', error);
      }
    );
  }

  get isLoggedIn() {
    return this._isLoggedIn; // return the private backing field
  }
}
