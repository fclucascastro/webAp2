import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const ListarAlunosAprovados = () => {
    const [alunos, setAlunos] = useState([]);
    // Variável de estado para guardar os alunos que têm o ira igual ou acima da meédia da turma.
    const [alunosAprovados, setAlunosAprovados] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3001/alunos/listar')
            .then(async res => setAlunos(await res.json()))
            .catch(error => console.log('Não foi possível recuperar os alunos cadastrados', error));
    }, []);

    // Quando os alunos forem carregados, os alunos aprovados são filtrados e armazenados na variável de estado adequada:
    useEffect(() => {
        const mediaIra = calcularMedia();
        let aux = [];
        aux = alunos.filter(aluno => aluno.ira >= mediaIra);
        setAlunosAprovados([...aux]);
    }, [alunos]);

    function deleteAlunoById(id) {
        if(window.confirm("Deseja Excluir?")) {
            fetch(`http://localhost:3001/alunos/delete/${id}`, {
                method: 'DELETE',
            })
            .then(res => {
                if (res.ok) {
                    alert(`Aluno de ID ${id} excluído com sucesso`);
                    setAlunos(alunos.filter(aluno => aluno._id != id));
                    navigate('/listar-aluno');
                } else {
                    alert('Erro ao excluir aluno!');
                }
            })
            .catch(error => console.log('Error ao excluir aluno', error));
        }
    }

    function calcularMedia() {
        let iraTotal = 0;
        // Percorre o array que guarda os alunos e guarda o somatório do ira em uma variável local:
        alunos.forEach(aluno => {
            iraTotal += aluno.ira;
        });
        // Retorna o somatório do ira pela quantidade de alunos:
        return iraTotal / alunos.length;
    }

    return (
        <>
            <Typography variant="h5" fontWeight="bold">Listar Alunos Aprovados</Typography>
            <TableContainer component={Paper} sx={{mt:4, mb:4}}>
                <Table sx={{minWidth:650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>NOME</StyledTableCell>
                            <StyledTableCell>CURSO</StyledTableCell>
                            <StyledTableCell>IRA</StyledTableCell>
                            <StyledTableCell>AÇÕES</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            // Mapeando os alunos aprovados na tabela de listagem:
                            alunosAprovados.map(aluno => {
                                return (
                                    <StyledTableRow 
                                        key={aluno._id}
                                    >
                                        <StyledTableCell>{aluno._id}</StyledTableCell>
                                        <StyledTableCell>{aluno.nome}</StyledTableCell>
                                        <StyledTableCell>{aluno.curso}</StyledTableCell>
                                        <StyledTableCell>{aluno.ira}</StyledTableCell>
                                        <StyledTableCell>
                                            <Box>
                                                <IconButton 
                                                    aria-label="edit" 
                                                    color="primary" 
                                                    component={Link} 
                                                    to={`/editar-aluno/${aluno._id}`}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton 
                                                    aria-label="delte" 
                                                    color="error" 
                                                    onClick={() => 
                                                    deleteAlunoById(aluno._id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )
                            })
                        }
                        <StyledTableRow>
                            <StyledTableCell colSpan={4}>MÉDIA IRA:</StyledTableCell>
                            <StyledTableCell>{calcularMedia().toFixed(2)}</StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
'&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
},
// hide last border
'&:last-child td, &:last-child th': {
    border: 0,
},
}));
export default ListarAlunosAprovados;