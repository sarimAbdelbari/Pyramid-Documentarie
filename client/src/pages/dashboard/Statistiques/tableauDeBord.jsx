import React from 'react';
import TopTenUsers from '@/components/statistiques/topTenUsers';
import PieDocuments from '@/components/statistiques/pieDocuments'
import BoxOfCards from '@/components/statistiques/boxOfCards';
import ActiveGroops from '@/components/statistiques/activeGroops';

const TableauDeBord = () => {
  return (
    <div className=' bg-secLightBg dark:bg-secDarkBg'>
      <div > 
        <h3 className='text-3xl font-medium p-3 text-center'>Statistiques General</h3>
      </div>

      <div className='grid grid-cols-1 place-content-center xl:grid-cols-2 gap-4 '>
        <TopTenUsers />
        <PieDocuments/>
        <BoxOfCards/>
        <ActiveGroops/>
      </div>
    </div>
  )
}

export default TableauDeBord