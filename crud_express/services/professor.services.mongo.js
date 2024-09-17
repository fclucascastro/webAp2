const ProfessorModel = require('../models/professor.models.mongo');

class ProfessorServiceMongo {
    static list(request, response) {
        ProfessorModel.find()
        .then((profs) => {
            response.status(201).json(profs);
        })
    }

    static register(request, response) {
        ProfessorModel.create(request.body)
        .then((prof) => {
            response.status(201).json(prof);
        })
    }

    static retrieve(request, response) {
        ProfessorModel.findById(request.params.id)
        .then((prof) => {
            response.status(201).json(prof);
        })
    }

    static update(request, response) {
        ProfessorModel.findByIdAndUpdate(request.params.id, request.body, {new:true})
        .then((prof) => {
            response.status(201).json(prof);
        })
    }

    static delete(request, response) {
        ProfessorModel.findByIdAndRemove(request.params.id)
        .then((prof) => {
            response.status(201).json(prof);
        })
    }
}

module.exports = ProfessorServiceMongo;