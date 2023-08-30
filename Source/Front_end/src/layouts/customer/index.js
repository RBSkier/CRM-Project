import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import DataTable from "../../examples/Tables/DataTable";
import sample from "./data/sample";
import MDButton from "../../components/MDButton";
import { addCustomer, getCustomers } from "../../api/customerApi";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import MDInput from "../../components/MDInput";
import MDSelect from "../../components/MDSelect";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FormControl, InputLabel } from "@mui/material";
import {moveToPublicPool} from "../../api/publicpoolApi";

function Customers() {
  const [followUpStatus, setFollowUpStatus] = useState("All");
  const [customerType, setCustomerType] = useState("All");
  const [customerSource, setCustomerSource] = useState("All");
  const [data, setData] = useState(null);
  const { columns: pColumns, rows: pRows } = sample();
  const [tableData, setTableData] = useState({ columns: pColumns, rows: pRows });
  const [open, setOpen] = useState(false);
  const [leadSource, setLeadSource] = useState("All");
  const [customerIndustry, setCustomerIndustry] = useState("All");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const handleCheckboxChange = (id, checked) => {
    if (checked && !selectedCustomers.includes(id)) {
      setSelectedCustomers(prevSelectedCustomers => [...prevSelectedCustomers, id]);
    } else if (!checked && selectedCustomers.includes(id)) {
      setSelectedCustomers(prevSelectedCustomers => prevSelectedCustomers.filter(c => c !== id));
    }
  }
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    landline: "",
    email: "",
    mobile_phone: "",
    customer_type: "",
    company_details: "",
    lead_source: "",
    address: "",
    customer_industry: "",
    follow_up_status: "",
    principal: "",
  });
  const handleSearch = async () => {
    const filters = {
      follow_up_status: followUpStatus === "All" ? null : followUpStatus,
      customer_industry: customerIndustry === "All" ? null : customerIndustry,
      lead_source: leadSource === "All" ? null : leadSource,
      customer_type: customerType === "All" ? null : customerType,
    };


    console.log(filters);

    const customers = await getCustomers(filters);

    // 格式化数据以符合 DataTable 组件的需求
    const formattedData = customers.map((customer) => ({
      checkbox: <input type="checkbox" onChange={(e) => handleCheckboxChange(customer.id, e.target.checked)} />,
      id: customer.id,
      name: <Link to={`/detail?id=${customer.id}`}>{customer.name}</Link>,
      landline: customer.landline,
      email: customer.email,
      mobile_phone: customer.mobile_phone,
      customer_type: customer.customer_type,
      company_details: customer.company_details,
      lead_source: customer.lead_source,
      address: customer.address,
      customer_industry: customer.customer_industry,
      follow_up_status: customer.follow_up_status,
      principal: customer.principal,
    }));

    console.log(formattedData);

    // 更新 state
    setData(formattedData);
    setTableData({ columns: pColumns, rows: formattedData });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await addCustomer(formData);
      console.log("Customer added successfully:", response);
      handleCloseForm();
      // 设置 Snackbar 显示成功消息
      setSnackbarMessage("Customer added successfully");
      setSnackbarSeverity("success");
      setOpenSnackbar(true); // 打开 Snackbar
    } catch (error) {
      console.error("Failed to add customer:", error);
      // 设置 Snackbar 显示错误消息
      setSnackbarMessage("Failed to add customer");
      setSnackbarSeverity("error");
      setOpenSnackbar(true); // 打开 Snackbar
    }
  };
  const getSelectedCustomers = () => selectedCustomers;
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCloseForm = () => {
    setOpen(false);
  };

  const handleOpenForm = () => {
    const role = localStorage.getItem("role");
    if (role === "staff") {
      setOpen(true);
    } else {
      setOpen(true);
    }
  };
  const handleImportToPublic = async () => {
    // 获取选中的客户
    const selectedCustomers = getSelectedCustomers();

    // 调用 API 将选中的客户导入到公海
    await moveToPublicPool(selectedCustomers);
    await handleSearch();
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box p={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <MDBox display="flex" alignItems="center" mb={2}>
                  <MDTypography
                    style={{ marginRight: "16px", fontSize: "14px", fontWeight: "bold" }}
                  >
                    Follow-Up Status:
                  </MDTypography>
                  <ToggleButtonGroup
                    value={followUpStatus}
                    exclusive
                    onChange={(e, newValue) => setFollowUpStatus(newValue)}
                    aria-label="follow-up status"
                  >
                    <ToggleButton
                      value="All"
                      style={{
                        fontSize: "12px",
                        height: "30px",
                        border: "none",
                      }}
                    >
                      All
                    </ToggleButton>
                    <ToggleButton
                      value="Existing"
                      style={{
                        fontSize: "12px",
                        height: "30px",
                        border: "none",
                      }}
                    >
                      Existing
                    </ToggleButton>
                    <ToggleButton
                      value="Proposal"
                      style={{
                        fontSize: "12px",
                        height: "30px",
                        border: "none",
                      }}
                    >
                      Proposal
                    </ToggleButton>
                    <ToggleButton
                      value="Negotiation"
                      style={{
                        fontSize: "12px",
                        height: "30px",
                        border: "none",
                      }}
                    >
                      Negotiation
                    </ToggleButton>
                    <ToggleButton
                      value="Closed-Won"
                      style={{
                        fontSize: "12px",
                        height: "30px",
                        border: "none",
                      }}
                    >
                      Closed-Won
                    </ToggleButton>
                    <ToggleButton
                      value="Closed-Lost"
                      style={{
                        fontSize: "12px",
                        height: "30px",
                        border: "none",
                      }}
                    >
                      Closed-Lost
                    </ToggleButton>
                  </ToggleButtonGroup>
                </MDBox>
                <MDBox display="flex" alignItems="center" mb={2}>
                  <MDTypography
                    style={{ marginRight: "16px", fontSize: "14px", fontWeight: "bold" }}
                  >
                    Customer Type:
                  </MDTypography>
                  <ToggleButtonGroup
                    value={customerType}
                    exclusive
                    onChange={(e, newValue) => setCustomerType(newValue)}
                    aria-label="customer type"
                  >
                    <ToggleButton
                      value="All"
                      style={{
                        fontSize: "12px",
                        height: "30px",
                        border: "none",
                      }}
                    >
                      All
                    </ToggleButton>
                    <ToggleButton
                      value="A"
                      style={{
                        fontSize: "12px",
                        height: "30px",
                        border: "none",
                      }}
                    >
                      Premier Customer
                    </ToggleButton>
                    <ToggleButton
                      value="B"
                      style={{
                        fontSize: "12px",
                        height: "30px",
                        border: "none",
                      }}
                    >
                      Regular Customer
                    </ToggleButton>
                    <ToggleButton
                      value="C"
                      style={{
                        fontSize: "12px",
                        height: "30px",
                        border: "none",
                      }}
                    >
                      Non-Priority Customer
                    </ToggleButton>
                  </ToggleButtonGroup>
                </MDBox>
                <MDBox display="flex" alignItems="center" mb={2}>
                  <MDTypography
                    style={{ marginRight: "16px", fontSize: "14px", fontWeight: "bold" }}
                  >
                    Lead Source:
                  </MDTypography>
                  <ToggleButtonGroup
                    value={leadSource}
                    exclusive
                    onChange={(e, newValue) => setLeadSource(newValue)}
                    aria-label="lead source"
                  >
                    <ToggleButton
                      value="All"
                      style={{
                        fontSize: "12px",
                        height: "30px",
                        border: "none",
                      }}
                    >
                      All
                    </ToggleButton>
                    <ToggleButton
                      value="direct_traffic"
                      style={{
                        fontSize: "12px",
                        height: "30px",
                        border: "none",
                      }}
                    >
                      Direct Traffic
                    </ToggleButton>
                    <ToggleButton
                      value="search_engine_optimization"
                      style={{
                        fontSize: "12px",
                        height: "30px",
                        border: "none",
                      }}
                    >
                      Search Engine Optimization (SEO)
                    </ToggleButton>
                    <ToggleButton
                      value="social_media"
                      style={{
                        fontSize: "12px",
                        height: "30px",
                        border: "none",
                      }}
                    >
                      Social Media
                    </ToggleButton>
                    <ToggleButton
                      value="email_marketing"
                      style={{
                        fontSize: "12px",
                        height: "30px",
                        border: "none",
                      }}
                    >
                      Email Marketing
                    </ToggleButton>
                    <ToggleButton
                      value="offline_events"
                      style={{
                        fontSize: "12px",
                        height: "30px",
                        border: "none",
                      }}
                    >
                      Offline Events
                    </ToggleButton>
                    <ToggleButton
                      value="others"
                      style={{
                        fontSize: "12px",
                        height: "30px",
                        border: "none",
                      }}
                    >
                      Others
                    </ToggleButton>
                  </ToggleButtonGroup>
                </MDBox>
                <MDBox display="flex" alignItems="center" mb={2}>
                  <MDTypography
                    style={{ marginRight: "16px", fontSize: "14px", fontWeight: "bold" }}
                  >
                    Customer Industry:
                  </MDTypography>
                  <ToggleButtonGroup
                    value={customerIndustry}
                    exclusive
                    onChange={(e, newValue) => setCustomerIndustry(newValue)}
                    aria-label="customer industry"
                  >
                    <ToggleButton
                      value="All"
                      style={{
                        fontSize: "12px",
                        height: "30px",
                        border: "none",
                      }}
                    >
                      All
                    </ToggleButton>
                    <ToggleButton
                      value="finance"
                      style={{
                        fontSize: "12px",
                        height: "30px",
                        border: "none",
                      }}
                    >
                      Finance
                    </ToggleButton>
                    <ToggleButton
                      value="service"
                      style={{
                        fontSize: "12px",
                        height: "30px",
                        border: "none",
                      }}
                    >
                      Service
                    </ToggleButton>
                    <ToggleButton
                      value="information_technology"
                      style={{
                        fontSize: "12px",
                        height: "30px",
                        border: "none",
                      }}
                    >
                      Information Technology
                    </ToggleButton>
                    <ToggleButton
                      value="hospitality_and_tourism"
                      style={{
                        fontSize: "12px",
                        height: "30px",
                        border: "none",
                      }}
                    >
                      Hospitality and Tourism
                    </ToggleButton>
                    <ToggleButton
                      value="education"
                      style={{
                        fontSize: "12px",
                        height: "30px",
                        border: "none",
                      }}
                    >
                      Education
                    </ToggleButton>
                    <ToggleButton
                      value="media_and_entertainment"
                      style={{
                        fontSize: "12px",
                        height: "30px",
                        border: "none",
                      }}
                    >
                      Media and Entertainment
                    </ToggleButton>
                    <ToggleButton
                      value="others"
                      style={{
                        fontSize: "12px",
                        height: "30px",
                        border: "none",
                      }}
                    >
                      Others
                    </ToggleButton>
                  </ToggleButtonGroup>
                </MDBox>
                <MDBox display="flex" justifyContent="flex-end">
                  <MDButton variant="contained" onClick={handleSearch} color="info">
                    Search
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <MDBox display="flex" justifyContent="space-between" p={3}>
                <MDButton variant="contained" color="error" onClick={handleImportToPublic}>
                  Transfer to Public Pool
                </MDButton>
                <MDButton variant="contained" color="info" onClick={handleOpenForm}>
                  Add Customer
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
            <Dialog open={open} onClose={handleCloseForm}>
              <DialogTitle>Add Customer Info</DialogTitle>
              <DialogContent>
                <form onSubmit={handleSubmit}>
                  <MDBox component="div" role="form">
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Name"
                        name="name"
                        fullWidth
                        required
                        onChange={handleChange}
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Landline"
                        name="landline"
                        fullWidth
                        onChange={handleChange}
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <MDInput
                        type="email"
                        label="Email"
                        name="email"
                        fullWidth
                        onChange={handleChange}
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Mobile Phone"
                        name="mobile_phone"
                        fullWidth
                        required
                        onChange={handleChange}
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <FormControl fullWidth required>
                        <InputLabel>Customer Type</InputLabel>
                        <Select
                          name="customer_type"
                          style={{ height: "45px" }}
                          onChange={handleChange}
                        >
                          <MenuItem value="A">Premier Customer (A)</MenuItem>
                          <MenuItem value="B">Regular Customer (B)</MenuItem>
                          <MenuItem value="C">Non-priority Customer (C)</MenuItem>
                        </Select>
                      </FormControl>
                    </MDBox>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Company Details"
                        name="company_details"
                        fullWidth
                        required
                        onChange={handleChange}
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <FormControl fullWidth required>
                        <InputLabel>Lead Source</InputLabel>
                        <Select
                          name="lead_source"
                          style={{ height: "45px" }}
                          onChange={handleChange}
                        >
                          <MenuItem value="direct_traffic">Direct Traffic</MenuItem>
                          <MenuItem value="search_engine_optimization">Search Engine Optimization (SEO)</MenuItem>
                          <MenuItem value="social_media">Social Media</MenuItem>
                          <MenuItem value="email_marketing">Email Marketing</MenuItem>
                          <MenuItem value="offline_events">Offline Events</MenuItem>
                          <MenuItem value="others">Others</MenuItem>
                        </Select>
                      </FormControl>
                    </MDBox>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Address"
                        name="address"
                        fullWidth
                        onChange={handleChange}
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <FormControl fullWidth required>
                        <InputLabel>Customer Industry</InputLabel>
                        <Select
                          name="customer_industry"
                          style={{ height: "45px" }}
                          onChange={handleChange}
                        >
                          <MenuItem value="finance">Finance</MenuItem>
                          <MenuItem value="service">Service</MenuItem>
                          <MenuItem value="information_technology">Information Technology</MenuItem>
                          <MenuItem value="hospitality_and_tourism">
                            Hospitality and Tourism
                          </MenuItem>
                          <MenuItem value="education">Education</MenuItem>
                          <MenuItem value="media_and_entertainment">
                            Media and Entertainment
                          </MenuItem>
                          <MenuItem value="others">Others</MenuItem>
                        </Select>
                      </FormControl>
                    </MDBox>
                    <MDBox mb={2}>
                      <FormControl fullWidth required>
                        <InputLabel>Follow Up Status</InputLabel>
                        <Select
                          name="follow_up_status"
                          style={{ height: "45px" }}
                          onChange={handleChange}
                        >
                          <MenuItem value="existing">Existing</MenuItem>
                          <MenuItem value="proposal">Proposal</MenuItem>
                          <MenuItem value="negotiation">Negotiation</MenuItem>
                          <MenuItem value="closed-won">Closed-Won</MenuItem>
                          <MenuItem value="closed-lost">Closed-Lost</MenuItem>
                          <MenuItem value="others">Others</MenuItem>
                        </Select>
                      </FormControl>
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
                  </MDBox>
                  <DialogActions>
                    <Button onClick={handleCloseForm}>Cancel</Button>
                    <Button type="submit" color="primary">
                      Submit
                    </Button>
                  </DialogActions>
                </form>
              </DialogContent>
            </Dialog>
          </Grid>
        </Grid>
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
}

export default Customers;
