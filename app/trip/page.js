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
//   useEffect(() => {
//     if (accountStatus == 1 && accountStatus != "notstatus") {
//       router.replace('/applicant');  
//     }
//     if (accountStatus == 2 && accountStatus != "notstatus") {
//         router.replace('/approver');  
//       }
//       if (accountStatus == 3 && accountStatus != "notstatus") {
//         router.replace('/admin');  
//       }
     
//   }, [accountStatus,router]);

  return (<div className='min-h-screen bg-[rgb(6,55,129)] '>
    <LoadingScreen/>
    
    </div>);  
};

export default Page;


