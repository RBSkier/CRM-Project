

import {useEffect, useMemo, useState} from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import {Bar} from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// ReportsBarChart configurations
import configs from "examples/Charts/BarCharts/ReportsBarChart/configs";
import breakpoints from "../../../../assets/theme/base/breakpoints";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
import reportsBarChartData from "../../data/reportsBarChartData";
import {
	getCustomerStatisticsByFollowUp, getCustomerStatisticsByIndustry,
	getCustomerStatisticsBySource,
	getCustomerStatisticsByType
} from "../../../../api/dashboardApi";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ReportsBarChart({color, title, description}) {
	const [tabsOrientation, setTabsOrientation] = useState("horizontal");
	const [tabValue, setTabValue] = useState(0);
	const [chartData, setChartData] = useState({labels: [], datasets: []});
	const chart = reportsBarChartData;
	const apis = [
		getCustomerStatisticsByFollowUp,
		getCustomerStatisticsByType,
		getCustomerStatisticsBySource,
		getCustomerStatisticsByIndustry,
	];

	const tabLabels = ["Follow Up Status", "Customer Type", "Lead Source", "Customer Industry"];

	const fetchStatistics = async (api) => {
		const response = await api();
		const { statistics } = response;
		const labels = Object.keys(statistics);
		const data = Object.values(statistics);
		setChartData({ labels, datasets: { label: "Num", data } });
	};


	useEffect(() => {
		fetchStatistics(apis[tabValue]);
	}, [tabValue]);

	const handleSetTabValue = (event, newValue) => {
		setTabValue(newValue);
	};

	useEffect(() => {
		function handleTabsOrientation() {
			return window.innerWidth < breakpoints.values.sm
				? setTabsOrientation("vertical")
				: setTabsOrientation("horizontal");
		}

		window.addEventListener("resize", handleTabsOrientation);
		handleTabsOrientation();
		return () => window.removeEventListener("resize", handleTabsOrientation);
	}, []);

	const {data, options} = configs(chartData.labels || [], chartData.datasets || {});

	return (
		<Card sx={{height: "100%"}}>
			<MDBox padding="1rem">
				{useMemo(
					() => (
						<MDBox
							variant="gradient"
							bgColor={color}
							borderRadius="lg"
							coloredShadow={color}
							py={2}
							pr={0.5}
							mt={-5}
							height="16.5rem"
						>
							<Bar data={data} options={options} redraw/>
						</MDBox>
					),
					[color, chartData]
				)}
				<MDBox pt={3} pb={1} px={1}>
					<MDTypography variant="h6" textTransform="capitalize">
						{title}
					</MDTypography>
					<MDTypography component="div" variant="button" color="text" fontWeight="light">
						{description}
					</MDTypography>
					<Divider/>
					<MDBox display="flex" alignItems="center">
						<AppBar position="static">
							<Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
								{tabLabels.map((label, index) => (
									<Tab key={index} label={label}/>
								))}
							</Tabs>
						</AppBar>
					</MDBox>
				</MDBox>
			</MDBox>
		</Card>
	);
}

// Setting default values for the props of ReportsBarChart
ReportsBarChart.defaultProps = {
	color: "info",
	description: "",
};

// Typechecking props for the ReportsBarChart
ReportsBarChart.propTypes = {
	color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
	title: PropTypes.string.isRequired,
	description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default ReportsBarChart;