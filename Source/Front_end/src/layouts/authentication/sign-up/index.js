

// react-router-dom components
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { register } from "api/userApi";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import BasicLayout from "../components/BasicLayout";
import { FormControl, InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MDSelect from "../../../components/MDSelect";

function Cover() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isManager, setIsManager] = useState(false);
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check for illegal characters
    const illegalCharacterPattern = /[^a-zA-Z0-9]/;
    if (illegalCharacterPattern.test(username) || illegalCharacterPattern.test(password)) {
      setErrorMsg("Illegal char in your username or password!");
      setErrorSnackbar(true);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      setErrorSnackbar(true);
      return;
    }

    // clear the error message state
    setErrorMsg("");

    const role = isManager ? "manager" : "staff"; // Convert isManager boolean to a role string

    try {
      const result = await register(username, password, role, email, firstname, lastname);

      if (result.status === "success") {
        // set the success message
        setSuccessMsg(result.message);

        // open the snackbar
        setOpenSnackbar(true);

        // wait for 2 seconds before redirecting
        setTimeout(() => navigate("/authentication/sign-in"), 2000);
      } else {
        setErrorMsg(result.message);
        setErrorSnackbar(true);
      }
    } catch (error) {
      console.error(`Error registering user: ${error}`);
      setErrorMsg("Error from server.");
      setErrorSnackbar(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
    setErrorSnackbar(false);
  };
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Username"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Confirm Password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="First Name"
                fullWidth
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Last Name"
                fullWidth
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <FormControlLabel
                control={
                  <Checkbox checked={isManager} onChange={(e) => setIsManager(e.target.checked)} />
                }
                label="Is Manager"
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                Sign Up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity="success">
            {successMsg} {/* Display the success message */}
          </Alert>
        </Snackbar>
        <Snackbar open={errorSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity="error">
            {errorMsg} {/* Display the error message */}
          </Alert>
        </Snackbar>
      </Card>
    </BasicLayout>
  );
}

export default Cover;
