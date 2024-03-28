'use client';
import { useParams } from 'next/navigation'; // Use 'next/router' instead of 'next/navigation'

const Page = () => {
    const {tripId}  = useParams();
    console.log(tripId)
    return (
        <div className='text-white'>{tripId}</div>
    );
};
export default Page;
