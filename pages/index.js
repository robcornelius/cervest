import { useEffect, useState } from "react";
import RainfallTable from "../components/table";
import Select from "../components/select";
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
      <h1>Cervest Tech Test</h1>
      {dataInRows && (
        <>
          <RainfallTable rainfallData={dataInRows} />
          Filter:{" "}
          <Select countries={countries} onChangeFunc={setFilter}></Select>
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
