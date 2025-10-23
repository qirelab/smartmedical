'use client'
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { ButtonProps } from '@mui/material';
import { customTheme as theme } from '@/theme/theme';

export interface SMMainButtonProps extends ButtonProps {
     text?: string;
     variant?: ButtonProps['variant'];
     OnClick?: () => void;
     IconComponent?: React.ElementType;
     width?: string;
     height?: string;
     borderradius?: string;
     fontWeight?: string;
     fontSize?: string;
     texttransform?: 'none' | 'uppercase' | 'lowercase';
     backgroundcolor?: string;
     textcolor?: string;
     hovercolor?: string;
     padding?: string;
     hoverIconColor?: string;
     isLoading?: boolean;
}

export const SMMainButtonStyles = styled(Button)<SMMainButtonProps>(({ theme,width, height, borderradius, fontWeight, fontSize,
     texttransform, backgroundcolor, textcolor, padding, variant, hoverIconColor }) => ({
     padding: '15px 12px',
     display: 'flex',
     gap: '10px',
     alignItems: 'center',
     ...(padding && { padding }),
     width: width,
     height: height,
     borderRadius: borderradius, 
     fontWeight: fontWeight,
     fontSize: fontSize,
     textTransform: texttransform, 
     backgroundColor: backgroundcolor, 
     color: textcolor,
     '&:hover svg': {
     color: hoverIconColor || textcolor || 'currentColor',
    },
}))

export default SMMainButtonStyles;