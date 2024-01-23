import React from 'react';
export default function ArtistInfo() {
  return (
    <>
      <h1 style={{ color: 'white' }}>ArtistInfo</h1>
      <h1 className="text-blue-500">ArtistInfo</h1>

      <div>
        <img src="/aspa.png" alt="에스파임" />
        <div>
          <h3>Aspa</h3>
          <p>SM ENT</p>
          <button>수정</button>
        </div>
      </div>
    </>
  );
}
