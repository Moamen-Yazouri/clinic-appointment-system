import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateTimePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const filterTime = (time: Date) => {
    const hours = time.getHours();
    return hours >= 9 && hours <= 17;
  };

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={onDateChange}
        showTimeSelect
        dateFormat="dd/MM/yyyy, hh:mm aa"
        filterTime={filterTime}
        minTime={new Date(new Date().setHours(9, 0, 0, 0))}
        maxTime={new Date(new Date().setHours(17, 0, 0, 0))}
        placeholderText="Select Date & Time"
        required
      />
    </div>
  );
};

export default DateTimePicker;
