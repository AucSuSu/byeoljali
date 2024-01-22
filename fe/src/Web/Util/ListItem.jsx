// ListItem.jsx
import React from 'react';

const ListItem = ({ data }) => {
  return (
    <div
      style={{ textAlign: 'center', margin: '10px', display: 'inline-block' }}
    >
      <img
        src={data.imageUrl}
        alt={data.altText}
        style={{ width: '100px', borderRadius: '50%' }}
      />
      <p>{data.text}</p>
    </div>
  );
};

export default ListItem;
