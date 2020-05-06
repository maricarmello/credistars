const Sequelize = require('sequelize');

module.exports = {
    up: async function (queryInterface, Sequelize) {

        return [
          queryInterface.bulkInsert('users', [
            { user_id: "1", name: "Mariana", surname: "Carmello", email: "mariana.carmello@creditas.com.br", password: "SuperSenha" },
            { user_id: "2", name: "João", surname: "Silva", email: "joao.silva@creditas.com.br", password: "SuperSenha2" },
            { user_id: "3", name: "Marcela", surname: "Lopes", email: "marcela.lopes@creditas.com.br", password: "SuperSenha3" },
            { user_id: "4", name: "Pedro", surname: "Vieira", email: "pedro.vieira@creditas.com.br", password: "SuperSenha4" },
            { user_id: "5", name: "Lucas", surname: "Santos", email: "lucas.santos@creditas.com.br", password: "SuperSenha5" },
            { user_id: "6", name: "Maria", surname: "Gomes", email: "maria.gomes@creditas.com.br", password: "SuperSenha6" },
            { user_id: "7", name: "Gabriela", surname: "Ferreira", email: "gabriela.ferreira@creditas.com.br", password: "SuperSenha7" },
            { user_id: "8", name: "Rafaela", surname: "Santana", email: "rafaela.santana@creditas.com.br", password: "SuperSenha8" },
            { user_id: "9", name: "Bruno", surname: "Pontes", email: "bruno.pontes@creditas.com.br", password: "SuperSenha9" },
            { user_id: "10", name: "Marina", surname: "Pereira", email: "marina.pereira@creditas.com.br", password: "SuperSenha10" }          
        ])
        ];
      }
};