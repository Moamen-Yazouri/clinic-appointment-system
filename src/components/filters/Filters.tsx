interface IProps {
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
  nameFilter: string;
  setNameFilter: React.Dispatch<React.SetStateAction<string>>;
}

const Filters = (props: IProps) => {
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "nameInput") {
      props.setNameFilter(value);
    } else if (name === "selectInput") {
      props.setSelectedFilter(value);
    }
  };
  return (
    <>
      <select
        name="selectInput"
        value={props.selectedFilter}
        onChange={handleChange}
      >
        <option value="all">All</option>
        <option value="pending">pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="completed">Completed</option>
      </select>
      <input
        type="text"
        name="nameInput"
        placeholder="Enter patient name"
        value={props.nameFilter}
        onChange={handleChange}
      />
    </>
  );
};

export default Filters;
