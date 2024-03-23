"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingScreen from './_Component/LoadingScreen';
const Page = () => {
  const router = useRouter();

  useEffect(() => {
    
    router.push('/login');
  }, []);

  return (<div className='min-h-screen bg-[rgb(6,55,129)] '>
    <LoadingScreen/>
    </div>);  
};

export default Page;


