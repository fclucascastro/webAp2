var express = require('express');
var router = express.Router();
var ProfessorService = require('../services/professorService');
var ProfessorServiceMongo = require('../services/professor.services.mongo');

// router.get(
//     '/listar',
//     (req, res, nest) => {
//         return res.json(ProfessorService.list())
//     }
// );
router.get(
    '/listar',
    (req, res, nest) => {
        ProfessorServiceMongo.list(req, res);
    }
);

// router.post(
//     '/register',
//     (req, res, next) => {
//         const professor =  ProfessorService.register(req.body);
//         return res.json(professor);
//     }
// );
router.post(
    '/register',
    (req, res, next) => {
        ProfessorServiceMongo.register(req, res);
    }
);

// router.put(
//     '/update/:id',
//     (req, res, next) => {
//         const professor = ProfessorService.update(req.params.id, req.body);
//         res.json(professor);
//     }
// );
router.put(
    '/update/:id',
    (req, res, next) => {
        ProfessorServiceMongo.update(req, res);
    }
);

// router.delete(
//     '/delete/:id',
//     (req, res, next) => {
//         return res.json(
//             {'success': ProfessorService.delete(req.params.id)}
//         );
//     }
// );
router.delete(
    '/delete/:id',
    (req, res, next) => {
        ProfessorServiceMongo.delete(req, res);
    }
);

// router.get(
//     '/retrieve/:id',
//     (req, res, next) => res.json(ProfessorService.retrieve(req.params.id))
// );
router.get(
    '/retrieve/:id',
    (req, res, next) => {
        ProfessorServiceMongo.retrieve(req, res);
});

module.exports = router;
