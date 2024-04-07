/*Main or Root Page*/
import CryptoTablePage from './cryptotable'; //import the entire crypto table
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Girl Power Talk - Krisha', /*Title of the webpage*/
  icons: [{ rel: 'icon', url: '/favicon.ico' }], /*Favicon of the webpage*/
};

export default function Home(){
  return (
    <div className='bg-blue-50'>
      <CryptoTablePage />
    </div>
  );
};

