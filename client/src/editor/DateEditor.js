import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

export default function DateEditor({ row, onRowChange, current }) {
  const startDate = new Date();
  return (
    <DatePicker
      locale={ko}
      name="startDate"
      selected={startDate}
      portalId="root-portal"
      placeholder="Date"
      dateFormat="yyyy-MM-dd"
      autoFocus
      onChange={(date) => {
        onRowChange(
          {
            ...row,
            date: [
              date.getFullYear(),
              ("0" + (date.getMonth() + 1)).slice(-2),
              ("0" + date.getDate()).slice(-2),
            ].join("-"),
          },
          true
        );
      }}
    />
  );
}
