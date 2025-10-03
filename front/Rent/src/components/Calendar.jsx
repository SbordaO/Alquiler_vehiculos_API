import React from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';

const CustomCalendar = ({ reservations, onDateChange, selectedRange }) => {

  const tileDisabled = ({ date, view }) => {
    if (view === 'month') {
      // Check if the date is in the past
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (date < yesterday) {
        return true;
      }

      // Check if the date is part of any reservation
      return reservations.some(reservation => {
        const startDate = new Date(reservation.desde);
        const endDate = new Date(reservation.hasta);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        const currentDate = new Date(date);
        currentDate.setHours(0, 0, 0, 0);
        return currentDate >= startDate && currentDate <= endDate;
      });
    }
    return false;
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={onDateChange}
        value={selectedRange}
        selectRange={true}
        tileDisabled={tileDisabled}
        minDate={new Date()} // Users cannot select past dates
      />
    </div>
  );
};

export default CustomCalendar;
