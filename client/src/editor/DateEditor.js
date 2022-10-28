import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
Date.prototype.format = function (f) {
  if (!this.valueOf()) return " ";
  var weekName = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  var d = this;
  return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
    switch ($1) {
      case "yyyy":
        return d.getFullYear();
      case "yy":
        return (d.getFullYear() % 1000).zf(2);
      case "MM":
        return (d.getMonth() + 1).zf(2);
      case "dd":
        return d.getDate().zf(2);
      default:
        return $1;
    }
  });
};
String.prototype.string = function (len) {
  var s = "",
    i = 0;
  while (i++ < len) {
    s += this;
  }
  return s;
};
String.prototype.zf = function (len) {
  return "0".string(len - this.length) + this;
};
Number.prototype.zf = function (len) {
  return this.toString().zf(len);
};

export default function DateEditor({ row, onRowChange }) {
  const [startDate, setStartDate] = useState(
    new Date().toLocaleDateString("en-US")
  );
  // console.log(row);
  return (
    <DatePicker
      name="startDate"
      portalId="root-portal"
      placeholder="Date"
      dateFormat="MM/dd/yy"
      autoFocus
      value={startDate}
      // value={startDate.toLocaleDateString()}
      onChange={(date) => {
        // setStartDate(date);
        onRowChange({ ...row, date: date.format("MM/dd/yy") }, true);
        setStartDate(date.toLocaleDateString("en-US"));
      }}
    />
  );
}
