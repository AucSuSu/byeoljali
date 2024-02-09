import React, { useEffect, useState } from 'react';
import ListItem from './HomeApplyListItem';

const HomeApplyList = ({ data, status }) => {
  const [sliceItems, setSliceItems] = useState(null);
  useEffect(() => {
    const sliceData = Array.isArray(data?.object)
      ? data.object.slice(0, 8)
      : [];
    setSliceItems(sliceData);
    console.log(sliceData);
  }, [data]);

  return (
    <div className="w-[80%] ml-[10%]">
      <div
        id="grid"
        className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[950px]"
      >
        {Array.isArray(sliceItems) &&
          sliceItems.map((item, index) => (
            <ListItem key={index} data={item} status={status} />
          ))}
      </div>
    </div>
  );
};

export default HomeApplyList;
