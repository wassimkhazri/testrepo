import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var paypal: any;

@Component({
  selector: 'app-payme',
  templateUrl: './payme.component.html',
  styleUrls: ['./payme.component.scss'],
})
export class PaymeComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: any;

  product = {
    price: 600,
    description: 'used Ujob, decent condition',
    img: 'assets/couch.jpg',
  };

  paidFor = false;

  ngOnInit() {
    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.product.description,
                amount: {
                  currency_code: 'USD',
                  value: this.product.price,
                },
              },
            ],
          });
        },
        onApprove: async (data: any, actions: any) => {
          const order = await actions.order.capture();
          this.paidFor = true;
          console.log(order);
        },
        onError: (err: any) => {
          console.log(err);
        },
      })
      .render(this.paypalElement.nativeElement);
  }
}
