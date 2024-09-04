export const fetchPinInfoFromCoords = (
  lat: number,
  lng: number
): Promise<PinInfoResponse> => {
  return fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
  )
    .then((res) =>
      res.json().then((data) => ({ status: res.status, body: data }))
    )
    .then((r) => {
      if (r.status !== 200) {
        throw new Error("Something went wrong! Please try again.");
      }

      return r.body;
    })
    .catch((error) => {
      throw new Error(`Error: ${error}! Please try again.`);
    });
};
