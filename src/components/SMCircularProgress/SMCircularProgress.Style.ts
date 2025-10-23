'use client'
import styled from "@emotion/styled";
import { customTheme as Theme } from '@/theme/theme';
import { CircularProgress } from "@mui/material";

export const SMCircularProgressStyled = styled(CircularProgress) (({ theme }) => ({
     color: '#18A36C', // основной цвет из темы
     width: 48,
     height: 48,
     strokeLinecap: 'round',
     '& .MuiCircularProgress-circle': {
       strokeLinecap: 'round',
     },
   }));

export default SMCircularProgressStyled