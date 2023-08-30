import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

const StyledSelect = styled(Select)(({ theme, ownerState }) => {
  const { palette, functions } = theme;
  const { error, success, disabled } = ownerState;

  const { grey, transparent, error: colorError, success: colorSuccess } = palette;
  const { pxToRem } = functions;

  const errorStyles = () => ({
    "& .Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline, &:after": {
        borderColor: colorError.main,
      },
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: colorError.main,
    },
  });

  const successStyles = () => ({
    "& .Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline, &:after": {
        borderColor: colorSuccess.main,
      },
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: colorSuccess.main,
    },
  });

  return {
    backgroundColor: disabled ? `${grey[200]} !important` : transparent.main,
    pointerEvents: disabled ? "none" : "auto",
    ...(error && errorStyles()),
    ...(success && successStyles()),
  };
});

const MDSelectRoot = ({ label, ownerState = {}, ...props }) => (
  <FormControl fullWidth variant="standard">
    <InputLabel>{label}</InputLabel>
    <StyledSelect {...props} ownerState={ownerState} />
  </FormControl>
);

MDSelectRoot.propTypes = {
  label: PropTypes.string,
  ownerState: PropTypes.shape({
    error: PropTypes.bool,
    success: PropTypes.bool,
    disabled: PropTypes.bool,
  }),
};
export default MDSelectRoot;
