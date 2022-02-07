export interface JobRequestState {
  job: JobRequest;
  currentStep: number;
}
export interface AuthState {
  user: any;
  congnitoUser: any;
}

export interface JobRequest {
  title: string;
  description: string;
  bookingType: BookingType;
  numberOfItem: number;
  items: string[];
  location: Location;
}

export enum BookingType {
  urgent = "URGENT",
  pickWorker = "PICK_WORKER",
}

export interface Location {
  customerId: string;
  lng: string;
  lat: string;
  state: string;
  city: string;
  address: string;
}
