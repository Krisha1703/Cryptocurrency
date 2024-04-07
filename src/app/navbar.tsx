import React, { useState } from 'react';

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onSearch

}) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    onSearch(query);
  };

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center flex-wrap w-full">
      {/* Left side of navbar */}
      <div className="flex items-center space-x-3 flex-1">
        {/* Cryptocurrency heading */}
        <div className="text-white text-xl font-bold heading">Cryptocurrency</div>
        
        {/* Label and search input (4 columns) */}
        <div className="flex items-center flex-1">
          <label id='datalabel' className="bg-blue-50 text-blue-500 font-bold rounded-lg px-2 py-0 mx-1">
            Label text or value
          </label>

          <div id='search' className='flex bg-white text-gray-800 rounded-md px-4 py-2 focus:outline-none w-[50%] ml-1'>
            <i className="material-icons" style={{ color: '#9CA3AF' }}>search</i>
            <input
                type="text"
                placeholder=" Search..."
                className=""
                onChange={handleSearch}
            />
          </div>

        </div>
      </div>

      {/* Right side of navbar */}
      <div className="flex items-center space-x-3" id='navbar-right'>
        {/* Delete button (1 column) */}
        <div className='flex cursor-pointer'id='delete-icon' >
            <i className="material-icons">delete</i>
            <p className="text-gray-800 font-bold focus:outline-none">Delete</p>
        </div>

        {/* Filter button (1 column) */}
        <div className='flex cursor-pointer'id='filter-icon' >
            <i className="material-icons">filter_list</i>
            <p className="text-gray-800 font-bold focus:outline-none">Filter</p>
        </div>

        {/* Export button (1 column) */}
        <button
          className="bg-white text-gray-800 px-4 py-2 flex font-bold cursor-pointer rounded-md focus:outline-none"
           id='export-icon' >
            <i className="material-icons mr-2">cloud_download</i>
            Export
        </button>

        {/* Add CTA button (1 column) */}
        <button
          className="bg-white text-gray-800 px-4 py-2 flex font-bold cursor-pointer rounded-md focus:outline-none"
           id='CTA-icon' >
            <i className="material-icons mr-2">add</i>
            Add new CTA
        </button>
        
      </div>
    </nav>
  );
};

export default Navbar;
