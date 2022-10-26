import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function DateEditor({ row, onRowChange }) {
  // const [startDate, setStartDate] = useState(new Date());
  // console.log(row);
  return (
    <DatePicker
      name="startDate"
      portalId="root-portal"
      placeholder="Date"
      autoFocus
      // value={startDate.toLocaleDateString()}
      onChange={(date) => {
        // setStartDate(date);
        onRowChange({ ...row, date: date.toLocaleDateString("en-US") }, true);
      }}
    />
  );
}
