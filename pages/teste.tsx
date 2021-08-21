import { Box, Button, TextField } from '@material-ui/core';
import React from 'react';


function Login() {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" marginTop="40px">
      <Box width="420px">
        <Box marginBottom="20px">
          <TextField
            id="outlined-password-input"
            label="Login"
            type="text"
            variant="outlined"
            size="medium"
            fullWidth
          />
        </Box>
        <Box marginBottom="20px">
          <TextField
            id="outlined-password-input"
            label="Senha"
            type="password"
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box display="flex" justifyContent="center">
          <Box width="95%">
            <Button variant="contained" color="primary" size="large" fullWidth>
              Entrar
            </Button>
          </Box>
        </Box>
      </Box>
    </Box >
  )
}

export default Login;