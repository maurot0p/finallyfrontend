import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Accounts from './Account';
import Transactions from './Transactions';
import Button from '@mui/material/Button';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
); 
const mdTheme = createTheme();

function DashboardContent(props) {

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [isToggled, setIsToggled] = React.useState(true); //Lets me switch between accounts and transactions
  


  const [disabledButton, setDisabledButton] = React.useState('btn2');       //I should morph this states into one
  const onButtonClick = (param) => {
  setDisabledButton(param);
  setIsToggled(!isToggled)
}   
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Hi, username!
            </Typography>
          </Toolbar>
          <Divider />
          <List component="nav">
          <Box textAlign='center'>
          <Button 
              onClick={() => onButtonClick('btn2')} disabled={disabledButton === 'btn2'}
              type="submit"
              style={{ "min-height": "50px", width: "75%" }}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Accounts
            </Button>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box textAlign='center'>
            <Button
              onClick={() => onButtonClick('btn1')} disabled={disabledButton === 'btn1'}
              type="submit"
              style={{ "min-height": "50px", width: "75%" }}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Transactions
              </Button>
              </Box>

          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />

          <Container direction="row" maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {isToggled?  //ternary operator, if isToggled true then render accounts, else render transactions
            <Grid container direction="row" spacing={2} display="flex">
                <Accounts onLinkClick={onButtonClick}></Accounts> 
            </Grid>
            :
              <Grid>
                  <Transactions></Transactions>
                </Grid>
              }

          </Container>
        </Box>

      </Box>

    </ThemeProvider>
    
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}