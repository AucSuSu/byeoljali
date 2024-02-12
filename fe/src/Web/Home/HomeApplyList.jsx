import React from 'react';
import ListItem from './HomeApplyListItem';

const HomeApplyList = ({ data, status }) => {
  return (
    <div className="w-[80%] ml-[10%]">
      <div id="grid" className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.isArray(data) &&
          data.map((item, index) => (
            <ListItem key={index} data={item} status={status} />
          ))}
      </div>
    </div>
  );
};

export default HomeApplyList;
