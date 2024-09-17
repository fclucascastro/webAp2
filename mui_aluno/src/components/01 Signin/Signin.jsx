import { Container, Box, Typography, TextField, Button, Link } from '@mui/material'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signin = () => {

    const [userName, setUserName] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    // Função que envia as informações de login para o express, pela rota definida:
    function handleSubmit(event) {
        event.preventDefault();
        const login = {login: userName, senha};
        fetch('http://localhost:3001/alunos/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(login),
        })
        .then(res => res.json())
        .then(data => {
            // Se as informações baterem, então o usuário é redirecionado para a tela de listagem de alunos:
            if (data.res) {
                alert('Login realizado com sucesso!');
                navigate('/listar-aluno');
            } else {
                alert('Erro ao fazer o login!');
            }
            
        })
        .catch(error => {
            console.log('Erro ao cadastrar novo aluno!', error)
        });
    }

    return (
        <Container maxWidth='xs'>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                }}
                component="form"
                onSubmit={handleSubmit}
            >
                <Typography
                    component='h1'
                    variant='h5'
                >
                    Sign In
                </Typography>
                <TextField 
                    required
                    margin='normal'
                    fullWidth
                    autoFocus

                    label='User name'
                    id='text'
                    name='text'
                    type='text'
                    onChange={(event) => setUserName(event.target.value)}
                />
                <TextField 
                    required
                    margin='normal'
                    fullWidth
                    autoFocus

                    label='Senha'
                    id='password'
                    name='password'
                    type='password'
                    onChange={(event) => setSenha(event.target.value)}
                />
                <Box sx={{display: "flex", justifyContent: "center", mt: 2}}>
                    <Button type="submit" variant="contained">
                        Login
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Signin;