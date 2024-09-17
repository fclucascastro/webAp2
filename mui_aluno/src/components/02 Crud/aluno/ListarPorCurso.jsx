import React, { useState, useEffect } from 'react';
import { Typography, Box, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';

const ListarAprovados = () => {
    const [alunos, setAlunos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3001/alunos/listar')
            .then(async res => setAlunos(await res.json()))
            .catch(error => console.log('Não foi possível recuperar os alunos cadastrados', error));
    }, []);

    function deleteAlunoById(id) {
        if (window.confirm("Deseja Excluir?")) {
            fetch(`http://localhost:3001/alunos/delete/${id}`, {
                method: 'DELETE',
            })
                .then(res => {
                    if (res.ok) {
                        alert(`Aluno de ID ${id} excluído com sucesso`);
                        setAlunos(alunos.filter(aluno => aluno._id !== id));
                        navigate('/agrupados-por-curso');
                    } else {
                        alert('Erro ao excluir aluno!');
                    }
                })
                .catch(error => console.log('Error ao excluir aluno', error));
        }
    }

    // Função para agrupar alunos por curso
    function agruparPorCurso() {
        return alunos.reduce((acc, aluno) => {
            if (!acc[aluno.curso]) {
                acc[aluno.curso] = [];
            }
            acc[aluno.curso].push(aluno);
            return acc;
        }, {});
    }

    const agrupamento = agruparPorCurso();

    return (
        <>
            <Typography variant="h5" fontWeight="bold">Alunos Agrupados por Curso</Typography>
            {Object.keys(agrupamento).map(curso => (
                <Box key={curso} sx={{ mb: 4 }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>{curso}</Typography>
                    <List>
                        {agrupamento[curso].map(aluno => (
                            <StyledListItem key={aluno._id} ira={aluno.ira}>
                                <ListItemText
                                    primary={`${aluno.nome} IRA: ${aluno.ira.toFixed(1)}`}
                                />
                                <IconButton 
                                    aria-label="edit" 
                                    color="primary" 
                                    component={Link} 
                                    to={`/editar-aluno/${aluno._id}`}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton 
                                    aria-label="delete" 
                                    color="error" 
                                    onClick={() => deleteAlunoById(aluno._id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </StyledListItem>
                        ))}
                    </List>
                    <Divider />
                </Box>
            ))}
        </>
    );
}

// Componente estilizado para destacar itens com IRA >= 7
const StyledListItem = styled(ListItem)(({ ira }) => ({
    backgroundColor: ira >= 7 ? '#d4edda' : 'transparent', // Verde claro para IRA >= 7
}));

export default ListarAprovados;
