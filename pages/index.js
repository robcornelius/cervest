import { useEffect, useState } from "react";
import RainfallTable from "../components/table";
import Select from "../components/select";
import styled from "styled-components";

const StyledRainfallTable = styled(RainfallTable)`
  font-family: Arial, Helvetica, sans-serif;
  width: 90%;
  margin: 1rem auto 0 auto;
  th {
    padding:  0.5rem;
    border-top: 1px solid #000;
    border-right: 1px solid #000;
    border-bottom: 3px solid #000;
    border-left: 1px solid #000;
  }
  td {
    text-align: right;
    border-bottom: 1px dotted #ccc;
    padding: 0.5rem
  }
  tr td:first-child {
    border-left: 1px dotted #ccc;
    text-align: left;
  }
  tr td:last-child {
    border-right: 1px dotted #ccc
  }
  tbody tr:last-child td {
    border-bottom: 1px dotted #ccc
  }
`
const StyledHeading = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-family: Arial, Helvetica, sans-serif;
`;
const StyledSpan = styled.span`
  font-family: Arial, Helvetica, sans-serif;
  `


export default function Index({ data }) {
  const [dataInRows, setDataInRows] = useState();
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [countries, setCountries] = useState([]);
  const processData = (data) => {
    const rows = [];
    data.forEach((col, i) => {
      rows[i] = { region: col.data[i].regionName, data: [] };
      col.data.forEach((data) => {
        rows[i].data.push({ date: col.date, value: data.value });
      });
    });

    return rows;
  };
  const filterCountries = (rowData) => {
    return rowData.filter((row) => {
      return row.region === selectedRegion;
    });
  };

  const setFilter = (ev) => {
    ev.preventDefault();
    setSelectedRegion(ev.currentTarget.value);
  };

  const generateCountries = (rawData) => {
    const output = [];
    rawData[0].data.forEach((col) => {
      output.push(col.regionName);
    });
    return output;
  };

  useEffect(() => {
    setCountries(generateCountries(data));
    if (selectedRegion === "all") {
      setDataInRows(processData(data));
    } else {
      setDataInRows(filterCountries(processData(data)));
    }
  }, [data, selectedRegion]);

  return (
    <>
      <StyledHeading>Cervest Tech Test</StyledHeading>
      {dataInRows && (
        <>
          <StyledRainfallTable rainfallData={dataInRows} className="rainfallTable" />
          <div style={{width: '90%', margin: '1rem auto 0 auto'}}>
            <StyledSpan>Filter</StyledSpan>{" "}
            <Select countries={countries} onChangeFunc={setFilter}></Select>
          </div>
        </>
      )}
    </>
  );
}


export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/rainfall`);
  const data = await res.json();

  return { props: { data } };
}
