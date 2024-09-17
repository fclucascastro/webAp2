const LoginModel = require('../models/login.models');

let loginInfo = {
    login: 'aluno',
    senha: 'alunoufc'
};

// Serviço que compara os dados recebidos para login com os dados cadastrados localmente:
class LoginService {
    static comparar(request, response) {
        const body = request.body;
        if (loginInfo.login == body.login && loginInfo.senha == body.senha) {
            response.status(201).json({res: true})
        } else {
            response.status(401).json({res: false});
        }
    }
}
module.exports = LoginService;