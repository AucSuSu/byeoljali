// List.jsx
import React from 'react';
import ListItem from './ListItem';

const List = ({ dataList }) => {
  return (
    <div>
      {dataList.map((item, index) => (
        <ListItem key={index} data={item} />
      ))}
    </div>
  );
};

export default List;
