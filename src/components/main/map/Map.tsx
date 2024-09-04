import { useState } from "react";

import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";

import { PinInfoModal } from "../../modals/PinInfoModal";
import { Pin } from "../../../types/global";
import { fetchPinInfoFromCoords } from "../../../services/api";

export const Map = () => {
  const [pins, setPins] = useState<Pin[]>([]);
  const [pinInfoModalOpen, setPinInfoModalOpen] = useState<boolean>(false);
  const [pinInfo, setPinInfo] = useState<Pin | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getPinInfoFromCoords = async (
    lat: number,
    lng: number
  ): Promise<AddressType> => {
    const response = await fetchPinInfoFromCoords(lat, lng);

    const info: AddressType = {
      city: response.address.city ?? "Unknown",
      neighbourhood: response.address.neighbourhood ?? "Unknown",
      postcode: response.address.postcode ?? "Unknown",
      road: response.address.road ?? "Unknown",
      state: response.address.state ?? "Unknown",
    };

    return info;
  };

  const HandleMapClickElement = () => {
    useMapEvents({
      click(e) {
        if (isLoading) return;
        addNewPin(e.latlng);
      },
    });

    return null;
  };

  const addNewPin = async (position: LatLng) => {
    setIsLoading(true);
    try {
      const lat = position.lat;
      const lng = position.lng;
      const infoFromCoords = await getPinInfoFromCoords(lat, lng);

      const newPin: Pin = {
        id: pins.length + 1,
        position,
        title: `${infoFromCoords.road}, ${infoFromCoords.city}, ${infoFromCoords.postcode}`,
        infoFromCoords,
      };
      setPins([...pins, newPin]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinClick = (pin: Pin) => {
    setPinInfo(pin);
    setPinInfoModalOpen(true);
  };

  const handleCloseModal = () => {
    setPinInfo(null);
    setPinInfoModalOpen(false);
  };

  return (
    <>
      <MapContainer
        className="h-96 m-auto"
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pins.map((pin) => (
          <Marker
            key={pin.id}
            position={pin.position}
            eventHandlers={{
              click: () => handlePinClick(pin),
            }}
          />
        ))}
        <HandleMapClickElement />
      </MapContainer>
      {pinInfoModalOpen && (
        <PinInfoModal
          pinInfoModalOpen={pinInfoModalOpen}
          handleCloseModal={handleCloseModal}
          pinInfo={pinInfo}
        />
      )}
    </>
  );
};
