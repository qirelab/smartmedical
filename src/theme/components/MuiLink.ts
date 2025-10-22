import type { Components } from "@mui/material/styles";

const MuiLink : Components["MuiLink"] = {

     styleOverrides: {
          root: ({theme}) => ({
               color: "#4A5565",
               textDecoration: 'none',
               '&:hover': {
                    color:"#18A36C",
                    textDecoration: 'none'
               }
          })
     }
}

export default MuiLink;