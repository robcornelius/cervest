export default function Index({ data }) {
  const processedData = [
    {
      name: "France",
      data: [],
    },
    {
      name: "Spain",
      data: [],
    },
    {
      name: "Norway",
      data: [],
    },
  ];

  data.forEach((row) => {
    processedData[0].data.push({ date: row.date, data: row.data[0].value });
    processedData[1].data.push({ date: row.date, data: row.data[1].value });
    processedData[2].data.push({ date: row.date, data: row.data[2].value });
  });
  console.log(processedData);

  return (
    <>
      <h1>Cervest Tech Test</h1>
      <table>
        <thead>
          <th>Region Name</th>
          {data.map((row) => {
            return <th>{new Date(row.date).toDateString()}</th>;
          })}
        </thead>
        <tbody>
          {processedData.map((row) => {
            return (
              <tr>
                <td>
                  <strong>{row.name}</strong>
                </td>
                {row.data.map((row) => {
                  return <td>{row.data}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/rainfall`);
  const data = await res.json();

  return { props: { data } };
}
