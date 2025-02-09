import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// import { FaDirections } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useShop from '../Hooks/useShop';
import Loading from './Loading/Loading';
import Slider from './Slider';

const MapComponent = () => {
  const [search, setSearch] = useState('');
  const [filteredShops, setFilteredShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);

  const [allShop, loading] = useShop();
  useEffect(() => {
    setFilteredShops(
      allShop.filter((shop) =>
        shop.location.toLowerCase().includes(search.toLowerCase()) ||

        // shop.name.toLowerCase().includes(search.toLowerCase()) ||
        shop.services.some((service) =>
          service.name.toLowerCase().includes(search.toLowerCase())
        )
      )
    );

  }, [search, allShop]);

  const data = filteredShops?.filter((item) => item.status === 'approved')



  const handleMarkerClick = (shop) => {
    setSelectedShop(shop);
  };

  if (loading) {
    return <Loading />;
  }


  return (
    <div className="mt-[70px]">
      <div className="block md:flex md:flex-row-reverse">
        <div className="flex-1 h-96 md:h-auto relative">
        <div className="flex items-center">
            <input
              type="text"
              placeholder="Search salons or services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-3.5 absolute top-6 md:top-10 right-5 z-[10] w-2/3 md:w-1/3 text-gray-400 font-medium placeholder-gray-400 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
            />
          </div>
          <MapContainer
            center={[23.8103, 90.4125]}
            zoom={12}
            style={{ height: '100%', width: '100%', zIndex: 0 }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {filteredShops?.map((shop) => (
              <Marker
                key={shop._id}
                position={shop?.position}
                eventHandlers={{
                  click: () => handleMarkerClick(shop),
                }}
              >
                <Popup >
                  <div className='z-[20px]'>
                    <h3 className="font-bold">{shop.name}</h3>
                    <p className="text-sm">{shop.location}</p>
                    <Link to={`/services/${shop._id}`}>
                      <button
                        className="p-1 bg-indigo-500 text rounded"
                      >
                        View Service
                      </button>
                    </Link>
                  </div>
                </Popup>
              </Marker>

            ))}
          </MapContainer>
        </div>
        <Slider />
      </div>


            {/* ShopInfo */}
            <div className="flex flex-col w-full py-20 px-5 md:px-20 bg-white shadow-md rounded-md mb-4 md:mb-0 md:mr-4 z-10 overflow-hidden">
  <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-96">
      {data.map((shop) => (
        <div key={shop._id} className="p-4 bg-gray-100 rounded shadow">
          <h3 className="font-bold text-lg">{shop.name}</h3>
          <p className="text-sm text-gray-600">{shop.location}</p>
          <Link to={`/services/${shop._id}`}>
            <button className="mt-2 p-2 bg-indigo-500 text-white rounded">
              View Service
            </button>
          </Link>
        </div>
      ))}
    </div>
  </div>
            {/* ShopInfo */}



      <div className='hidden md:block'>
      {selectedShop && (
        <div className="space-y-4 fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg p-4 rounded-md z-20 w-80">
          <h2 className="text-lg font-semibold">{selectedShop.name}</h2>
          <p className="text-gray-600">Address: {selectedShop.location}</p>
          <Link to={`/services/${selectedShop._id}`}>
            <button
              className="my-4 p-2 bg-indigo-500 text-white rounded w-full"
            >
              View Service
            </button>
          </Link>
        </div>
      )}
      </div>
    </div>
  );
};

export default MapComponent;
