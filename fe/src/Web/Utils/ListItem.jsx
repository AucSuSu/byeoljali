// ListItem.jsx
import React from 'react';

const ListItem = ({ data }) => {
  return (
    <div
      style={{ textAlign: 'center', margin: '10px', display: 'inline-block' }}
    >
      <img
        src={data.posterImageUrl}
        alt={data.title}
        style={{ width: '100px', borderRadius: '50%' }}
      />
      <p>{data.title}</p>
    </div>
  );
};

export default ListItem;
