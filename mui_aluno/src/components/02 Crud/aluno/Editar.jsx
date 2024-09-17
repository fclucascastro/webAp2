import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditarAluno = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    
    const [nome, setNome] = useState('');
    const [curso, setCurso] = useState('');
    const [ira, setIra] = useState("0.0");

    useEffect(() => {
        fetch(`http://localhost:3001/alunos/retrieve/${id}`)
        .then(res => res.json())
        .then(data => {
            setNome(data.nome);
            setCurso(data.curso);
            setIra(data.ira);
        })
        .catch(error => console.log('Erro ao recuperar aluno', error));
    }, []);

    function handleSubmit(event) {
        event.preventDefault()
        fetch(`http://localhost:3001/alunos/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({nome, curso, ira}),
        })
        .then(res => {
            console.log('Aluno Editado!');
            navigate('/listar-aluno');
        })
        .catch(error => console.log('Erro ao editar novo aluno!', error));;
    }

    return (
        <>
            <Typography variant="h5" fontWeight="bold">
                Editar Aluno
            </Typography>
            <Box
                sx={{width: "80%"}}
                component="form"
                onSubmit={handleSubmit}
            >
                <TextField 
                    required
                    fullWidth
                    autoFocus
                    margin="normal"
                    label="Nome Completo"
                    value={nome}
                    id="nome"
                    name="nome"
                    onChange={(event) => setNome(event.target.value)}
                    />
                <TextField 
                    required
                    fullWidth
                    margin="normal"
                    label="Curso"
                    value={curso}
                    id="curso"
                    name="curso"
                    onChange={(event) => setCurso(event.target.value)}
                />
                <TextField
                    required
                    fullWidth
                    margin="normal"
                    label="IRA"
                    value={parseFloat(ira)}
                    id="ira"
                    name="ira"
                    type="number"
                    inputProps={{
                        maxLength: 10,
                        step: "0.1"
                    }}
                    onChange={(e) =>setIra(parseFloat(e.target.value))}
                />
                <Box sx={{display: "flex", justifyContent: "center", mt: 2, mb: 2}}>
                    <Button type="submit" variant="contained">
                        Atualizar
                    </Button>
                </Box>
            </Box>
        </>
    );
}

export default EditarAluno;