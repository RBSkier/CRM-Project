

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";
import DashboardLayout from "../../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../../examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import { resetPassword } from "../../../../api/userApi";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

function Cover() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (newPassword !== retypePassword) {
      setSnackbarMessage("New passwords do not match");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      const result = await resetPassword(currentPassword, newPassword);

      setSnackbarMessage(result.message);
      setSnackbarSeverity(result.status === "success" ? "success" : "error");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("An error occurred");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={12} />
      <Grid container spacing={3} justifyContent="center">
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={-3}
            py={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
              Reset Password
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form" onSubmit={handleResetPassword}>
              <MDBox mb={4}>
                <MDInput
                  type="password"
                  label="Current Password"
                  variant="standard"
                  fullWidth
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <MDInput
                  type="password"
                  label="New Password"
                  variant="standard"
                  fullWidth
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <MDInput
                  type="password"
                  label="Retype Password"
                  variant="standard"
                  fullWidth
                  value={retypePassword}
                  onChange={(e) => setRetypePassword(e.target.value)}
                />
              </MDBox>
              <MDBox mt={6} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth type="submit">
                  reset
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
          <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Card>
      </Grid>
    </DashboardLayout>
  );
}

export default Cover;
