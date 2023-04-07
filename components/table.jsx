import React, { useEffect, useState } from "react";

const RainfallTable = ({ rainfallData }) => {

  return (
    <table border={1} cellPadding={2}>
      <thead>
        <tr>
          <th key={0}>Region Name</th>
          {rainfallData[0].data.map((headers, i) => {
            return <th key={i}>{new Date(headers.date).toDateString()}</th>;
          })}
          <th>Total Rainfall</th>
          <th>Average Rainfall</th>
          <th>Consecutive days of rainfail &gt; 10mm</th>
        </tr>
      </thead>
      <tbody>
        {rainfallData.map((row, i) => {
          let total = 0;
          let average = 0;
          let count = 0;
          row.data.map((data) => {
            total = total + data.value;
            if (data.value > 10) {
              count++
            }
          });
          average = Math.round(total / row.data.length * 100) / 100;
          return (
            <tr>
              <td>{row.region}</td>
              {row.data.map((rowValues, i) => {
                return <td key={i}>{rowValues.value}</td>;
              })}
              <td>{total}</td>
              <td>{average}</td>
              <td>{count}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  )
}

export default RainfallTable;