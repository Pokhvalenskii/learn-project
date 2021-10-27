import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import { Box } from '@mui/system';
import { Typography, Link, Alert } from '@mui/material';
import { Link as RouterLink, useHistory} from 'react-router-dom';
import api from "../../utils/api";

function SignUp() {

  const history = useHistory();
  const [loggin, setLoggin] = useState(false);
  const regEmail =/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm({
    mode: 'onChange'
  });

  function onSubmit(data) {
    handleSignUp({
      email: data.email,
      password: data.password,
    })
    .then((res) => {
      if(res === 400) {
        setLoggin(true)
      }
      if(res === 200) {
        history.push('/signin')
      }        
    })
  }

  function handleSignUp(data) {
    return api.signup(data)
      .then((res) => {
        return res.status;
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
          label='Email'
          sx={{mb: 1}}
          variant="outlined"   
          type="text" 
          className='signUp__input'
          {...register('email',
            {
              required: {value: true, message: 'Обязательное поле'},
              pattern: {value: regEmail, message: 'Введите корректный email'}
            }
          )}
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <TextField
          label='Password'
          sx={{mb: 1}}
          variant="outlined"  
          type="password" 
          className='signUp__input'
          {...register('password',
            {
              required: {value: true, message: 'Обязательное поле'},              
              minLength: {value: 5,  message: 'Пароль должен содержать от 5 до 10 символов'},
              maxLength: {value: 10,  message: 'Пароль должен содержать от 5 до 10 символов'}
            }
          )}
          error={!!errors.password}
          helperText={errors?.password?.message}
        />
        {loggin &&
        <Alert severity="error">
          <strong>Можно зарегистрировать только определенный email</strong>
        </Alert>
        }
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
        Sign In
      </Link>
      <Typography 
        component='p'
        align='center'
        sx={{
          mb: 2
        }}
      >
        login: eve.holt@reqres.in        
      </Typography>
    </Box>
  )
}

export { SignUp }