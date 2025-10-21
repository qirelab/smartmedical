import { CSSObject } from "@emotion/react";

const MuiInput = {
  styleOverrides: {
    root: {
      backgroundColor: "#FFFFFF",
      borderRadius: "10px",
      border: "1px solid #D1D5DC",
      "&:hover": {
        border: "2px solid #18A36C",
      },
    } as CSSObject,
  },
};

export default MuiInput;
