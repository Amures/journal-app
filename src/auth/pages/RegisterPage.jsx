import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth';


const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations ={
  email: [(value) => value.includes('@'),'The email should contain a @'],
  password: [(value) => value.length >= 6,'The password length should have 6 or more characters'],
  displayName: [(value) => value.length >= 1,'The name is required'],

}
export const RegisterPage = () => {
  
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {status, errorMessage } = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const {
    formState, displayName, email, password, onInputChange, 
    isFormValid, displayNameValid, emailValid, passwordValid, 
  } = useForm(formData, formValidations);

  
  const onSubmit = ( event ) => {
    event.preventDefault();
    setFormSubmitted(true);

    if(!isFormValid) return;
    dispatch( startCreatingUserWithEmailPassword(formState) );
    

  }
  return (
    <AuthLayout title="Register Account">
      <form onSubmit={ onSubmit } className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField 
              label="Full name"
              type="text"
              placeholder='Antonio Mures'
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField 
              label="Email"
              type="email"
              placeholder='email@google.com'
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
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
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb:2, mt:1 }}>
            <Grid item xs={12} display={ !!errorMessage ? '': 'none' }>
              <Alert severity='error'>
                {errorMessage}
              </Alert>
            </Grid>

            <Grid item xs={12}>
              <Button disabled={isCheckingAuthentication} type="submit" variant='contained' fullWidth>
                Create account
              </Button>
            </Grid>

            <Grid container direction='row' justifyContent='end' marginTop={3} >
              <Typography sx={{mr:1}}>Do you already have an account?</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                Sign in
              </Link>
            </Grid>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
          

    
  )
}
