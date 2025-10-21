import { createTheme } from '@mui/material/styles';
import components from './components';

const customTheme = createTheme({
  
  components: {
    ...components,
  }
});

export default customTheme;