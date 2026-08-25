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

export default function SignIn(props) {

  // 0 = Sign In
  // 1 = Sign Up
  const [formState, setFormState] = React.useState(0);

  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');

  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');

  const [error, setError] = React.useState('');

  const [message, setMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const [forgotPasswordOpen, setForgotPasswordOpen] = React.useState(false);

  // Get authentication functions from AuthContext
  // const { handleRegister, handleLogin } = React.useContext(AuthContext);

  const handleClickOpen = () => {
    setForgotPasswordOpen(true);
  };


  const handleClose = () => {
    setForgotPasswordOpen(false);
  };


  const resetErrors = () => {
    setError('');

    setUsernameError(false);
    setUsernameErrorMessage('');

    setPasswordError(false);
    setPasswordErrorMessage('');

    setNameError(false);
    setNameErrorMessage('');
  };


  const validateInputs = () => {

    resetErrors();

    let isValid = true;


    // Validate full name only during Sign Up
    if (formState === 1) {

      if (!name.trim()) {
        setNameError(true);
        setNameErrorMessage('Please enter your full name.');
        isValid = false;
      }
    }


    // Validate username
    if (!username.trim()) {

      setUsernameError(true);
      setUsernameErrorMessage('Please enter your username.');

      isValid = false;
    }


    // Validate password
    if (!password) {

      setPasswordError(true);
      setPasswordErrorMessage('Please enter your password.');

      isValid = false;

    } else if (password.length < 6) {

      setPasswordError(true);
      setPasswordErrorMessage(
        'Password must be at least 6 characters long.'
      );

      isValid = false;
    }


    return isValid;
  };

   const handleAuth = async (event) => {

    event.preventDefault();

    // Don't continue if validation fails
    if (!validateInputs()) {
      return;
    }


    try {

      setError('');


      // =========================
      // SIGN IN
      // =========================

      if (formState === 0) {

        const result = await handleLogin(
          username,
          password
        );

        console.log('Login result:', result);

      }


      // =========================
      // SIGN UP
      // =========================

      if (formState === 1) {

        const result = await handleRegister(
          name,
          username,
          password
        );

        console.log('Register result:', result);


        // Show success message
        setMessage(
          result || 'Registration successful!'
        );

        setOpen(true);


        // Clear form
        setName('');
        setUsername('');
        setPassword('');


        // Clear errors
        resetErrors();


        // Automatically switch to Sign In
        setFormState(0);
      }

    } catch (err) {

      console.error(err);

      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        'Something went wrong. Please try again.';

      setError(errorMessage);
    }
  };


  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleSubmit = (event) => {
  //   if (username || emailError || passwordError) {
  //     event.preventDefault();
  //     return;
  //   }
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     username: data.get('username'),
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };

  // const validateInputs = () => {
  //   const username = document.getElementById('username');
  //   const email = document.getElementById('email');
  //   const password = document.getElementById('password');

  //   let isValid = true;

  //   if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
  //     setEmailError(true);
  //     setEmailErrorMessage('Please enter a valid email address.');
  //     isValid = false;
  //   } else {
  //     setEmailError(false);
  //     setEmailErrorMessage('');
  //   }

  //   if (!password.value || password.value.length < 6) {
  //     setPasswordError(true);
  //     setPasswordErrorMessage('Password must be at least 6 characters long.');
  //     isValid = false;
  //   } else {
  //     setPasswordError(false);
  //     setPasswordErrorMessage('');
  //   }

  //   return isValid;
  // };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" sx={{ justifyContent: 'space-between' }}>
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <Card variant="outlined">
          
          
                {/* <Button>
                <Typography
                component="h1"
                variant="h4"
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
                Sign in
            </Typography>
            </Button> 
            <Button>
            <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign up
          </Typography>
          </Button>
          </div>
            */}
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
                resetErrors();
              }}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant={
                formState === 1
                  ? 'contained'
                  : 'outlined'
              }
              onClick={() => {
                setFormState(1);
                resetErrors();
              }}
            >
              Sign Up
            </Button>
          </div>
          
          {/* ========================= */}
          {/* AUTHENTICATION FORM */}
          {/* ========================= */}

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
                  error={nameError}
                  helperText={nameErrorMessage}
                  id="name"
                  name="name"
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
                error={usernameError}
                helperText={usernameErrorMessage}
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
                error={passwordError}
                helperText={passwordErrorMessage}
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


            {/* REMEMBER ME - ONLY SIGN IN */}

            {formState === 0 && (

              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                  />
                }
                label="Remember me"
              />

            )}


            {/* BACKEND ERROR */}

            {error && (

              <Typography
                sx={{
                  color: 'error.main',
                  textAlign: 'center',
                }}
              >
                {error}
              </Typography>

            )}


            {/* FORGOT PASSWORD */}

            {formState === 0 && (

              <ForgotPassword
                open={forgotPasswordOpen}
                handleClose={handleClose}
              />

            )}


            {/* SUBMIT BUTTON */}

            <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              {formState === 0
                ? 'Sign in'
                : 'Create account'}
            </Button>


            {/* FORGOT PASSWORD LINK */}

            {formState === 0 && (

              <Link
                component="button"
                type="button"
                onClick={handleClickOpen}
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Forgot your password?
              </Link>

            )}

          </Box>
        </Card>
      </SignInContainer>


      {/* SUCCESS MESSAGE */}

      <Snackbar
        open={open}
        autoHideDuration={4000}
        message = {message}
      />





          {/* <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Username</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your-name"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={username ? 'false' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign in
            </Button>
            
          </Box> */}
          
    </AppTheme>
  );
}