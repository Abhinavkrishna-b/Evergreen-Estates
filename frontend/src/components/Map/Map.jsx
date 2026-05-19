import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

const Map = ({ properties }) => {
  const centerLocation = properties.length > 0 
    ? [properties[0].latitude, properties[0].longitude] 
    : [20.0000, 77.0000]; 
  
  const zoomLevel = properties.length === 1 ? 12 : 5;

  return (
    <MapContainer 
      center={centerLocation} 
      zoom={zoomLevel} 
      scrollWheelZoom={true} 
      className="custom-map-container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {properties.map(item => (
        <Marker position={[item.latitude, item.longitude]} key={item.id}>
          <Popup className="custom-popup">
            <div className="popup-card">
              <img src={item.image} alt={item.title} />
              <div className="popup-text">
                <span className="popup-price">{item.price}</span>
                <h4>{item.title}</h4>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
