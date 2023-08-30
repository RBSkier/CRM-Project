import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import TaskDetailCard from "./TaskDetailCard";
import { getTaskDetails } from "../../api/taskApi";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function TaskDetailPage() {
  const [task, setTask] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const params = new URLSearchParams(window.location.search);
  const taskId = params.get("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskData = await getTaskDetails(taskId);
        if (taskData) {
          console.log(taskData);
          setTask(taskData);

        } else {
          console.log("No data received");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [taskId]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={12}>
        {task ? (
          <TaskDetailCard task={task} />
        ) : (
          "Loading..."
        )}
      </MDBox>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
}

export default TaskDetailPage;
