import React from 'react';
import useFetchData from '@/hooks/useFetchData';

const TopTenUsers = () => {
  // Fetch data using your custom hook
  const { data, loading, error } = useFetchData(`${import.meta.env.VITE_API_URL}/users/TopUsers`);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: 'auto' }}>
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
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem',
        }}
      >
        {data &&
          data.map((item, index) => (
            <div
              key={item.user._id}
              style={{
                textAlign: 'center',
                padding: '1rem',
                border: '1px solid #ddd',
                borderRadius: '12px',
                background: '#fff',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>{`${index + 1}st`}</div>
              <img
                src={`https://ui-avatars.com/api/?name=${item.user.userName}&background=random`}
                alt={`${item.user.userName}`}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  margin: '0.5rem auto',
                }}
              />
              <div style={{ fontSize: '1.1rem', fontWeight: '500' }}>{item.user.userName}</div>
              <div style={{ color: '#888', fontSize: '0.9rem' }}>{item.user.email}</div>
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
