import { Input, Select } from "antd";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./filters.css";

interface IProps {
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
  nameFilter: string;
  setNameFilter: React.Dispatch<React.SetStateAction<string>>;
}

const Filters = (props: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (
    value: string | null,
    e?: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newParams = new URLSearchParams(searchParams);

    if (e) {
      if (e.target.name === "nameInput") {
        if (value) {
          newParams.set("name", value);
        } else {
          newParams.delete("name");
        }
        setSearchParams(newParams);
      }
    } else {
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
    <div className="filters-container">
      <Input
        placeholder="Enter patient name"
        className="filter-input"
        name="nameInput"
        value={props.nameFilter}
        onChange={(e) => handleChange(e.target.value, e)}
      />
      <Select
        defaultValue=""
        className="filter-select"
        value={props.selectedFilter}
        onChange={(value) => handleChange(value)}
        options={[
          { value: "", label: "All" },
          { value: "pending", label: "pending" },
          { value: "confirmed", label: "Confirmed" },
          { value: "completed", label: "Completed" },
        ]}
      />
    </div>
  );
};

export default Filters;
