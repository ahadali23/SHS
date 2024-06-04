import React from "react";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";

const CustomSnackbar = ({
  open,
  autoHideDuration,
  onClose,
  transistion,
  severity,
  message,
}) => {
  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      TransitionComponent={transistion}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
