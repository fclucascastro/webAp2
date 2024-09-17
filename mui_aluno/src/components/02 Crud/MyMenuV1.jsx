import { AppBar, Box, Button, Container, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import AdbIcon from "@mui/icons-material/Adb"
import { Link } from "react-router-dom"
import { useState } from "react"

const MyMenu = () => {

    const [anchorElAluno, setAnchorElAluno] = useState(null);

    const handleOpenAnchorElAluno = (event) => {
        setAnchorElAluno(event.currentTarget);
    }
    const handleCloseAnchorElAluno = () => {
        setAnchorElAluno(null)
    }

    const dropMenu = (menuName) => {
        return (
            <Box>
                <Button 
                    sx={{color: '#fff'}}
                    onClick={handleOpenAnchorElAluno}
                >
                    {menuName}
                </Button>
                <Menu
                    anchorEl={anchorElAluno}
                    open={Boolean(anchorElAluno)}
                    onClose={handleCloseAnchorElAluno}
                >
                    <MenuItem 
                        onClick={() => {
                            handleCloseAnchorElAluno()
                        }}
                        component={Link}
                        to={`cadastrar-${menuName.slice(0, menuName.length - 1)}`}
                    >
                        Cadastrar
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            handleCloseAnchorElAluno()
                        }}
                        component={Link}
                        to={`listar-${menuName.slice(0, menuName.length - 1)}`}
                    >
                        Listar
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            handleCloseAnchorElAluno()
                        }}
                        component={Link}
                        to={`listar-${menuName.slice(0, menuName.length - 1)}s-aprovados`}
                    >
                        Listar Alunos Aprovados
                    </MenuItem>
                </Menu>
            </Box>
        );
    }

    return (
        <>
            <AppBar position='static'>
                <Container>
                    <Toolbar>
                        <AdbIcon 
                            sx={{
                                display: {xs: 'none', md: 'flex'},
                                mr: 1
                            }}
                        />
                        <Typography
                            variant='h5'
                            component='a'
                            href='/home'
                            sx={{
                                textDecoration: 'none',
                                color: '#fff',
                                fontFamily: 'monospace',
                                letterSpacing:'.3rem',
                                fontWeight: 800
                            }}
                        >
                            CRUD_ALUNO
                        </Typography>

                        <Box
                            sx={{
                                my: 2,
                                ml: 3,
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'flex-end'
                            }}
                        >
                            {dropMenu('alunos')}
                            <Button
                                sx={{
                                    color: '#fff',
                                }}
                            >
                                Sobre
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}

export default MyMenu;