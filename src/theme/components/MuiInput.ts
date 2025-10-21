import { CSSObject } from "@emotion/react";
import { Theme } from "@mui/material/styles";
import type { Components } from "@mui/material/styles";

const MuiInput : Components['MuiOutlinedInput'] = {
     
     styleOverrides: {
       root: {
         backgroundColor: "#FFFFF",
         color: "",
         borderRadius: "10px",
         border: "1px solid #D1D5DC",
         TextField: "outlined",
         "&:hover": {
           border: "2px solid #18A36C",
         },
         '&.Mui-focused': {
                border: "2px solid #18A36C",
 
          },
     }
     // } as CSSObject,
},
};

export default MuiInput;