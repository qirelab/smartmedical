'use client'
import styled from "@emotion/styled";
import TextField from '@mui/material/TextField';
import {TextFieldProps } from '@mui/material';

export type SMLoginInputProps = TextFieldProps & {
     inputType?: 'login' | 'password' | 'email' | 'phone' | 'text';
     IconComponent?: React.ElementType;
     width?: string;
     height?: string;
     borderradius?: string;
     fontWeight?: string;
     fontSize?: string;
     backgroundcolor?: string;
     textcolor?: string;
     hovercolor?: string;
     padding?: string;
     isLoading?: boolean;
}

export const SMLoginInputStyles = styled(TextField)<SMLoginInputProps>(
     ({
       width,
       height,
       borderradius,
       fontWeight,
       fontSize,
       backgroundcolor,
       textcolor,
       padding,
       hovercolor,
     }) => ({
       width: width ,
       height: height ,
       borderRadius: borderradius || '12px' ,
       
       fontWeight: fontWeight ,
       fontSize: fontSize ,
       backgroundColor: backgroundcolor || '#F3F3F5',
       color: textcolor || '#000',
       padding: padding || '0',
   
       '& .MuiOutlinedInput-root': {
          borderRadius: borderradius || '12px',
         '& fieldset': {
           borderColor: '#ccc',
         },
         '&:hover fieldset': {
           borderColor: hovercolor || '#18A36C',
         },
         '&.Mui-focused fieldset': {
           borderColor: hovercolor || '#18A36C',
         },
       },
   
       '& .MuiInputBase-input': {
         color: textcolor || '#000',
         fontSize: fontSize || '16px',
         fontWeight: fontWeight || '400',
       },
     })
   );

export default SMLoginInputStyles;