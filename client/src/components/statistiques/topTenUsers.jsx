import React from 'react';
import useFetchData from '@/hooks/useFetchData';

const TopTenUsers = () => {
  // Fetch data using your custom hook
  const { data, error } = useFetchData(`${import.meta.env.VITE_API_URL}/users/TopUsers`);

 

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '2rem', margin: 'auto' , width: '100%' }}>
      <div
        style={{
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Top Routes</h2>
       
      </div>

      <div
        className='flex gap-3 flex-wrap justify-center items-center'
      >
        {data &&
          data.map((item, index) => (
            <div
              key={item.user._id}
              className='text-center p-3 rounded-2xl flex  gap-3 justify-center items-center bg-lightCyen shadow-xl dark:bg-mainDarkBg dark:shadow-white'
            >
              <p style={{ fontSize: '1.25rem', fontWeight: '600' }}>{`${index + 1}st`}</p>
              <img
                src={`https://ui-avatars.com/api/?name=${item.user.userName}&background=random`}
                alt={`${item.user.userName}`}
                style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  margin: '0.5rem auto',
                }}
              />
              <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>{item.user.userName}</p>
              <p style={{ color: '#888', fontSize: '0.9rem' }}>{item.user.email}</p>
              <div style={{ marginTop: '0.5rem', fontSize: '1rem', fontWeight: '600' }}>
                {item["routes count"]} Documents
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopTenUsers;
