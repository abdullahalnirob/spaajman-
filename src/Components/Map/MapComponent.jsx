import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaDirections } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useShop from '../../Hooks/useShop';
import Loading from '../Loading/Loading';
import LeafletMachine from './LeafletMachine';
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
// import L from "leaflet";
const MapComponent = () => {
  const [search, setSearch] = useState('');
  const [filteredShops, setFilteredShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);

  const [allShop, loading] = useShop();
  console.log([allShop])
  useEffect(() => {
    setFilteredShops(
      allShop.filter((shop) =>
        shop.name.toLowerCase().includes(search.toLowerCase()) ||
        shop.services.some((service) =>
          service.name.toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  }, [search, allShop]);

  const handleMarkerClick = (shop) => {
    setSelectedShop(shop);
  };

  if (loading) {
    return <Loading />;
  }


  return (
    <div className="relative h-screen pt-16">
      <div className="flex flex-col-reverse md:flex-row p-4 h-full">
        <div className="flex flex-col w-full md:w-1/3 p-4 bg-white shadow-md rounded-md mb-4 md:mb-0 md:mr-4 z-10 overflow-hidden">
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search salons or services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-3.5 w-full text-gray-400 font-medium placeholder-gray-400 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
            />
            <FaDirections className=' text-3xl text-indigo-700 ml-4 cursor-pointer ' />
          </div>

          <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-96">
            {filteredShops.map((shop) => (
              <div key={shop._id} className="p-4 bg-gray-100 rounded shadow">
                <h3 className="font-bold text-lg">{shop.name}</h3>
                <p className="text-sm text-gray-600">{shop.location}</p>
                <Link to={`/services/${shop._id}`}>
                  <button className="mt-2 p-2 bg-blue-500 text-white rounded">
                    View Service
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 h-96 md:h-auto relative">
          <MapContainer
            center={[25.4052, 55.5136]}
            zoom={12}
            style={{ height: '100%', width: '100%', zIndex: 0 }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {filteredShops?.map((shop) => (

              <>
                <Marker
                  key={shop._id}
                  //bro ajman shohorer info insert kore dynamic kore 
                  //diben ami nirob bolchi

                  // position={shop?.position}
                  position={[25.3052, 55.5136]}

                  eventHandlers={{
                    click: () => handleMarkerClick(shop),
                  }}
                >
                  <Popup>
                    <div>
                      <h3 className="font-bold">{shop.name}</h3>
                      <p className="text-sm">{shop.location}</p>
                      <Link
                        to={`/services/${shop._id}`}
                        className="mt-2 p-1 bg-blue-500 text-white rounded"
                      >
                        View Service
                      </Link>
                    </div>
                  </Popup>
                </Marker>
                <Marker
                  key={shop._id}
                  //bro ajman shohorer info insert kore dynamic kore 
                  //diben ami nirob bolchi

                  // position={shop?.position}
                  position={[25.3052, 55.4136]}

                  eventHandlers={{
                    click: () => handleMarkerClick(shop),
                  }}
                >
                  <Popup>
                    <div>
                      <h3 className="font-bold">{shop.name}</h3>
                      <p className="text-sm">{shop.location}</p>
                      <Link
                        to={`/services/${shop._id}`}
                        className="mt-2 p-1 bg-blue-500 text-white rounded"
                      >
                        View Service
                      </Link>
                    </div>
                  </Popup>
                </Marker>
              </>

            ))}
            <LeafletMachine />
          </MapContainer>
        </div>
      </div>

      {selectedShop && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg p-4 rounded-md z-20 w-80">
          <h2 className="text-lg font-semibold">{selectedShop.name}</h2>
          <p className="text-gray-600">Address: {selectedShop.location}</p>
          <Link
            to={`/services/${selectedShop._id}`}
            className="mt-4 p-2 bg-blue-500 text-white rounded w-full"
          >
            View Service
          </Link>
        </div>
      )}
    </div>
  );
};
// let DefaultIcon = L.icon({
//   iconUrl: "./",
//   iconSize: [25, 41],
//   iconAnchor: [10, 41],
//   popupAnchor: [2, -40],
// });
// L.Marker.prototype.options.icon = DefaultIcon;
export default MapComponent;
