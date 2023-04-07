const Select = ({ countries, onChangeFunc }) => {
  return (
    <select
      onChange={onChangeFunc}
    >
      <option value="all">All</option>
      {countries.map((country) => {
        return (
          <option value={country} key={country}>
            {country}
          </option>
        );
      })}
    </select>
  )
}
export default Select;