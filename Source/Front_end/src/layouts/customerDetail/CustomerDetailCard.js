import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "../../components/MDButton";
import CustomerTimeline from "./CustomerTimeline";
import Grid from "@mui/material/Grid";

function CustomerDetailCard({ customer, onEdit, onDelete, onAddTimeline }) {
  const info = {
    id: customer.id,
    name: customer.name,
    landline: customer.landline,
    email: customer.email,
    "mobile phone": customer.mobile_phone,
    "customer type": customer.customer_type,
    "company details": customer.company_details,
    "lead source": customer.lead_source,
    address: customer.address,
    "customer industry": customer.customer_industry,
    "follow up status": customer.follow_up_status,
    principal: customer.principal,
  };

  const labels = Object.keys(info);
  const values = Object.values(info);

  // Render the card info items
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
          Customer Details
        </MDTypography>
        <MDBox>
          <MDButton variant="contained" color="info" onClick={() => onEdit(customer)}>
            Edit
          </MDButton>
          <MDButton
            variant="contained"
            color="error"
            onClick={() => onDelete(customer.id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </MDButton>
          <MDButton
            variant="contained"
            color="success"
            onClick={() => onAddTimeline(customer.id)}
            style={{ marginLeft: "10px" }}
          >
            New Timeline
          </MDButton>
        </MDBox>
      </MDBox>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
        <MDBox p={2}>
          <MDBox>{renderItems}</MDBox>
        </MDBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <MDBox p={2}>
        <CustomerTimeline followUpLog={customer.follow_up_log} />
          </MDBox>
      </Grid>
      </Grid>
    </Card>
  );
}

// Typechecking props for the CustomerDetailCard
CustomerDetailCard.propTypes = {
  customer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    landline: PropTypes.string.isRequired,
    mobile_phone: PropTypes.string.isRequired, // 修改phone为mobile_phone
    email: PropTypes.string.isRequired,
    customer_type: PropTypes.string.isRequired,
    company_details: PropTypes.string.isRequired,
    lead_source: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    customer_industry: PropTypes.string.isRequired, // 修改industry为customer_industry
    follow_up_status: PropTypes.string.isRequired,
    principal: PropTypes.string.isRequired, // 添加principal属性
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAddTimeline: PropTypes.func.isRequired,
};

export default CustomerDetailCard;
