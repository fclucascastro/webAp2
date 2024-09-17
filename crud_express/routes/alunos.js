var express = require('express');
var router = express.Router();
var AlunoServiceMongo = require('../services/aluno.service.mongo');
var LoginService = require('../services/login.service');

router.get(
    '/listar',
    (req, res, nest) => {
        AlunoServiceMongo.list(req, res);
    }
);

router.post(
    '/register',
    (req, res, next) => {
        AlunoServiceMongo.register(req, res);
    }
);

router.put(
    '/update/:id',
    (req, res, next) => {
        AlunoServiceMongo.update(req, res);
    }
);

router.delete(
    '/delete/:id',
    (req, res, next) => {
        AlunoServiceMongo.delete(req, res);
    }
);

router.get(
    '/retrieve/:id',
    (req, res, next) => {
        AlunoServiceMongo.retrieve(req, res);
});

// Nova rota para login:
router.post(
    '/login',
    (req, res, next) => {
        LoginService.comparar(req, res);
    }
);

module.exports = router;
