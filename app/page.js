"use client"
import DataEntry from "@/app/dataentry/page" 
import  secureLocalStorage  from  "react-secure-storage";
import { useEffect, useState } from 'react';

export default function Home() {
  const [accountStatus, setAccountStatus] = useState(null);

  useEffect(() => {
    const storedAccountStatus = secureLocalStorage.getItem("AccountStatus");
    setAccountStatus(storedAccountStatus);
  }, []);  

  

  return (
    <div>
      {accountStatus? <DataEntry />:null}
    </div>
  );
}

