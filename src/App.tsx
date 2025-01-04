import GeneralMenu from './components/GeneralMenu';
import { DrawerProvider } from './contexts/DrawerContext/DrawerContext';
import AppRoutes from './routes';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: `"Sora", "Roboto"`,
      fontWeightRegular: 500,
    },
    palette: {
      mode: 'light',
      primary: { main: '#ff7a55' },
      secondary: { main: '#202020' },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <DrawerProvider>
        <GeneralMenu>
          <AppRoutes />
        </GeneralMenu>
      </DrawerProvider>
    </ThemeProvider>
  );
}

export default App;
