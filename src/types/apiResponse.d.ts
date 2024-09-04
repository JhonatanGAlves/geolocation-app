interface AddressType {
  city: string;
  neighbourhood: string;
  postcode: string;
  road: string;
  state: string;
}

interface PinInfoResponse {
  address: AddressType;
}
