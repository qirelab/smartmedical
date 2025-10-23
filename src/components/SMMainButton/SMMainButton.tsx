import * as React from 'react';
import { SMMainButtonStyles,SMMainButtonProps } from './SMMainButton.Style';

const SMMainButton: React.FC<SMMainButtonProps> = ({text, variant, IconComponent,...props}) => {
     return (
     <SMMainButtonStyles variant={variant} {...props} 
     >
          {text}
         {IconComponent && <IconComponent sx={{ color: 'inherit' }} />}
     </SMMainButtonStyles>
     )
}

export default SMMainButton