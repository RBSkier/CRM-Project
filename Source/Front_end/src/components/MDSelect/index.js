import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for MDSelect
import MDSelectRoot from "components/MDSelect/MDSelectRoot";

const MDSelect = forwardRef(({ error, success, disabled, ...rest }, ref) => (
  <MDSelectRoot {...rest} ref={ref} ownerState={{ error, success, disabled }} />
));

// Setting default values for the props of MDSelect
MDSelect.defaultProps = {
  error: false,
  success: false,
  disabled: false,
};

// Typechecking props for the MDSelect
MDSelect.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default MDSelect;
