import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import { Box } from '@mui/system';
import { Typography, Link } from '@mui/material';
import { Link as RouterLink, useHistory} from 'react-router-dom';

function SignUp(props) {

  const history = useHistory();
  const regEmail = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/

  const {
    register,
    handleSubmit
  } = useForm({mode: 'onChange'});

  function onSubmit(data) {
    props.handleSignUp({
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.confirmPassword
    })
      .then(() => {
        history.push('/signin')
      })
  }

  return (
    <Box
      style={{
        position: 'absolute', 
        left: '50%', 
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 350
      }}
      component='section'
    >
      <Typography 
        variant='h5'
        component='p'
        align='center'
        sx={{
          mb: 2
        }}
      >
        SignUp
      </Typography>
      <Box 
        onSubmit={handleSubmit(onSubmit)}
        component='form'
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <TextField
          error
          label='Name'
          sx={{mb: 1}}
          variant="outlined" 
          type="text" 
          className='signUp__input' 
          {...register('name', {required: true, minLength:3, maxLength:30})}
        />
        <TextField
          error
          label='Email'
          sx={{mb: 1}}
          variant="outlined"   
          type="text" 
          className='signUp__input'
          {...register('email', {required: true, pattern: regEmail})}
        />
        <TextField
          error
          label='Password'
          sx={{mb: 1}}
          variant="outlined"  
          type="password" 
          className='signUp__input'
          {...register('password', {required: true, minLength:3, maxLength:30})}
        />
        <TextField
          error
          label='Confirm password'
          sx={{mb: 1}}
          variant="outlined"  
          type="password" 
          className='signUp__input'
          {...register('confirmPassword', {required: true, minLength:3, maxLength:30})}
        />
        <Button
          variant="contained"
          type='submit'
          sx={{
            mt: 2,
            height: 56
          }}
        >
          Sign Up
        </Button>
      </Box>
      <Link 
        underline='none'
        component={RouterLink}
        to='/signin'
        sx={{
          mt: 2,
        }}
        align='center'
      >
        Sign Up
      </Link>
    </Box>
  )
}

export default SignUp