// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "./components/ReportsBarChart";
import ReportsLineChart from "./components/ReportsLineChart";
import ComplexStatisticsCard from "./components/StatisticsCards/ComplexStatisticsCard";
import DashboardChat from "./components/DashboardChat";
// Data
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import {useEffect, useState} from "react";
import {getCustomerReminder, getKPI, getSalesAmount, getSalesBrief} from "../../api/dashboardApi";
import reportsBarChartData from "./data/reportsBarChartData";
import Card from "@mui/material/Card";
import MDTypography from "../../components/MDTypography";

function Dashboard() {
  const [salesData, setSalesData] = useState({ customer_amount: "0", new_followup_amount: "0", sales_amount: "0" });
  const [reminderData, setReminderData] = useState({
    last_7_days: 0,
    last_15_days: 0,
    last_30_days: 0,
    last_3_months: 0,
    last_6_months: 0,
    over_6_months: 0
  })

  const [kpi, setKpi] = useState(
    {
      kpi: "10",
      sales_amount: "0",
      percentage: "0%"
    }
  )

  const [salesChartData, setSalesChartData] = useState({
    labels: [],
    datasets: { label: "Mobile apps", data: [] },
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCustomerReminder();
        setReminderData(result.statistics);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []); // 空数组 [] 表示 useEffect 将只在组件挂载时运行一次，不会在更新时再次运行。

  useEffect(() => {
    const fetchSalesByMonth = async () => {
      try {
        const data = await getSalesAmount();
        const labels = data.sales.map(item => item.month);
        const datasetData = data.sales.map(item => item.revenue);
        setSalesChartData({labels: labels, datasets: { label: "Mobile apps", data: datasetData }});
      } catch (error) {
        console.error("Error fetching sales by month data", error);
      }
    };

    fetchSalesByMonth();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getKPI();

        // 去除percentage的百分号并转换为数字
        const percentageAsNumber = parseFloat(result.percentage.replace('%', '')) / 100;

        setKpi({
          ...result,
          percentage: percentageAsNumber
        });
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const data = await getSalesBrief();
        console.log(data);
        setSalesData(data);
      } catch (error) {
        console.error("Error fetching sales data", error);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Customer Amount"
                count={salesData.customer_amount}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Number of New Followup"
                count={salesData.new_followup_amount}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Sales Amount"
                count={"¥" + parseFloat(salesData.sales_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
							<Card>
                <DashboardChat percentage={kpi.percentage} currentKpi={kpi.kpi} sales_amount={kpi.sales_amount} />
							</Card>
						</Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="monthly sales"
                  date="updated 4 min ago"
                  chart={salesChartData}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Customer Statistics  "
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Card>
                <MDBox m={2}>
                  <MDTypography variant="h6" textTransform="capitalize">
                    customer reminder
                  </MDTypography>
                </MDBox>
                <MDBox m={2}>
                  <Grid container spacing={3}>
                    <Grid item lg ={4}>
                      <MDBox mb={1.5}>
                        <ComplexStatisticsCard
                          color="dark"
                          icon="weekend"
                          title="More than 7 Days"
                          count={reminderData.last_7_days}
                        />
                      </MDBox>
                    </Grid>
                    <Grid item lg ={4}>
                      <MDBox mb={1.5}>
                        <ComplexStatisticsCard
                          color="dark"
                          icon="weekend"
                          title="More than 15 Days"
                          count={reminderData.last_15_days}
                        />
                      </MDBox>
                    </Grid>
                    <Grid item lg ={4}>
                      <MDBox mb={1.5}>
                        <ComplexStatisticsCard
                          color="dark"
                          icon="weekend"
                          title="More than 30 Days"
                          count={reminderData.last_30_days}
                        />
                      </MDBox>
                    </Grid>
                    <Grid item lg ={4}>
                      <MDBox mb={1.5}>
                        <ComplexStatisticsCard
                          color="dark"
                          icon="weekend"
                          title="More than 3 Months"
                          count={reminderData.last_3_months}
                        />
                      </MDBox>
                    </Grid>
                    <Grid item lg ={4}>
                      <MDBox mb={1.5}>
                        <ComplexStatisticsCard
                          color="dark"
                          icon="weekend"
                          title="More than 6 Months"
                          count={reminderData.last_6_months}
                        />
                      </MDBox>
                    </Grid>
                    <Grid item lg ={4}>
                      <MDBox mb={1.5}>
                        <ComplexStatisticsCard
                          color="dark"
                          icon="weekend"
                          title="Over 12 Months"
                          count={reminderData.over_6_months}
                        />
                      </MDBox>
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
          </Grid>

        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
