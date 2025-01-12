import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Google } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';

import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";

import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth/";

const formData = {
  email: '',
  password: ''
};

export const LoginPage = () => {

  const {status, errorMessage} = useSelector( state => state.auth);
  // console.log({status, errorMessage});
  const dispatch = useDispatch();

  const {email, password, onInputChange} = useForm(formData);

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    // console.log({email, password});
    dispatch(startLoginWithEmailPassword({email, password}));
  }

  const onGoogleSignIn = () => {
    console.log('On google sign in')
    dispatch(startGoogleSignIn());
  }


  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField 
              label="Email"
              type="email"
              placeholder='email@google.com'
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField 
              label="Password"
              type="password"
              placeholder='Password'
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid 
            container
            display={!!errorMessage ? '' : 'none'}
            sx={{ mt:1 }}
          >
            <Grid
              item
              xs={12}
            >
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb:2, mt:1 }}>
            <Grid item xs={12} sm={6}>
              <Button 
               disabled={ isAuthenticating}
               type="submit"
               variant='contained'
               fullWidth
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button disabled={isAuthenticating} onClick={onGoogleSignIn} variant='contained' fullWidth>
                <Google/>
                <Typography sx={{ml:1}}>Google</Typography>
              </Button>
            </Grid>
            <Grid container direction='row' justifyContent='end' marginTop={3}>
              <Link component={ RouterLink } color='inherit' to="/auth/register">
                Create an account
              </Link>
            </Grid>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
          

    
  )
}
