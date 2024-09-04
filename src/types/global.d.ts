import { LatLngExpression } from "leaflet";

interface Pin {
  id: number;
  position: LatLngExpression;
  title: string;
  infoFromCoords: AddressType;
}
