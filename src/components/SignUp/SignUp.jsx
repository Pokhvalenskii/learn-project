import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import { Box } from '@mui/system';
import { Typography, Link, Alert } from '@mui/material';
import { Link as RouterLink, useHistory} from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

function SignUp(props) {

  const history = useHistory();
  // const regEmail = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/
  const regPass = /^([^0-9]*)$/
  const [loggin, setLoggin] = useState(false);

  const schema = yup.object().shape({
    email: yup.string()
      .email('Введите корректный email')
      .required('Обязательное поле'),
    password: yup.string()
      .min(6, 'Пароль должен содержать от 6 до 30 букв')
      .max(30, 'Пароль должен содержать от 6 до 30 букв')
      .matches(regPass, 'Пароль должен содержать от 6 до 30 букв')
      .required('Обязательное поле'),
    confirmPassword: yup.string()
      .min(6, 'Пароль должен содержать от 6 до 30 букв')
      .max(30, 'Пароль должен содержать от 6 до 30 букв')
      .matches(regPass, 'Пароль должен содержать от 6 до 30 букв')
      .required('Обязательное поле'),
    name: yup.string()
      .min(6, 'Имя должен содержать от 6 до 30 букв')
      .max(30, 'Имя должен содержать от 6 до 30 букв')
      .matches(regPass, 'Имя должен содержать от 6 до 30 букв')
      .required('Обязательное поле'),
  })

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

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
        .catch(() => {setLoggin(true)})
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
          label='Name'
          sx={{mb: 1}}
          variant="outlined" 
          type="text" 
          className='signUp__input' 
          {...register('name')} //, {required: true, minLength:3, maxLength:30}
          error={!!errors.name}
          helperText={errors?.name?.message}
        />
        <TextField
          label='Email'
          sx={{mb: 1}}
          variant="outlined"   
          type="text" 
          className='signUp__input'
          {...register('email')} //, {required: true, pattern: regEmail}
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <TextField
          label='Password'
          sx={{mb: 1}}
          variant="outlined"  
          type="password" 
          className='signUp__input'
          {...register('password')} //, {required: true, minLength:3, maxLength:30}
          error={!!errors.password}
          helperText={errors?.password?.message}
        />
        <TextField
          label='Confirm password'
          sx={{mb: 1}}
          variant="outlined"  
          type="password" 
          className='signUp__input'
          {...register('confirmPassword')} //, {required: true, minLength:3, maxLength:30}
          error={!!errors.confirmPassword}
          helperText={errors?.confirmPassword?.message}
        />
        {loggin &&
        <Alert severity="error">
          <strong>Этот Email уже используется</strong>
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
        Sign Up
      </Link>
    </Box>
  )
}

export default SignUp