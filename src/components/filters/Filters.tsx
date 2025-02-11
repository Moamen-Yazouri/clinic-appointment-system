import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface IProps {
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
  nameFilter: string;
  setNameFilter: React.Dispatch<React.SetStateAction<string>>;
}

const Filters = (props: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newParams = new URLSearchParams(searchParams);
    if (name === "nameInput") {
      if (value) {
        newParams.set("name", value);
      } else {
        newParams.delete("name");
      }
      setSearchParams(newParams);
    } else if (name === "selectInput") {
      if (value) {
        newParams.set("status", value);
      } else {
        newParams.delete("status");
      }
      setSearchParams(newParams);
    }
  };

  useEffect(() => {
    props.setNameFilter(searchParams.get("name") || "");
    props.setSelectedFilter(searchParams.get("status") || "");
  }, [searchParams]);

  return (
    <>
      <select
        name="selectInput"
        value={props.selectedFilter}
        onChange={handleChange}
      >
        <option value="">All</option>
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
