import React from 'react';
// import TopTenUsers from '@/components/statistiques/topTenUsers';
import PieDocuments from '@/components/statistiques/pieDocuments'

const TableauDeBord = () => {
  return (
    <div className='pt-7 bg-secLightBg dark:bg-secDarkBg'>
      <div > 
        <h3 className='text-3xl font-medium p-3 text-center'>Statistiques General</h3>
      </div>

      <div>
        {/* <TopTenUsers/> */}
        <PieDocuments/>
      </div>
    </div>
  )
}

export default TableauDeBord