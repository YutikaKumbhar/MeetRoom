import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ForgotPassword from '../components/ForgetPassword';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import Snackbar from '@mui/material/Snackbar';
import { AuthContext } from '../contexts/AuthContext';


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function Authentication(props) {

  // 0 = Sign In
  // 1 = Sign Up
  const [formState, setFormState] = React.useState(0);

  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');

  const [open, setOpen] = React.useState(false); //snackbar


  // Get authentication functions from AuthContext
  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  let handleAuth = async() => {
    try{
      if(formState === 0){
        let result = await handleLogin(
          username,
          password
        );
        console.log('Login result:', result);
      }
      if(formState === 1){
        let result = await handleRegister(name,username, password);
        console.log(result);
        setFullname("");
        setUsername("");
        setMessage(result);
        setOpen(true);
        setError("");
        setFormState(0);
        setPassword("");
      }
    }catch (err){
      let message = (err.response.data.message);
      setError(message);
    }
  }


  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" sx={{ justifyContent: 'space-between' }}>
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <Card variant="outlined">
          
          <div>
            <Button
              fullWidth
              variant={
                formState === 0
                  ? 'contained'
                  : 'outlined'
              }
              onClick={() => {
                setFormState(0);
              }}
            >
              <b>SIGN IN</b>
            </Button>
            <br /> <br />
            <Button
              fullWidth
              variant={
                formState === 1
                  ? 'contained'
                  : 'outlined'
              }
              onClick={() => {
                setFormState(1);
              }}
            >
              <b>SIGN UP</b>
            </Button>
          </div>
          
          {/* AUTHENTICATION FORM */}

          <Box
            component="form"
            onSubmit={handleAuth}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            {/* FULL NAME - ONLY SIGN UP */}
      
            {formState === 1 && (
              <FormControl>
                <FormLabel htmlFor="name">
                  Full Name
                </FormLabel>

                <TextField
                  id="username"
                  name="username"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }  
                  autoFocus               
                  required
                  fullWidth
                />
              </FormControl>
            )}


            {/* USERNAME */}

            <FormControl>
              <FormLabel htmlFor="username">
                Username
              </FormLabel>

              <TextField
                id="username"
                name="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                autoFocus={formState === 0}
                required
                fullWidth
              />
            </FormControl>


            {/* PASSWORD */}

            <FormControl>
              <FormLabel htmlFor="password">
                Password
              </FormLabel>

              <TextField
                id="password"
                name="password"
                type="password"
                placeholder="••••••"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
                fullWidth
              />

            </FormControl>

            <p style={{color: "red"}}>{error}</p>

            {/* SUBMIT BUTTON */}
            <Button
              type="button"
              fullWidth
              variant="contained"
              onClick={handleAuth}
            >
              {formState === 0 ? 'LogIn' : 'Register'}
            </Button>

          </Box>
        </Card>
      </SignInContainer>

      {/* SUCCESS MESSAGE */}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        message = {message}
      />
      
    </AppTheme>
  );
}