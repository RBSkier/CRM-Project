

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";


// Images
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";
import React, {useState} from "react";
import MDInput from "../../components/MDInput";
import DataTable from "../../examples/Tables/DataTable";
import sample from "./data/sample";
import {FormControl, InputLabel} from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {addTask, getTasks} from "../../api/taskApi";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import {combine} from "stylis";
import {Link} from "react-router-dom";

function Task() {
	const [taskTitle, setTaskTitle] = useState('');
	const {columns: pColumns, rows: pRows} = sample();
	const [tableData, setTableData] = useState({columns: pColumns, rows: pRows});
	const [open, setOpen] = useState(false);
	const currentDate = new Date().toISOString().substring(0, 16);
	const oneDayLater = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().substring(0, 16);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState("success");

	const [taskValues, setTaskValues] = useState({
		task_title: "",
		task_description: "",
		priority: "",
		start_date: currentDate,
		due_date: oneDayLater,
		status: "uncomplete",
		principal: "",
		sub_task: []
	});

	const [filterValues, setFilterValues] = useState(
		{
			principle: "",
			due_data:"",
			priority: "",
		}
	);

	const addSubTask = () => {
		setTaskValues({
			...taskValues,
			sub_task: [...taskValues.sub_task, {title: "", status: "uncomplete"}], // Set default status here
		});
	};

	const handleFilter = () => {
		getTasks(filterValues)
			.then((tasks) => {
				const formattedTasks = tasks.map((task) => ({
					task_id: task.task_id,
					task_title: <Link to={`/task-detail?id=${task.task_id}`}>{task.task_title}</Link>,
					task_description: task.task_description,
					priority: task.priority,
					start_date: task.start_date,
					due_date: task.due_date,
					status: task.status,
					principal: task.principal,
					sub_task_amount: task.sub_task_amount,
				}));
				setTableData({ ...tableData, rows: formattedTasks });
			})
			.catch((error) => {
				console.error(error);

				setSnackbarMessage("Failed to filter tasks");
				setSnackbarSeverity("error");
				setOpenSnackbar(true);
			});
	};


	const removeSubTask = (index) => {
		const newSubTasks = [...taskValues.sub_task];
		newSubTasks.splice(index, 1);
		setTaskValues({...taskValues, sub_task: newSubTasks});
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(taskValues);
		addTask(taskValues)
			.then((response) => {
				// Assuming your api responds with success status
				setSnackbarMessage("Task added successfully");
				setSnackbarSeverity("success");
				setOpenSnackbar(true);
			})
			.catch((error) => {
				console.log(error);

				setSnackbarMessage("Failed to add task");
				setSnackbarSeverity("error");
				setOpenSnackbar(true);
			});

		setOpen(false);
	};

	const handleChange = (event) => {
		setTaskValues({
			...taskValues,
			[event.target.name]: event.target.value,
		});
	};
	const handleSearch = () => {
		getTasks({ task_title: taskTitle }).then(tasks => {
			const formattedTasks = tasks.map((task) => ({
				task_id: task.task_id,
				task_title: <Link to={`/task-detail?id=${task.task_id}`}>{task.task_title}</Link>,
				task_description: task.task_description,
				priority: task.priority,
				start_date: task.start_date,
				due_date: task.due_date,
				status: task.status,
				principal: task.principal,
				sub_task_amount: task.sub_task_amount
			}));
			setTableData({...tableData, rows: formattedTasks});
		});
	};

	const handleCloseForm = () => {
		setOpen(false);
	};
	const handleSubTaskChange = (event, index) => {
		const newSubTasks = [...taskValues.sub_task];
		newSubTasks[index][event.target.name] = event.target.value;
		setTaskValues({...taskValues, sub_task: newSubTasks});
	};
	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSnackbar(false);
	};

	const handleFilterChange = (event) => {
		setFilterValues({
			...filterValues,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<DashboardLayout>
			<DashboardNavbar/>
			<MDBox p={3}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Card>
							<MDBox p={3}>
								<MDBox display="flex" alignItems="center" mb={2}>
									<MDTypography
										style={{marginRight: '16px', fontSize: '14px', fontWeight: 'bold'}}
									>
										Task Title:
									</MDTypography>
									<MDInput
										value={taskTitle}
										onChange={(e) => setTaskTitle(e.target.value)}
										style={{marginRight: '16px', fontSize: '14px', padding: '4px'}}
									/>
									<MDButton variant="contained" onClick={handleSearch} color="info">
										Search
									</MDButton>
								</MDBox>
								<MDBox
									role="form"
								>
									<Grid container spacing={3} alignItems="center">
										<Grid item>
											<MDInput
												type="text"
												label="Principle"
												name="principal"
												onChange={handleFilterChange}
											/>
										</Grid>

										<Grid item>
											<FormControl style={{ width: '200px' }}>
												<InputLabel>Priority</InputLabel>
												<Select
													name="priority"
													style={{height: "45px"}}
													onChange={handleFilterChange}
												>
													<MenuItem value="Low">Low</MenuItem>
													<MenuItem value="Medium">Medium</MenuItem>
													<MenuItem value="High">High</MenuItem>
												</Select>
											</FormControl>
										</Grid>
										<Grid item>
											<MDTypography
												style={{marginRight: '16px', fontSize: '14px', fontWeight: 'bold'}}
											>
												Due date:
											</MDTypography>
										</Grid>
										<Grid item>
											<TextField
												type="datetime-local"
												name="due_date"
												value={filterValues.due_date}
												fullWidth
												required
												placeholder="Due Date"
												onChange={handleFilterChange}
											/>
										</Grid>

										<Grid item>
											<MDButton variant="contained" color="info" onClick={handleFilter}>
												Filter
											</MDButton>
										</Grid>
									</Grid>
								</MDBox>
							</MDBox>
						</Card>
					</Grid>

					<Grid item xs={12}>
						<Card>
							<MDBox display="flex" justifyContent="flex-end" p={3}>
								<MDButton
									variant="contained"
									color="info"
									onClick={() => {
										const role = localStorage.getItem("role");
										if (role === "staff") {
											// replace this with your snackbar code or other UI for showing error messages
											alert("Staff do not have the permission to add tasks.");
										} else {
											setOpen(true);
										}
									}}
								>
									Add Task
								</MDButton>
							</MDBox>

							<MDBox>
								<DataTable
									table={tableData}
									isSorted={false}
									entriesPerPage={false}
									showTotalEntries={false}
									noEndBorder
								/>
							</MDBox>
						</Card>
					</Grid>

					<Dialog open={open} onClose={handleCloseForm}>
						<DialogTitle>Add Task</DialogTitle>
						<DialogContent>
							<form onSubmit={handleSubmit}>
								<MDBox component="div" role="form">
									<MDBox mb={2}>
										<MDInput
											type="text"
											label="Task Title"
											name="task_title"
											fullWidth
											required
											onChange={handleChange}
										/>
									</MDBox>
									<MDBox mb={2}>
										<MDInput
											type="text"
											label="Task Description"
											name="task_description"
											fullWidth
											required
											onChange={handleChange}
										/>
									</MDBox>
									<MDBox mb={2}>
										<FormControl fullWidth required>
											<InputLabel>Priority</InputLabel>
											<Select
												name="priority"
												style={{height: "45px"}}
												onChange={handleChange}
											>
												<MenuItem value="Low">Low</MenuItem>
												<MenuItem value="Medium">Medium</MenuItem>
												<MenuItem value="High">High</MenuItem>
											</Select>
										</FormControl>
									</MDBox>
									<MDBox mb={2}>
										<TextField
											type="datetime-local"
											label="Start Date"
											name="start_date"
											value={taskValues.start_date}
											fullWidth
											required
											onChange={handleChange}
										/>
									</MDBox>
									<MDBox mb={2}>
										<TextField
											type="datetime-local"
											label="Due Date"
											name="due_date"
											value={taskValues.due_date}
											fullWidth
											required
											onChange={handleChange}
										/>
									</MDBox>

									<MDBox mb={2}>
										<FormControlLabel
											control={
												<Checkbox
													name="status"
													checked={taskValues.status === "completed"}
													defaultValue={"uncompleted"}
													onChange={(e) =>
														setTaskValues({
															...taskValues,
															status: e.target.checked ? "completed" : "uncompleted"
														})
													}
												/>
											}
											label="Completed"
										/>
									</MDBox>
									<MDBox mb={2}>
										<MDInput
											type="text"
											label="Principal"
											name="principal"
											fullWidth
											required
											onChange={handleChange}
										/>
									</MDBox>
									<MDBox mb={2}>
										<MDTypography variant="h6">Sub-tasks</MDTypography>
										{/* Display dynamic subtasks list here */}
										{taskValues.sub_task.map((subTask, index) => (
											<Grid container alignItems="center" key={index} pt={1}>
												<Grid item xs={6} sm={4} pr={4}>
													<MDInput
														type="text"
														label="Title"
														name="title"
														value={subTask.title}
														fullWidth
														required
														onChange={(e) => handleSubTaskChange(e, index)}
													/>
												</Grid>
												<Grid item xs={5} sm={4}>
													<FormControlLabel
														control={
															<Checkbox
																name="status"
																checked={subTask.status === "completed"}
																onChange={(e) => {
																	const newSubTasks = [...taskValues.sub_task];
																	newSubTasks[index].status = e.target.checked ? "completed" : "uncomplete";
																	setTaskValues({...taskValues, sub_task: newSubTasks});
																}}
															/>
														}
														label="Completed"
													/>

												</Grid>
												<Grid item xs={3} sm={2}>
													<MDButton onClick={() => removeSubTask(index)}>Remove</MDButton>
												</Grid>
											</Grid>

										))}
										<MDButton onClick={addSubTask}>Add Sub-task</MDButton>
									</MDBox>
								</MDBox>
								<DialogActions>
									<MDButton onClick={handleCloseForm}>Cancel</MDButton>
									<MDButton type="submit" color="primary" onClick={handleSubmit}>
										Submit
									</MDButton>
								</DialogActions>
							</form>
						</DialogContent>
					</Dialog>

					<Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
						<Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
							{snackbarMessage}
						</Alert>
					</Snackbar>

				</Grid>
			</MDBox>
			<MDBox mt={6} mb={12}/>
			<Card/>
		</DashboardLayout>
	);
}

export default Task;
