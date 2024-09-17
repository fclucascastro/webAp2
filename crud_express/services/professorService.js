const ProfessorModel = require('../models/professor.models');

let professores = [
    {id: 0, nome: 'Vito Corleone', curso: 'SI', titulacao: 'MEST', ai: {cg:true, mc:false,al:false,es:true}},
    {id: 1, nome: 'Michael Corleone', curso: 'DD', titulacao: 'GRAD', ai: {cg:false, mc:false,al:true,es:false}},
    {id: 2, nome: 'Luca Brasi', curso: 'SI', titulacao: 'MEST', ai: {cg:false, mc:false,al:true,es:false}},
    {id: 3, nome: 'Kay Adams', curso: 'SI', titulacao: 'DOUT', ai: {cg:false, mc:true,al:false,es:false}},
    {id: 4, nome: 'Peter Clemenza', curso: 'CC', titulacao: 'MEST', ai: {cg:false, mc:true,al:true,es:true}},
];

let id = 5;

class ProfessorService {
    static list() {
        return professores;
    }

    static register(data) {
        console.log(data)
        let professor = new ProfessorModel(
            id++,
            data.nome,
            data.curso,
            data.titulacao,
            data.ai
        );
        professores.push(professor);
        return professor;
    }

    static update(id, data) {
        let professor = professores.find(prof => prof.id == id);
        if (professor) {
            professor.nome = data.nome;
            professor.curso = data.curso;
            professor.titulacao = data.titulacao;
            professor.ai = data.ai;
            return professor;
        }
        return null;
    }

    static delete(id) {
        let updProfessores = false;
        professores = professores.filter(prof => {
            if (prof.id != id) {
                return true;
            }
            updProfessores = true;
            return false;
        });
        return updProfessores;
    }

    static retrieve(id) {
        return professores.find(prof => prof.id == id);
    }
}
module.exports = ProfessorService;