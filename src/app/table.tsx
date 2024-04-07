import React, { useState, useEffect } from 'react';
import SortIcon from './sort';
import Chart from './chart';

// Interface for a single cryptocurrency
interface Crypto {
  id: string;
  name: string;
  rank: number;
  price_usd: number;
  percent_change_24h: number;
  price_btc: number;
  market_cap_usd: number;
}

// Props interface for DisplayTable component
interface DisplayTableProps {
  cryptos: Crypto[];
  perPage: number;
}

const DisplayTable: React.FC<DisplayTableProps> = ({ cryptos, perPage }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortedCryptos, setSortedCryptos] = useState<Crypto[]>([]);
  const [sortBy, setSortBy] = useState<keyof Crypto>('id');
  const [sortAscending, setSortAscending] = useState<boolean>(true);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  // Calculate total pages based on number of cryptos and items per page
  const totalPages = Math.ceil(cryptos.length / perPage);

  // Calculate pagination indexes for current page
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  // Get the subset of cryptos to display on the current page
  const currentCryptos = sortedCryptos.slice(startIndex, endIndex);
 

  // Pagination handlers
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (endIndex < cryptos.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Update sortedCryptos whenever cryptos, sortBy, or sortAscending changes
  useEffect(() => {
    const sorted = [...cryptos].sort((a, b) => {
      const valA = a[sortBy];
      const valB = b[sortBy];

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortAscending ? valA.localeCompare(valB) : valB.localeCompare(valA);
      } else if (typeof valA === 'number' && typeof valB === 'number') {
        return sortAscending ? valA - valB : valB - valA;
      }

      return 0;
    });

    setSortedCryptos(sorted);
  }, [cryptos, sortBy, sortAscending]);

  // Handle search input change
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  //All checkboxes are selected
  const [isChecked, setIsChecked] = useState(false);
    
  const handleToggleCheckBox = () => {
    setIsChecked((prevIsChecked) => !prevIsChecked);
    // If isChecked is true, select all crypto IDs
    if (!isChecked) {
      const allCryptoIds = cryptos.map((crypto) => crypto.id);
      setCheckedIds(allCryptoIds);
    } else {
      // If isChecked is false, deselect all crypto IDs
      setCheckedIds([]);
    }
  };

  // Handle checkbox click to select/deselect crypto
  const handleCheckBox = (id: string) => {
    const updatedCheckedIds = checkedIds.includes(id)
      ? checkedIds.filter(checkedId => checkedId !== id)
      : [...checkedIds, id];
    setCheckedIds(updatedCheckedIds);
  };

  const isCheck = (id: string) => {
    return checkedIds.includes(id);
  };

  // Sort table data by column
  const sortTableByColumn = (columnName: keyof Crypto) => {
    const isAscending = columnName === sortBy ? !sortAscending : true;
    setSortBy(columnName);
    setSortAscending(isAscending);
  };
    

  return (
    <div className="justify-center mt-8">
      {/* Display table */}
      <table className="table-auto w-full border border-white border-solid">

        <thead>
          <tr className="bg-blue-500 text-white">
            {/* Table headers */}
            <th className="border-2 px-4 py-2">
              <i
                className="material-icons"
                id="checkbox"
                onClick={handleToggleCheckBox}
                style={{ cursor: 'pointer' }}
              >
                {isChecked ? 'check_box' : 'check_box_outline_blank'}
              </i>
            </th>
            <th className="border-2 px-4 py-2 cursor-pointer" onClick={() => sortTableByColumn('id')}>
              ID <SortIcon sorted={sortBy === 'id'} ascending={sortAscending} />
            </th>
            <th className="border-2 px-2 py-2 cursor-pointer" id='name' onClick={() => sortTableByColumn('name')}>
              Name <SortIcon sorted={sortBy === 'name'} ascending={sortAscending} />
            </th>
            <th className="border-2 px-6 py-2 cursor-pointer" id='rank' onClick={() => sortTableByColumn('rank')}>
              Rank <SortIcon sorted={sortBy === 'rank'} ascending={sortAscending} />
            </th>
            <th className="border-2 px-5 py-2 cursor-pointer" id='price-usd' onClick={() => sortTableByColumn('price_usd')}>
              Price (USD) <SortIcon sorted={sortBy === 'price_usd'} ascending={sortAscending} />
            </th>
            <th className="border-2 px-4 py-2 cursor-pointer" id='percent-change' onClick={() => sortTableByColumn('percent_change_24h')}>
              Percent Change (24h) <SortIcon sorted={sortBy === 'percent_change_24h'} ascending={sortAscending} />
            </th>
            <th className="border-2 px-6 py-2 cursor-pointer" id='price-btc' onClick={() => sortTableByColumn('price_btc')}>
              Price (BTC) <SortIcon sorted={sortBy === 'price_btc'} ascending={sortAscending} />
            </th>
            <th className="border-2 px-4 py-2 cursor-pointer" id='market-cap' onClick={() => sortTableByColumn('market_cap_usd')}>
              Market Cap (USD) <SortIcon sorted={sortBy === 'market_cap_usd'} ascending={sortAscending} />
            </th>
          </tr>
        </thead>

        <tbody>
          {/* Display filtered and sorted cryptos */}
          {currentCryptos.map(crypto => (
            <tr key={crypto.id} className="text-center bg-blue-100">
              <td className="border-2 px-4 py-2 border-white">
                <i
                  className="material-icons cursor-pointer text-blue-500"
                  onClick={() => handleCheckBox(crypto.id)}
                >
                  {checkedIds.includes(crypto.id) ? 'check_box' : 'check_box_outline_blank'}
                </i>
              </td>
              <td className="border-2 px-4 py-2 border-white">{crypto.id}</td>
              <td className="border-2 px-4 py-2 border-white">{crypto.name}</td>
              <td className="border-2 px-4 py-2 border-white">{crypto.rank}</td>
              <td className="border-2 px-4 py-2 border-white">${crypto.price_usd}</td>
              <td className="border-2 px-4 py-2 border-white" id='percent-change-values'>{crypto.percent_change_24h}%</td>
              <td className="border-2 px-4 py-2 border-white" id='price-btc-values'>${crypto.price_btc}</td>
              <td className="border-2 px-4 py-2 border-white" id='market-cap-values'>${crypto.market_cap_usd}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 mx-2 rounded">
          Previous Page
        </button>

        <div className="text-lg font-semibold">
          Page: {currentPage}/{totalPages}
        </div>

        <button
          onClick={goToNextPage}
          disabled={endIndex >= cryptos.length}
          className="bg-blue-500 text-white px-4 py-2 mx-2 rounded">
          Next Page
        </button>
      </div>

      <br />

      {/* Render Chart component */}
      <Chart
        labels={sortedCryptos.slice(0, perPage).map((crypto) => crypto.name)}
        data={sortedCryptos.slice(0, perPage).map((crypto) => crypto.market_cap_usd)}
        title="Market Cap of Top 10 Cryptocurrencies"
      />
    </div>
  );
};

export default DisplayTable;
