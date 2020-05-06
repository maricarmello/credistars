const Sequelize = require('sequelize');

module.exports = {
    up: async function (queryInterface, Sequelize) {

        return [
          queryInterface.bulkInsert('users', [
            { id_user: "1", name: "Mariana", surname: "Carmello", email: "mariana.carmello@creditas.com.br", password: "SuperSenha" },
            { id_user: "2", name: "João", surname: "Silva", email: "joao.silva@creditas.com.br", password: "SuperSenha2" },
            { id_user: "3", name: "Marcela", surname: "Lopes", email: "marcela.lopes@creditas.com.br", password: "SuperSenha3" },
            { id_user: "4", name: "Pedro", surname: "Vieira", email: "pedro.vieira@creditas.com.br", password: "SuperSenha4" },
            { id_user: "5", name: "Lucas", surname: "Santos", email: "lucas.santos@creditas.com.br", password: "SuperSenha5" },
            { id_user: "6", name: "Maria", surname: "Gomes", email: "maria.gomes@creditas.com.br", password: "SuperSenha6" },
            { id_user: "7", name: "Gabriela", surname: "Ferreira", email: "gabriela.ferreira@creditas.com.br", password: "SuperSenha7" },
            { id_user: "8", name: "Rafaela", surname: "Santana", email: "rafaela.santana@creditas.com.br", password: "SuperSenha8" },
            { id_user: "9", name: "Bruno", surname: "Pontes", email: "bruno.pontes@creditas.com.br", password: "SuperSenha9" },
            { id_user: "10", name: "Marina", surname: "Pereira", email: "marina.pereira@creditas.com.br", password: "SuperSenha10" }          
        ])
        ];
      }
};