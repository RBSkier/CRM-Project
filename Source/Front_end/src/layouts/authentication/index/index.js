import BasicLayout from "../components/BasicLayout";
import bgImage from "../../../assets/images/bg-sign-up-cover.jpeg";
import Card from "@mui/material/Card";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";

function Basic() {
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
            Welcome To CRM System
          </MDTypography>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={2}>
            Our CRM system allows you to manage all your customer relationships and interactions
            efficiently.
          </MDTypography>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={2}>
            You can track sales, contracts, and upcoming opportunities. Start using our CRM system
            to improve your business today!
          </MDTypography>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
