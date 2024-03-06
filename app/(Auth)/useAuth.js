import {REGISTER_HOTEL} from './constants';
export const register_Hotel = async (hotel) => {
    try {
        const response = await fetch(REGISTER_HOTEL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    hotelName: hotel.hotelName,
                    hotelAddress: hotel.hotelAddress,
                    hotelCity: hotel.hotelCity,                
                    hotelRating: hotel.hotelRating,
                    hotelStandardRate: hotel.hotelStandard ,
                    hotelDeluxeRate: hotel.hotelDeluxe,
                    hotelSuiteRate: hotel.hotelSuite,
                })
            });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}