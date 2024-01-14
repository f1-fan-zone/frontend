export interface Order {
  _id: string;
  orderDate: Date;
  totalPrice: number;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZipCode: string;
  shippingCountry: string;
  paymentMethod: string;
  isPaid: boolean;
  user: string;
  products: string[];
}
