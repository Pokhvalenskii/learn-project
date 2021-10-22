// import { useSelector, useDispatch } from 'react-redux';
// import  * as types from '../../redux/signIn/actions'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box } from '@mui/system';
import { Button, Typography, Link, Alert} from '@mui/material';
import TextField from '@mui/material/TextField'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

function SignIn(props) {  

  const history = useHistory();
  const regEmail = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/
  const regPass = /^([^0-9]*)$/
  const [loggin, setLoggin] = useState(false)

  const schema = yup.object().shape({
    email: yup.string().email('Введите корректный email').required('Обязательное поле'),
    password: yup.string().min(6, 'Пароль должен содержать от 6 до 30 букв').max(30, 'Пароль должен содержать от 6 до 30 букв').matches(regPass, 'Пароль должен содержать от 6 до 30 букв').required('Обязательное поле')
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

  const onSubmit = data => {
    props.handleSignIn({
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        if(res === 400) {
          setLoggin(true)
          // console.log('ERROR')          
        }
        if(res === 200) {
          // console.log('LOGIN')
          history.push('/')
        }        
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
          // ref={register}
          {...register('email')} // {required: true, pattern: regEmail}
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <TextField          
          type="password" 
          // ref={register}
          {...register('password')} // {required: true, minLength:3, maxLength:30}
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

export default SignIn