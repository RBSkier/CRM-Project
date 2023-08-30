

import {useEffect, useMemo, useState} from "react";

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
	Filler, ArcElement,
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
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
import breakpoints from "../../../../assets/theme/base/breakpoints";
import {Pie} from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
	ArcElement,
);
const pieChartColors = [
	"#FF6384",
	"#36A2EB",
	"#FFCE56",
	"#A3A0FB",
	"#23CCEF",
	"#FFA8A8",
	"#6F52ED",
	"#FF7851",
	"#6FCF97",
	"#56CCF2",
	"#EB5757",
	"#F2C94C",
];
function ReportsLineChart({color, title, description, date, chart}) {
	const {data, options} = configs(chart.labels || [], chart.datasets || {});
	const [tabsOrientation, setTabsOrientation] = useState("horizontal");
	const [tabValue, setTabValue] = useState(0);
	const createPieChartData = (labels, datasets) => {
		console.log(datasets);
		return {
			labels,
			datasets: [
				{
					data: datasets.data, // 假设您的数据在第一个数据集中
					backgroundColor: pieChartColors,
					hoverOffset: 4,
				},
			],
		};
	};
	const pieChartOptions = {
		plugins: {
			legend: {
				position: "top",
				labels: {
					color: 'rgba(255,255,255,0.9)'  // 调整为你想要的颜色
				}
			},
		},
		responsive: true,
		maintainAspectRatio: false,
	};

	const renderChart = () => {
		switch (chartType) {
			case "line":
				return <Line data={data} options={options} redraw />;
			case "pie":
				const pieChartData = createPieChartData(chart.labels || [], chart.datasets || []);
				return <Pie data={pieChartData} options={pieChartOptions} redraw />;
			default:
				return null;
		}
	};
	useEffect(() => {
		// A function that sets the orientation state of the tabs.
		function handleTabsOrientation() {
			return window.innerWidth < breakpoints.values.sm
				? setTabsOrientation("vertical")
				: setTabsOrientation("horizontal");
		}

		/**
     The event listener that's calling the handleTabsOrientation function when resizing the window.
		 */
		window.addEventListener("resize", handleTabsOrientation);

		// Call the handleTabsOrientation function to set the state with the initial value.
		handleTabsOrientation();

		// Remove event listener on cleanup
		return () => window.removeEventListener("resize", handleTabsOrientation);
	}, [tabsOrientation]);
	const [chartType, setChartType] = useState("line");

	const handleSetTabValue = (event, newValue) => setTabValue(newValue);
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
							{renderChart()}
						</MDBox>
					),
					[chart, color, chartType]
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
							<Tabs orientation={tabsOrientation} value={chartType}
										onChange={(event, newValue) => setChartType(newValue)}>
								<Tab label="Line" value="line"/>
								<Tab label="Pie" value="pie"/>
							</Tabs>
						</AppBar>
					</MDBox>
				</MDBox>
			</MDBox>
		</Card>
	);
}

// Setting default values for the props of ReportsLineChart
ReportsLineChart.defaultProps = {
	color: "info",
	description: "",
};

// Typechecking props for the ReportsLineChart
ReportsLineChart.propTypes = {
	color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
	title: PropTypes.string.isRequired,
	description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	date: PropTypes.string.isRequired,
	chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default ReportsLineChart;
