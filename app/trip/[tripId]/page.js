'use client';
import { useParams } from 'next/navigation'; // Use 'next/router' instead of 'next/navigation'
import TravelApprovalPage from './TravelApprovalPage';
const Page = () => {
    const {tripId}  = useParams();
    console.log(tripId)
    return (
        
        <div className='my-auto mx-auto'>
            <TravelApprovalPage />
        </div>
    );
};
export default Page;
