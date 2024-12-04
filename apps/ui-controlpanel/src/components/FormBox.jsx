import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const FormBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "fullWidth", // Forward all props except 'fullWidth'
})(({ fullWidth, theme }) => ({
  width: fullWidth ? "100%" : "auto", // Full width if fullWidth is true
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
}));

export default FormBox;
