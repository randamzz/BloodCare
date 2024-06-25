import React, { useState, useEffect } from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";

const theme = createTheme({
  palette: {
    primary: {
      main: "#dc004e",
    },
    success: {
      main: "#69c0b4",
    },
    button: {
      main: "#a80707a5",
    },
  },
});

export default function ColorsTimeline() {
  const [bloodHistory, setBloodHistory] = useState([]);

  const fetchBloodHistory = async () => {
    try {
      const accessToken = Cookies.get("access_token");
      const response = await axios.get(
        "http://localhost:8000/hospitals/list_blood_history/",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      console.log(response.data);
      setBloodHistory(response.data);
    } catch (error) {
      console.error("Error fetching blood history: ", error.message);
    }
  };

  const clearHistory = async () => {
    try {
      const accessToken = Cookies.get("access_token");
      await axios.delete(
        "http://localhost:8000/hospitals/clear_blood_history/",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setBloodHistory([]);
    } catch (error) {
      console.error("Error clearing blood history: ", error.message);
    }
  };

  useEffect(() => {
    fetchBloodHistory();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Timeline
        position="alternate"
        className="overflow-auto"
        style={{ maxHeight: "500px" }}
      >
        {bloodHistory.map((event, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot
                color={event.action === "Increase" ? "success" : "primary"}
              />
              {index < bloodHistory.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="h6">
                {event.action === "Increase" ? "Increase" : "Decrease"} (
                {event.blood_type})
              </Typography>
              <Typography>
                {event.action === "Increase"
                  ? `Stock increased by ${event.quantity_change} ml`
                  : `Transfusion of ${event.quantity_change} ml`}
              </Typography>
              <Typography color="textSecondary">
                {new Date(event.timestamp).toLocaleDateString()}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={clearHistory}
          className="rounded-5"
          style={{ marginLeft: "43%" }}
        >
          Clear History
        </Button>
      </div>
    </ThemeProvider>
  );
}
