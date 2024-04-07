import React from 'react';

interface SortIconProps {
  sorted: boolean;
  ascending: boolean;
}
/*Sort icon: based on ascending and descending order it tranforms 180deg*/
const SortIcon: React.FC<SortIconProps> = ({ sorted, ascending }) => {
  return (
    <i id='sort-icon' className={`material-icons cursor-pointer absolute top-50 left-100 ${sorted ? '' : 'hidden'} ${ascending ? 'rotate-180' : ''}`}>
      sort
    </i>
  );
};

export default SortIcon;
