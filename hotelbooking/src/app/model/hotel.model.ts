export class HotelModel {
    id!: string;
    image!:string;
    hotelname!: string;
    address!: string;  
    rating!: string;
    location!: {
        id: string | undefined;
        locationname: string | undefined;
    };
}
