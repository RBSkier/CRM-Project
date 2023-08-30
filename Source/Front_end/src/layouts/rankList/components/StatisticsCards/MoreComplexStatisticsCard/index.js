

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import {useState} from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {DialogContentText} from "@mui/material";
import MDButton from "../../../../../components/MDButton";

function ComplexStatisticsCard({ color, title, count, icon }) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
        <MDBox
          variant="gradient"
          bgColor={color}
          color={color === "light" ? "dark" : "white"}
          coloredShadow={color}
          borderRadius="xl"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="4rem"
          height="4rem"
          mt={-3}
        >
          <Icon fontSize="medium" color="inherit">
            {icon}
          </Icon>
        </MDBox>
        <MDBox textAlign="right" lineHeight={1.25}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {title}
          </MDTypography>
          <MDTypography variant="h4">{count}</MDTypography>
        </MDBox>
      </MDBox>
      {/*<Divider />*/}
      <MDBox pb={1} px={2}>
        <MDTypography component="p" variant="button" color="text" display="flex" justifyContent="flex-end">
          <MDTypography
            component="span"
            variant="button"
            fontWeight="bold"
            color="info"
            onClick={() => setOpenDialog(true)}
          >
            <TipsAndUpdatesIcon fontSize="12px" />How to calculate points?
          </MDTypography>
          <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Point Rules"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                2 points for each customer, 1 point for each follow-up, and 5 points for every 10,000 in sales.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <MDButton onClick={() => setOpenDialog(false)} color="primary">
                Close
              </MDButton>
            </DialogActions>
          </Dialog>

        </MDTypography>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of ComplexStatisticsCard
ComplexStatisticsCard.defaultProps = {
  color: "info",
};

// Typechecking props for the ComplexStatisticsCard
ComplexStatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node.isRequired,
};

export default ComplexStatisticsCard;
