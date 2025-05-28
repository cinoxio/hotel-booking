import React, { useState } from 'react';
import { roomsDummyData } from '../../assets/assets';
import Title from '../../components/Title';

const ListRoom = () => {
    const [rooms, setRooms] = useState(roomsDummyData);
    console.log(rooms);
    return (
        <div>
            <Title
                title="Room Listing"
                subTitle="View, edit, or manage all listed rooms. Keep the information up-to-date t0 provide the best experience for users."
                align="left"
                font="Outfit"
            />
            <p className="mt-8 text-gray-500 ">All Rooms</p>
            <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-gray-800 font-medium">
                                Name
                            </th>
                            <th className="px-4 max-sm:hidden py-3 text-gray-800 font-medium">
                                Facility
                            </th>
                            <th className="px-4 py-3 text-gray-800 font-medium">
                                Price / night
                            </th>
                            <th className="px-4 text-center py-3 text-gray-800 font-medium">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {rooms.map((room, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-200"
                            >
                                <td className="py-3 px-4 text-gray-700 border border-gray-300">
                                    {room.roomType}
                                </td>
                                <td className="py-3 px-4 text-gray-700 border border-gray-300 max-sm:hidden">
                                    {room.amenities.join(', ')}
                                </td>
                                <td className="py-3 px-4 text-gray-700 border border-gray-300">
                                    $ {room.pricePerNight}
                                </td>
                                <td className="py-3 px-4 border border-gray-300 text-sm text-red-500 text-center">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={room.isAvailable}
                                        />
                                        <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors durations-200"></div>
                                        <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                                    </label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListRoom;
