import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material';

import MyMenu from './MyMenuV1';
import CadastrarAluno from './aluno/Cadastrar';
import EditarAluno from './aluno/Editar';
import ListarAluno from './aluno/Listar';
import Home from './home';
import ListarAlunosAprovados from './aluno/ListarAprovados';
import Signin from '../01 Signin/Signin';


const MinhaPage = () => {
    return (
        <BrowserRouter>
            <MyMenu />
            <Container sx={{mt:5, display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Routes>
                    <Route path='' element={<Signin />} />
                    <Route path='home' element={<Home />} />
                    <Route path='cadastrar-aluno' element={<CadastrarAluno />} />
                    <Route path='listar-aluno' element={<ListarAluno />} />
                    <Route path='listar-alunos-aprovados' element={<ListarAlunosAprovados />} />
                    <Route path='editar-aluno/:id' element={<EditarAluno />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default MinhaPage;