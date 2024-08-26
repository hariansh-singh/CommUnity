import React, { useState } from 'react'
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { CameraAlt as CameraAltIcon } from '@mui/icons-material'
import { VisuallyHiddenInput } from '../components/styles/StyledComponents'

import { useFileHandler, useInputValidation, useStrongPassword } from '6pp'
import { usernameValidator } from '../utils/validators'

export default function Login() {

  const [isLogin, setIsLogin] = useState(true)

  const toggleLogin = () => setIsLogin((prev) => !prev)

  const name = useInputValidation("")
  const bio = useInputValidation("")
  const username = useInputValidation("", usernameValidator)
  const password = useStrongPassword()

  const avatar = useFileHandler("single")

  const handleLogin = (e) => {
    e.preventDefault()
  }

  const handleSignUp = (e) => {
    e.preventDefault()
  }

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(200,200,200,0.5), rgba(120,110,220,0.5))",
      }}
    >
    <Container
      component={"main"}
      maxWidth="xs"
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>

      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >

        {/* Switch between login and sign up forms with a button click. */}
        {isLogin ? (
          <>
            <Typography variant="h5">Login</Typography>
            <form style={{
              width: '100%',
              marginTop: '1rem'
            }}
            onSubmit={handleLogin}
            >
              <TextField
                required
                fullWidth
                label='Username'
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler} />

              <TextField
                required
                fullWidth
                label='Password'
                type='password'
                margin="normal"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler} />

              <Button
                sx={{
                  marginTop: '1rem'
                }}
                variant='contained'
                color='primary'
                type='submit'
                fullWidth
              >Login</Button>

              <Typography textAlign={"center"} m={"1rem"}>Or</Typography>

              <Button
                fullWidth
                variant='text'
                onClick={toggleLogin}
              >Sign Up</Button>

            </form>
          </>
        ) : (
          <>
            <Typography variant="h5">Sign Up</Typography>
            <form style={{
              width: '100%',
              marginTop: '1rem'
            }}
              onSubmit={handleSignUp}
            >

              <Stack
                position={"relative"}
                width={"10rem"}
                margin={"auto"}>

                <Avatar sx={{
                  width: "10rem",
                  height: "10rem",
                  objectFit: "contain"
                }}
                  src={avatar.preview}
                />

                <IconButton sx={{
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                  bgcolor: "white",
                  ":hover": {
                    bgcolor: "rgba(255,255,255,0.5)"
                  }
                }}
                  component="label"
                >

                  <>
                    <CameraAltIcon />
                    <VisuallyHiddenInput
                      type='file'
                      onChange={avatar.changeHandler} />
                  </>

                </IconButton>

              </Stack>

              {/* Avatar error handling */}
              {
                avatar.error && (
                  <Typography
                    m={"1rem auto"}
                    width={"fit-content"}
                    display={"block"}
                    color='error'>
                    {avatar.error}
                  </Typography>
                )}

              <TextField
                required
                fullWidth
                label='Name'
                margin="normal"
                variant="outlined"
                value={name.value}
                onChange={name.changeHandler} />

              <TextField
                required
                fullWidth
                label='Bio'
                margin="normal"
                variant="outlined"
                value={bio.value}
                onChange={bio.changeHandler} />

              <TextField
                required
                fullWidth
                label='Username'
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler} />

              {
                username.error && (
                  <Typography color='error'>
                    {username.error}
                  </Typography>
                )}

              <TextField
                required
                fullWidth
                label='Password'
                type='password'
                margin="normal"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler} />

              {
                password.error && (
                  <Typography color='error'>
                    {password.error}
                  </Typography>
                )}

              <Button
                sx={{
                  marginTop: '1rem'
                }}
                variant='contained'
                color='primary'
                type='submit'
                fullWidth
              >Sign Up</Button>

              <Typography textAlign={"center"} m={"1rem"}>Or</Typography>

              <Button
                fullWidth
                variant='text'
                onClick={toggleLogin}
              >Login</Button>

            </form>
          </>
        )}

      </Paper>
    </Container>
    </div>)
}