"use client"
import { useEffect ,useState} from 'react';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/app/_Component/LoadingScreen';
import secureLocalStorage from 'react-secure-storage'
const Page = () => {
  const router =  useRouter();
  const [accountStatus, setAccountStatus] = useState("nostatus");
  useEffect(()=>{
    setAccountStatus(parseInt(secureLocalStorage.getItem('accountStatus')));  
  },[])
   
  useEffect(() => {
    if (accountStatus != "notstatus" && accountStatus == 1 ) {
      router.replace('/applicant');  
    }
    if (accountStatus != "notstatus" && accountStatus == 2) {
        router.replace('/approver');  
      }
      if (accountStatus != "notstatus" && accountStatus == 3 ) {
        router.replace('/admin');  
      }
      if (isNaN(accountStatus)) {
        router.replace('/login');
        // console.log(accountStatus,"hi")
    }
     
  }, [accountStatus,router]);

  return (<div className='min-h-screen bg-[rgb(6,55,129)] '>
    <LoadingScreen/>
    
    </div>);  
};

export default Page;


