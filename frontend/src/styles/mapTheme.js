const mapTheme = [
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },

  {
    featureType: "transit",
    stylers: [{ visibility: "off" }],
  },

  {
    featureType: "administrative",
    stylers: [{ visibility: "off" }],
  },

  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ff00aa" }],
  },

  {
    featureType: "road",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },

  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#dbeafe" }],
  },

  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#f8fafc" }],
  },

  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [{ color: "#f3f4f6" }],
  },

  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#eef2ff" }],
  },
];

export default mapTheme;