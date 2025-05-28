import { assets , facilityIcons, roomCommonData} from '../assets/assets';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { roomsDummyData } from '../assets/assets';
import StarRating from '../components/StarRating';

const RoomDetailsPage = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [mainImage, setMainImage] = useState(null);

    useEffect(() => {
        const room = roomsDummyData.find((room) => room._id === id);
        room && setRoom(room);
        room && setMainImage(room.images[0]);
    }, [id]);

    return (
        room && (
            <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
                {/* Room Details */}

                <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                    <h1 className="text-3xl md:text-4xl font-playfair">
                        {room.hotel.name}
                        <span className="font-inter text-sm">
                            ({room.roomType})
                        </span>
                    </h1>
                    <p
                        className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500
                rounded-full"
                    >
                        20% OFF
                    </p>
                </div>
                {/* Room Ratings */}
                <div className="flex items-center gap-1 mt-2">
                    <StarRating />
                    <p className="ml-2">200+ reviews</p>
                </div>
                {/* Room Address */}
                <div className="flex items-center gap-1 text-gray-500 mt-2">
                    <img src={assets.locationIcon} alt="location icon" />
                    <span>{room.hotel.address}</span>
                </div>
                {/* Room Images */}
                <div className="flex flex-col lg:flex-row mt-6 gap-6">
                    <div className="lg:w-1/2 w-full">
                        <img src={mainImage} alt="Room Image" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
                        {room?.images.length > 1 &&
                            room.images.map((image, index) => (
                                <img
                                    onClick={() => setMainImage(image)}
                                    src={image}
                                    key={index}
                                    alt="Room Image"
                                    className={`w-full rounded-xl shadow-md object-cover cursor-pointer  ${
                                        mainImage === image &&
                                        'outline-3 outline-orange-500'
                                    }`}
                                />
                            ))}
                    </div>
                </div>
                {/* Room HighLight */}
                <div className="flex flex-col md:flex-row md:justify-between mt-10">
                    <div className="flex flex-col">
                        <h1>Experience Luxury Like Never before</h1>
                        <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                            {room.amenities.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100"
                                >
                                    <img
                                        src={facilityIcons[item]}
                                        className="size-5"
                                    />
                                    <p className="text-xs">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Room Price */}
                    <p className="text-2xl font-medium">
                        ${room.pricePerNight} /night
                    </p>
                </div>
                {/* CheckIn CheckOut */}
                <form
                    className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white
                shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl"
                >
                    <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500">
                        <div className="flex flex-col">
                            <label
                                htmlFor="checkInDate"
                                className="font-medium"
                            >
                                Check-In
                            </label>
                            <input
                                type="date"
                                id="checkInDate"
                                placeholder="check-In"
                                className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                                required
                            />
                        </div>
                        <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="checkOutDate"
                                className="font-medium"
                            >
                                Check-Out
                            </label>
                            <input
                                type="date"
                                id="checkOutDate"
                                placeholder="check-Out"
                                className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                                required
                            />
                        </div>
                        <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
                        <div className="flex flex-col">
                            <label htmlFor="guest" className="font-medium">
                                Guest
                            </label>
                            <input
                                type="number"
                                id="guest"
                                placeholder="0"
                                className="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-primary hover:primary-dull active:scale-95 transition-all text-white
                    rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer"
                    >
                        Check Availability
                    </button>
                </form>
                {/* Common Specifications */}
                <div className='mt-25 space-y-4'>
                    {roomCommonData.map((spec, index) => (
                        <div key={index} className="flex flex-start gap-2">
                            <img
                                src={spec.icon}
                                alt={`${spec.title}-icon`}
                                className="w-6.5"
                            />
                            <div>
                                <p className="text-base">{spec.title}</p>
                                <p className="text-gray-500">
                                    {spec.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                {/*
                <div className=''>
                    <p>
                        Guests will be allowed on the ground floor according to availability. You get a comfortable
                        Two bedroom apartment has a true city feeling. The price quoted is for guest, at the  guest please mark
                        the number of ground floor according to availability. You get the comfortable Two bedroom apartment that has a true city feeling.
                    </p>

                </div> */}
                <div className="max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500 space-y-3">
                    <h3 className="font-playfair text-lg md:text-xl font-medium text-gray-800">
                        Room Access & Accommodations
                    </h3>
                    <p>
                        Welcome to our stylish two-bedroom city apartment! This
                        elegant accommodation offers an authentic urban living
                        experience with modern amenities and contemporary
                        design.
                    </p>
                    <p>
                        <span className="font-medium text-gray-900">
                            Ground Floor Access:
                        </span>{' '}
                        Ground floor access is available upon request, subject
                        to availability. Please specify your requirements when
                        booking to help us arrange suitable accommodations.
                    </p>
                    <p>
                        <span className="font-medium text-gray-900">
                            Pricing Information:
                        </span>{' '}
                        The quoted rate is per guest. For optimal comfort, we
                        recommend a maximum of 4 guests per apartment.
                        Additional charges may apply for extra amenities or
                        services.
                    </p>
                    <p>
                        Each apartment features spacious living areas,
                        fully-equipped kitchens, premium bedding, and
                        spectacular city views. Experience true city living with
                        the comfort and convenience of a private residence.
                    </p>
                </div>
                {/* Hosted By */}
                <div className="flex flex-col items-start gap-4">
                    <div className='flex gap-4'>
                        <img src={room.hotel.owner.image} alt="Host" className="h-14 w-14 md:h-18 md:w-18 rounded-full" />
                        <div className="">
                            <p className='text-lg md:txt-xl'>Hosted by {room.hotel.name}</p>
                            <div className='flex mt-1 items-center'>
                                <StarRating />
                                <p className="ml-2">200+ reviews</p>
                            </div>
                        </div>
                    </div>
                    <button className="px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer">Contact Now</button>
                </div>
            </div>
        )
    );
};

export default RoomDetailsPage;
