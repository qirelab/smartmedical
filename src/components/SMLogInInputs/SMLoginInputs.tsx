import * as React from 'react';
import { SMLoginInputProps, SMLoginInputStyles } from './SMLoginInputs.Style';
import { InputAdornment } from '@mui/material';
import { TextField } from '@mui/material';

const SMLoginInput: React.FC<SMLoginInputProps> = ({
     inputType,
     IconComponent,
     isLoading,
     ...props
   }) => {
     const InputIcon = IconComponent ? (
       <InputAdornment position="start">
         <IconComponent />
       </InputAdornment>
     ) : null;
   
     return (
       <SMLoginInputStyles
         {...props}
         type={inputType === 'password' ? 'password' : 'text'}
         InputProps={{
           startAdornment: InputIcon,
           ...props.InputProps,
         }}
       />
     );
   };
   
   export default SMLoginInput;