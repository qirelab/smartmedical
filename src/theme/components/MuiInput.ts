import type { Components } from "@mui/material/styles";

const MuiInput : Components['MuiInputBase'] = {
     styleOverrides: {
          root: ({ theme }) => ({
               backgroundColor: "#FFFFFF",
               borderRadius: "10px",
               border: "1px solid #D1D5DC",
          '&:hover': {
                    border: "2px solid #18A36C"
            },     
          }),
          
          
      },
  };

export default {MuiInput} as Components