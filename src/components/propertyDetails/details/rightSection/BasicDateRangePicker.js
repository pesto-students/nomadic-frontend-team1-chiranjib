import * as React from "react";
import { connect } from "react-redux";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import {
  DateRangePicker,
} from "@mui/x-date-pickers-pro/DateRangePicker";

//importing styles
import styles from "./styles.module.css";

import { getPropertyBookedDates } from "../../../../actions/propertyAction";
import { useParams } from "react-router-dom";

const BasicDateRangePicker = ({ propertyState, getPropertyBookedDates,setDatesHandler,setBookedDatesHandler,refreshBookedDates }) => {
  const [value, setValue] = React.useState([null, null]);
  const [bookedDates, setBookedDates] = React.useState([]);

  const params = useParams();

  React.useEffect(() => {
    getPropertyBookedDatesHandler();
  }, []);

  React.useEffect(()=>{

    if(refreshBookedDates>0){
      setValue([null, null])
      getPropertyBookedDatesHandler()
    }

  },[refreshBookedDates])

  const getPropertyBookedDatesHandler = async () => {
    const getBookedDates = await getPropertyBookedDates(params.id);
    if (
      getBookedDates.status === "success" &&
      getBookedDates.data.blockedDates &&
      getBookedDates.data.blockedDates.length > 0
    ) {
      setBookedDates(getBookedDates.data.blockedDates);
      setBookedDatesHandler(getBookedDates.data.blockedDates)
    }
  };

  const disableRandomDates = (date) => {
    for (let bookedDate of bookedDates) {
      if (
        new Date(date).getTime() >= new Date(bookedDate.startDate).getTime() &&
        new Date(date).getTime() <= new Date(bookedDate.endDate).getTime()
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={{ start: "Check-in", end: "Check-out" }}
    >
      <DateRangePicker
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          setDatesHandler([new Date(newValue[0]),new Date(newValue[1])]);
        }}
        renderInput={(startProps, endProps) => (
          <div className={styles["calender-row"]}>
            <TextField className={styles["calender-input"]} {...startProps} />
            <div className={`${styles["border-right"]}`}></div>
            <TextField className={styles["calender-input"]} {...endProps} />
          </div>
        )}
        disablePast
        shouldDisableDate={(date) => disableRandomDates(date)}
      />
    </LocalizationProvider>
  );
};

const mapStateToProps = (state) => ({
  propertyState: state.propertyReducer,
});

export default connect(mapStateToProps, { getPropertyBookedDates })(
  BasicDateRangePicker
);
