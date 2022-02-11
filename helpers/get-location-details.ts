interface LocationInfo {
  city: string | undefined;
  lng: string | undefined;
  lat: string | undefined;
  error: any;
}
export const getPlaceInformation = async (lat: number, lng: number) => {
  const apiKey = "AIzaSyDJHF_JXu4QD7YeJCRgyRp-Yqez7JLR29A";

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );
    const data: any = await res.json();
    let city;
    const latitude = data?.results[0].geometry.location.lat;
    const lngitude = data?.results[0].geometry.location.lng;

    for (let i = 0; i < data?.results[0]?.address_components.length; i++) {
      for (
        let j = 0;
        j < data?.results[0]?.address_components[i]?.types.length;
        j++
      ) {
        switch (data?.results[0]?.address_components[i]?.types[j]) {
          case "locality":
            city = data?.results[0]?.address_components[i]?.long_name;
            break;
        }
      }
    }

    const locationInfo: LocationInfo = {
      city: city,
      lat: latitude,
      lng: lngitude,
      error: null,
    };
    return locationInfo;
  } catch (error) {
    return {
      city: undefined,
      lat: undefined,
      lng: undefined,
      error: error,
    };
  }
};
