// import { useSelector, useDispatch } from 'react-redux';
// import  * as types from '../../redux/signIn/actions'
import { useForm } from 'react-hook-form';
import { Box } from '@mui/system';
import { Button, Typography, Link } from '@mui/material';
import TextField from '@mui/material/TextField'
import { Link as RouterLink, useHistory } from 'react-router-dom'


function SignIn(props) {

  const history = useHistory();
  const regEmail = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/

  const { 
    register, 
    handleSubmit

  } = useForm({mode: 'onChange'});
  
  const onSubmit = data => {
    props.handleSignIn({
      email: data.email,
      password: data.password,
    })
      .then(() => {
        history.push('/')
        console.log('Отправлено: ', data)
      })
    
  }

  return (
    <Box      
      component='section'
      style={{
        position: 'absolute', 
        left: '50%', 
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 350,
      }}
    >
      <Typography 
        component='p'
        variant='h5'
        align='center'
        sx={{
          mb: 2
        }}
      >
        SignIn
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
          type='email'
          variant='outlined'
          sx={{mb: 1}}
          label='Email'
          {...register('email', {required: true, pattern: regEmail})} 
        />
        <TextField 
          type="password" 
          {...register('password', {required: true, minLength:3, maxLength:30})}
          label='Password'
          variant='outlined'
          sx={{mb: 1}} 
        />
        <Button 
          type='submit'
          variant='contained'
          sx={{
            mt: 2,
            height: 56
          }}
        >
          Sign In
        </Button>
      </Box>
      <Link 
        underline='none'
        component={RouterLink}
        to='/signup'
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

export default SignIn