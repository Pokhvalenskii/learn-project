import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box } from '@mui/system';
import { Button, Typography, Link, Alert} from '@mui/material';
import TextField from '@mui/material/TextField'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import api from "../../utils/api";
import { useDispatch } from 'react-redux';
import { loggedIn} from '../../redux/loggedIn/actions'

function SignIn() {  

  const history = useHistory();
  const dispatch = useDispatch();
  
  const regEmail =/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/
  const [loggin, setLoggin] = useState(false)

  const { 
    register, 
    handleSubmit,
    formState: {
      errors
    }
  } = useForm({
    mode: 'onChange'
  });

  const onSubmit = data => {
    handleSignIn({
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        if(res === 400) {
          setLoggin(true)
        }
        if(res === 200) {
          history.push('/')
        }
      })
  }

  function handleSignIn(data) {
    return api.signin(data)
      .then((res) => {
        if(res.status === 200){
          dispatch(loggedIn(true));
          localStorage.setItem('jwt', res.token);
        }
        return res.status;
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
          {...register('email',
            {
             required: {value: true, message: 'Обязательное поле'},
             pattern: {value: regEmail, message: 'Введите корректный email'} 
            })
          }
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <TextField          
          type="password" 
          {...register('password',
            {
              required: {value: true, message: 'Обязательное поле'},              
              minLength: {value: 5,  message: 'Пароль должен содержать от 5 до 10 символов'},
              maxLength: {value: 10,  message: 'Пароль должен содержать от 5 до 10 символов'}
            })
          } 
          label='Password'
          variant='outlined'
          sx={{mb: 1}}
          error={!!errors.password}
          helperText={errors?.password?.message}
        />
        {loggin &&
        <Alert severity="error">
          <strong>Неправильный логин или пароль</strong>
        </Alert>
        }
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

export { SignIn }