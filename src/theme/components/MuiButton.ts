import type { Components } from "@mui/material/styles";

const MuiButton : Components['MuiButton'] = {

     styleOverrides: {
          root: ({ theme }) => ({
               textTransform: 'none', 
               borderRadius: '10px',
               backgroundColor: "#18A36C",
               color: "#FFFFFF",
               '&:hover': {
                    backgroundColor: '#0A7349'
               },            
               variants: [
                    {
                         props: {variant: "secondary" as const},
                         style: ({ theme }) => ({
                              textTransform: 'none', 
                              borderRadius: '10px',
                              backgroundColor: "#FFFFFF",
                              border: "solid",
                              borderWidth:"1px",
                              borderColor: "#18A36C",
                              color: "#18A36C",
                              '&:hover': {
                                   backgroundColor: '#18A36C',
                                   color: "#FFFFFF",
                              },            
                         }),
                    }
               ],        
          
          }),

     }}

export default MuiButton;