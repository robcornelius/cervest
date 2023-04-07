import React, { useEffect, useState } from "react";

const RainfallTable = ({ rainfallData, className }) => {
  return (
    <table class={className} cellPadding={0} cellSpacing={0}>
      <thead>
        <tr>
          <th key={0}>Region Name</th>
          {rainfallData[0].data.map((headers, i) => {
            return <th key={`headers_${i}`}>{new Date(headers.date).toDateString()}</th>;
          })}
          <th key="headers_total">Total Rainfall</th>
          <th key="headers_average">Average Rainfall</th>
          <th key="headers_count">Consecutive days of rainfail &gt; 10mm</th>
        </tr>
      </thead>
      <tbody>
        {rainfallData.map((row, k) => {
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
            <tr key={`row_${k}`}>
              <td>{row.region}</td>
              {row.data.map((rowValues, j) => {
                return <td key={`body_${j}`}>{rowValues.value}</td>;
              })}
              <td key="body_total">{total}</td>
              <td key="body_average">{average}</td>
              <td key="body_count">{count}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  )
}

export default RainfallTable;