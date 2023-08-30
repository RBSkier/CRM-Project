import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import CustomerDetailCard from "./CustomerDetailCard";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import MDInput from "components/MDInput";
import {addTimeline, deleteCustomerById, getCustomerById, updateCustomer} from "../../api/customerApi";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Cover() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [customer, setCustomer] = useState(null); // Add this line to define a state variable for customer
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const params = new URLSearchParams(window.location.search);
  const customerId = params.get("id");
  const [addTimelineOpen, setAddTimelineOpen] = useState(false);


  const handleAddTimelineOpen = () => {
    setAddTimelineOpen(true);
  };

  const handleAddTimelineClose = () => {
    setAddTimelineOpen(false);
  };

  console.log(customerId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerData = await getCustomerById(customerId);
        if (customerData) {
          setCustomer(customerData); // 设置获取到的客户数据
        } else {
          // 可以设置一个状态来表示数据为空
          console.log("No data received");
        }
      } catch (error) {
        // 处理或显示错误信息
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [customerId]);

  const handleEdit = (customer) => {
    // Set the form data to the current customer data
    setFormData(customer);
    // Open the dialog
    setOpen(true);
  };

  const handleCloseForm = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form data submitted:", formData);

    try {
      const updatedCustomer = await updateCustomer(formData);
      console.log("Customer updated successfully:", updatedCustomer);

      setSnackbarMessage("Customer updated successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setTimeout(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Error while updating customer: ", error);
      setSnackbarMessage("Error while updating customer");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }

    // Close the dialog
    setOpen(false);
  };

  const handleAddTimeline = (customerId) => {
    handleAddTimelineOpen();
  };

  const handleAddTimelineSubmit = async (event) => {
    event.preventDefault();
    const currentTime = new Date().toISOString();

    const timelineData = {
      customer_id: customerId,
      title: event.target.title.value,
      time: currentTime,
      principal: event.target.principal.value,
      customer: customer.name,
      content: event.target.content.value,
      next_time: event.target.next_time.value
    };

    try {
      await addTimeline(timelineData);
      setSnackbarMessage("Timeline added successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // 关闭对话框
      setAddTimelineOpen(false);

      setTimeout(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Error while adding timeline: ", error);
      setSnackbarMessage("Error while adding timeline");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };


  const onDelete = async () => {
    if (customer) {
      try {
        const confirmation = window.confirm("Are you sure you want to delete this customer?");
        if (confirmation) {
          await deleteCustomerById(customer.id);
          console.log("Customer deleted successfully");
          setSnackbarMessage("Customer deleted successfully");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
          setTimeout(() => {
            window.location.href = "/customer";
          }, 2000); // 等待2秒，以便用户可以看到Snackbar消息，然后重定向
        }
      } catch (error) {
        console.error("Error while deleting customer: ", error);
        setSnackbarMessage("Error while deleting customer");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={12}>
        {customer ? (
          <>
            <CustomerDetailCard customer={customer} onEdit={handleEdit} onDelete={onDelete} onAddTimeline={handleAddTimeline} />
          </>
        ) : (
          "Loading..."
        )}
      </MDBox>


      <Dialog open={open} onClose={handleCloseForm}>
        <DialogTitle>Edit Customer Info</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <MDBox component="div" role="form">
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Name"
                  name="name"
                  value={formData.name}
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
                  value={formData.landline}
                  fullWidth
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="email"
                  label="Email"
                  name="email"
                  value={formData.email}
                  fullWidth
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Mobile Phone"
                  name="phone"
                  value={formData.mobile_phone}
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
                    value={formData.customer_type}
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
                  value={formData.company_details}
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
                    value={formData.lead_source}
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
                  value={formData.address}
                  fullWidth
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <FormControl fullWidth>
                  <InputLabel>Customer Industry</InputLabel>
                  <Select
                    name="customer_industry"
                    value={formData.customer_industry}
                    style={{ height: "45px" }}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="finance">Finance</MenuItem>
                    <MenuItem value="service">Service</MenuItem>
                    <MenuItem value="information_technology">Information Technology</MenuItem>
                    <MenuItem value="hospitality_and_tourism">Hospitality and Tourism</MenuItem>
                    <MenuItem value="education">Education</MenuItem>
                    <MenuItem value="media_and_entertainment">Media and Entertainment</MenuItem>
                    <MenuItem value="others">Others</MenuItem>
                  </Select>
                </FormControl>
              </MDBox>
              <MDBox mb={2}>
                <FormControl fullWidth>
                  <InputLabel>Follow Up Status</InputLabel>
                  <Select
                    name="follow_up_status"
                    value={formData.follow_up_status}
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

      <Dialog open={addTimelineOpen} onClose={handleAddTimelineClose}>
        <DialogTitle>Add New Timeline</DialogTitle>
        <DialogContent>
          <form onSubmit={handleAddTimelineSubmit}>
            <MDBox component="div" role="form">
              {/* Title Field */}
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Title"
                  name="title"
                  fullWidth
                  required
                />
              </MDBox>
              {/* Principal Field */}
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Principal"
                  name="principal"
                  fullWidth
                  required
                />
              </MDBox>
              {/* Content Field */}
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Content"
                  name="content"
                  fullWidth
                  required
                />
              </MDBox>
              {/* Next Time Field */}
              <MDBox mb={2}>
                <MDInput
                  type="datetime-local"
                  label="Next Time"
                  name="next_time"
                  defaultValue="2023-06-28T14:30"
                  fullWidth
                  required
                />
              </MDBox>
            </MDBox>
            <DialogActions>
              <Button onClick={handleAddTimelineClose}>Cancel</Button>
              <Button type="submit" color="primary">
                Add
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
}

export default Cover;
