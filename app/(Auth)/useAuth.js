import {REGISTER_HOTEL,REGISTER_BUS} from './constants';
import secureLocalStorage from 'react-secure-storage';
import { useRouter } from 'next/router';
export const register_Hotel = async (hotel) => {
    try {
        const response = await fetch(REGISTER_HOTEL, {
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
        
        return response;
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
                  
                    busName : bus.busName,
                    busFrom: bus.busFrom,
                    busTo : bus.busTo,
                    busAc : bus.busAc,
                    busSleeper : bus.busSleeper,
                    busPrice: bus.busPrice
                })
            });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
export const SignOut = async()=>{
    
    secureLocalStorage.clear()
    const router = useRouter();
    setTimeout(() => {
        router.push('/')
    }, 150);
    
    
}