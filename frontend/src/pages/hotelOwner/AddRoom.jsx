import { useState } from 'react';
import Title from '../../components/Title';
import { assets } from '../../assets/assets';


const AddRoom = () => {

    const [images, setImages] = useState({
        1: null,
        2: null,
        3: null,
        4:null
    });

    const [inputs, setInputs] = useState({
        roomType: "",
        pricePerNight: 0,
        amenities: {
            "Free Wifi": false,
            "Free Breakfast": false,
            "Room Service": false,
            "Free Parking": true,
            "Mountain View": false,
            "Pool Access": false,
        }
    })

return (
    <form>
        <form action="">
            <Title
                align="left"
                font="Outfit"
                title="Add Room"
                subTitle="Fill in the details carefully and accurate room details, pricing, and amenities, to enhance the user booking experience"
            />
        </form>
        {/* Upload Area for Images */}
        <p className="text-gray-800 mt-10">Upload Images</p>
        <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
            {Object.keys(images).map((key) => (
                <label
                    key={key}
                    htmlFor={`roomImage${key}`}
                    className="cursor-pointer"
                >
                    <img
                        src={
                            images[key]
                                 ? URL.createObjectURL(images[key])
                                : assets.uploadArea
                        }
                        alt={`RoomImage ${key}`}
                        className="max-h-13 cursor-pointer opacity-80"
                    />
                    <input type="file" accept="image/*" id={`roomImage${key}`}
                        className="hidden" onChange={(e) =>
                            setImages({
                                ...images,
                                [key]: e.target.files[0],
                            })}
                    />
                </label>
            ))}
        </div>
        {/* Room Type */}
        <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
            <div className="flex-1 max-w-48">
                <p className="text-gray-800 mt-4">
                    Room Type
                </p>
                <select onChange={(e) => setInputs({ ...inputs, roomType: e.target.value })} className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-full'>
                    <option value="">Select Room Type</option>
                    <option value="double">Single Bed</option>
                    <option value="suite">Double Bed</option>
                    <option value="deluxe">Luxury Room</option>
                    <option value="family">Family Suite</option>
                </select>
            </div>
            {/* Price Per Night  */}
            <div className="flex-1 max-w-48">
            <p className="mt-4 text-gray-800">
                <span className="text-xs">/night </span>
                </p>
                <input type='number' placeholder="0" className="border border-gray-300 mt-1 rounded p-2 w-24" value={inputs.pricePerNight} onChange={(e) => setInputs({ ...inputs, pricePerNight: e.target.value })}/>
            </div>
        </div>
        <p className="text-gray-800">Amenities</p>
        <div className="flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm">
            {Object.keys(inputs.amenities).map((amenity, index) => (
                <div key={index} className="flex items-center gap-2">
                    <input type="checkbox" id={`amenities${index+1}`} checked={inputs.amenities[amenity]} onChange={() => setInputs({ ...inputs, amenities: { ...inputs.amenities, [amenity]: !inputs.amenities[amenity] } })} />
                    <label htmlFor={`amenities${index+1}`} className="text-gray-800">{amenity}</label>
                </div>
            ))}
        </div>
        <button className="bg-primary text-white rounded px-8 py-2 mt-8 cursor-pointer hover:bg-blue-600 transition duration-200">Add Room</button>


    </form>
);
}

export default AddRoom;
