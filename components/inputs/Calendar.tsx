import { DateRange, Range, RangeKeyDict } from "react-date-range";

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

interface CalenderProps {
    value: Range;
    disabledDates?: Date[];
    onChange: (value: RangeKeyDict) => void
}

function Calendar({
    value,
    disabledDates,
    onChange
}: CalenderProps) {
  return (
    <DateRange 
    rangeColors={["#262626"]}
    ranges={[value]}
    date={new Date()}
    onChange={onChange}
    direction="vertical"
    showDateDisplay={false}
    minDate={new Date()}
    disabledDates={disabledDates}
    />
  )
}

export default Calendar