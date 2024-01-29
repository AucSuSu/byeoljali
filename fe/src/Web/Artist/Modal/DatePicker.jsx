import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

export default function DatePicker({ ...props }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="yyyy/MM/dd h:mm aa"
      />
    </>
  );
}
