"use client"
import React, { useState, useEffect } from 'react';
import DisplayTable from './table';
import Navbar from './navbar';

const CryptoTablePage = () => {
  const [cryptos, setCryptos] = useState<any[]>([]); // Assuming cryptos is an array of any type
  const [originalCryptos, setOriginalCryptos] = useState<any[]>([]); // Store original data fetched from API
  const [error, setError] = useState(null);
  const perPage = 10 //Per page 10 rows are displayed

  // Handle search action
  const handleSearch = (query: string) => {
    const filteredCryptos = originalCryptos.filter((crypto) => {
      const normalizedQuery = query.toLowerCase(); //converts the entire query to lowercase
      return (
        crypto.name.toLowerCase().includes(normalizedQuery) || //returns matched filter name
        crypto.id.toLowerCase().includes(normalizedQuery)    //returns matched filter id
      );
    });
  setCryptos(filteredCryptos);
};


  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await fetch('https://api.coinlore.net/api/tickers/'); //Gets API data

          if (!response.ok) {
              throw new Error('Failed to fetch data'); //Error handling
          }

          const data = await response.json();
          const fetchedCryptos = data.data || [];

          setCryptos(fetchedCryptos); // Initialize cryptos state with fetched data
          setOriginalCryptos(fetchedCryptos); // Store original data
      } 
      catch (error: any) {
          setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='bg-blue-50'>
      {/*Link to google api icons used thorugh out this project*/}
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

      <Navbar 
        onSearch={handleSearch} //For handling search feature
      />
      {error && <div>Error: {error}</div>}

      <DisplayTable cryptos={cryptos} perPage={perPage} /> {/*Displays the table*/}
    </div>
  );
};

export default CryptoTablePage;
