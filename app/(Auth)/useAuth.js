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
                    hotelStandardPrice: hotel.hotelStandard ,
                    hotelDeluxePrice: hotel.hotelDeluxe,
                    hotelSuitePrice: hotel.hotelSuite,
                })
            });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export const register_Bus = async (bus) => {
    try {
        const response = await fetch(REGISTER_BUS,
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