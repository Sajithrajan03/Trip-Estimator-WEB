 import HomePage from './_Component/HomePage';
 import { PrimeReactProvider } from "primereact/api";
import Tailwind from 'primereact/passthrough/tailwind';


const Page = () => {
  

   
  return (
    <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
    <HomePage />
</PrimeReactProvider>
    );  
};

export default Page;


