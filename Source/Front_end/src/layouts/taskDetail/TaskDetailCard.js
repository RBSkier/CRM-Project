import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Grid from "@mui/material/Grid";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import {updateTask, updateSubTask, deleteTask} from "../../api/taskApi";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import MDButton from "../../components/MDButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
function TaskDetailCard({ task }) {
  const [taskStatus, setTaskStatus] = useState(task.status || 'uncomplete');
  const [subTasks, setSubTasks] = useState(task.sub_task.map(sub_task => ({
    ...sub_task,
    status: sub_task.status || 'uncomplete',
  })));


  const handleTaskStatusChange = async (event) => {
    const newStatus = event.target.value || 'uncompleted';
    try {
      await updateTask(task.task_id, newStatus);
      setTaskStatus(newStatus); // Update state after successful API call
    } catch (error) {
      console.error("Error while updating task status:", error);
    }
  };

  const handleSubTaskStatusChange = async (subTaskId, event) => {
    const newStatus = event.target.value || 'uncompleted';
    try {
      await updateSubTask(subTaskId, newStatus);
      // Update sub task status in the state
      setSubTasks(prevSubTasks =>
        prevSubTasks.map(subTask =>
          subTask.sub_task_id === subTaskId ? { ...subTask, status: newStatus } : subTask
        )
      );
    } catch (error) {
      console.error("Error while updating subtask status:", error);
    }
  };

  const navigate = useNavigate();
  const renderSubTasks = subTasks.map(subTask => (
    <MDBox key={subTask.sub_task_id} display="flex" py={1} pr={2}>
      <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
        {subTask.title}
      </MDTypography>
      <Select
        value={subTask.status}
        onChange={(event) => handleSubTaskStatusChange(subTask.sub_task_id, event)}
      >
        <MenuItem value='completed'>completed</MenuItem>
        <MenuItem value='uncompleted'>Uncompleted</MenuItem>
      </Select>
    </MDBox>
  ));

  const info = {
    "task id": task.task_id,
    "task title": task.task_title,
    "task description": task.task_description,
    priority: task.priority,
    "start date": task.start_date,
    "due date": task.due_date,
    principal: task.principal
  };

  const labels = Object.keys(info);
  const values = Object.values(info);
  const handleDeleteTask = async () => {
    try {
      await deleteTask(task.task_id);
      navigate('/task');
    } catch (error) {
      console.error("Error while deleting task:", error);
    }
  };

  const renderItems = labels.map((label, key) => (
    <MDBox key={label} display="flex" py={1} pr={2}>
      <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
        {label}: &nbsp;
      </MDTypography>
      <MDTypography variant="button" fontWeight="regular" color="text">
        &nbsp;{values[key]}
      </MDTypography>
    </MDBox>
  ));

  return (
    <Card sx={{ height: "100%", boxShadow: "none" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Task Details
        </MDTypography>
        <MDButton variant="contained" color="error" onClick={handleDeleteTask}>
          Delete Task
        </MDButton>


      </MDBox>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <MDBox p={2}>
            <MDBox>{renderItems}</MDBox>
            <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
              Task Status: &nbsp;
            </MDTypography>
            <Select
              value={taskStatus}
              onChange={handleTaskStatusChange}
            >
              <MenuItem value='completed'>completed</MenuItem>
              <MenuItem value='uncompleted'>Uncompleted</MenuItem>
            </Select>
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <MDBox p={2}>
            <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
              Sub Tasks
            </MDTypography>
            {renderSubTasks}
          </MDBox>
        </Grid>
      </Grid>
    </Card>
  );
}

TaskDetailCard.propTypes = {
  task: PropTypes.shape({
    task_id: PropTypes.number.isRequired,
    task_title: PropTypes.string.isRequired,
    task_description: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    start_date: PropTypes.string.isRequired,
    due_date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    principal: PropTypes.string.isRequired,
    sub_task: PropTypes.arrayOf(PropTypes.shape({
      sub_task_id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired
    })).isRequired
  }).isRequired,
};

export default TaskDetailCard;
