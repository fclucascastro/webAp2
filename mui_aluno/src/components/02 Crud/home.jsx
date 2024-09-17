import { Container, Typography } from "@mui/material"
const Home = () => {
    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Typography
                variant='h6'
                component='p'
                sx={{
                    fontFamily: 'monospace',
                    letterSpacing:'.3rem',
                    fontWeight: 800
                }}
            >
                Acesse as funcionalidades no menu 'Alunos'
            </Typography>
        </Container>
    );
}

export default Home;