export class BookingModel {
  id!: string;
  username!: string;
  checkindate!: Date;
  checkoutdate!: Date;
  totalprice!: number;


  room!: {
    id: string | undefined
    roomtype: string | undefined;
    hotelname: number | undefined;
    adults: string | undefined;
    children: string | undefined;
    price: string | undefined;

  }
  hotel!: {
    id: string | undefined;
    hotelname: string | undefined;
    address: string | undefined;
    rating: string | undefined;
  }
  location!: {
    id: string | undefined;
    locationname: string | undefined;
  }


}
   
