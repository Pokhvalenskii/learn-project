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
  const [loggin, setLoggin] = useState(false);

  const schema = yup.object().shape({
    email: yup.string()
      .email('Введите корректный email')
      .required('Обязательное поле'),
    password: yup.string()
      .min(6, 'Пароль должен содержать от 6 до 30 символов')
      .max(30, 'Пароль должен содержать от 6 до 30 символов')
      .required('Обязательное поле')
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
    // console.log('onSubmit')
    props.handleSignUp({
      email: data.email,
      password: data.password,
    })
    .then((res) => {
      // console.log('RESSTATUS', res)
      if(res === 400) {
        setLoggin(true)
      }
      if(res === 200) {
        history.push('/signin')
      }        
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

export default SignUp