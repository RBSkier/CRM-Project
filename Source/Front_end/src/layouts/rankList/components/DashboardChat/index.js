

import {useMemo, useState} from "react";
import DashboardCard from './card'
// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import {Line} from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from "chart.js";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// ReportsLineChart configurations
import configs from "examples/Charts/LineCharts/ReportsLineChart/configs";
import {setKPI} from "../../../../api/dashboardApi";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import MDInput from "../../../../components/MDInput";
import MDButton from "../../../../components/MDButton";
import Grid from "@mui/material/Grid";


ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

function ReportsLineChart({percentage, currentKpi, sales_amount}) {
	const [open, setOpen] = useState(false);
	const [kpi, setKpi] = useState("");
	const handleOpenDialog = () => {
		setOpen(true);
	};

	const handleCloseDialog = () => {
		setOpen(false);
	};

	const handleSetKpi = async () => {
		try {
			const kpiData = {
				kpi: kpi,
			};

			await setKPI(kpiData);
			handleCloseDialog();
			setTimeout(() => {
				window.location.reload();
			});
		} catch (error) {
			console.error("Error while setting KPI: ", error);
		}
	};

	return (
		<Card sx={{height: "100%"}}>
			<MDBox padding="1rem">
				{useMemo(
					() => (
						<MDBox
							variant="gradient"
							bgColor="success"
							borderRadius="lg"
							coloredShadow="success"
							py={2}
							pr={0.5}
							mt={-5}
							pt={-15}
							height="16.5rem"
						>
							<DashboardCard value={percentage}/>
						</MDBox>
					),
				)}
				<MDBox pt={3} pb={1} px={1}>
					<Grid container>
						<Grid item lg={6}>
							<MDTypography variant="h6" textTransform="capitalize">
								KPI
							</MDTypography>
							<MDTypography component="div" variant="button" color="text" fontWeight="light">
								Current Kpi: {currentKpi} <br />
								Sales Amount: {sales_amount}
							</MDTypography>
						</Grid>
						<Grid item lg={6} sx={{ textAlign: "right" }}>
							<MDBox justifyContent="flex-end">
								<MDButton variant="contained" onClick={handleOpenDialog}>
									Set KPI
								</MDButton>
							</MDBox>
						</Grid>
					</Grid>

					<Divider/>
					<MDBox display="flex" alignItems="center">

					</MDBox>
				</MDBox>
			</MDBox>


			<Dialog open={open} onClose={handleCloseDialog}>
				<DialogTitle>Set KPI</DialogTitle>
				<DialogContent>
					<MDInput
						label="KPI Value"
						value={kpi}
						onChange={(e) => setKpi(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<MDButton onClick={handleCloseDialog}>Cancel</MDButton>
					<MDButton onClick={handleSetKpi} variant="contained" color="primary">
						Save
					</MDButton>
				</DialogActions>
			</Dialog>
		</Card>
	);
}

export default ReportsLineChart;
