import { Worker } from "../src/API";

export interface JobRequestState {
  job: JobRequest;
  currentStep: number;
}

interface LngLtd {
  lat: number;
  lng: number;
}
interface LocationInfo {
  city: string;
  lng: string;
  lat: string;
}
export interface AuthState {
  user: Worker | undefined;
  congnitoUser: any;
  isActive: boolean;
}

export interface Loading {
  gettingLocation: boolean;
  gettingUser: boolean;
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
