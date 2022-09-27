/// <reference types="cypress" />
const faker = require('faker-br');


describe('Funcionalidade: Criar Perfil', () => {
    // Hooks: before, after

    it('Criar perfil', () => {
        const nomeFake = 'Ingrid' + faker.name.lastName();
        const emailFake = faker.internet.email(nomeFake);
        const senhaFake = faker.internet.password();

        cy.cadastro(nomeFake, emailFake, senhaFake, senhaFake);

        cy.get('.large').should('contain', 'Dashboard')
        cy.contains('Bem-vindo '+nomeFake).should('exist')
        cy.get('[data-test="dashboard-createProfile"]').click()
      
        cy.criarPerfil('Ambev', 'http://www.ambevtech.com', 'Rio de janeiro', 'JavaScript, C#', 'ingrid2110rj',' Hello, Sou Ingrid e estou estudando o Cypress')
        cy.get('[data-test="dashboard-editProfile"]').should('exist')
      

    });

    it('Deve validar mensagem de erro ao cadastrar com site errado', () => {
        cy.get('[data-test="dashboard-editProfile"]').click()
        cy.apagarPerfil()
        cy.criarPerfil('Ambev', 'www', 'Rio de janeiro', 'JavaScript, C#', 'ingrid2110rj',' Hello, Sou Ingrid e estou estudando o Cypress')
        cy.contains('Digite uma url válida').should('be.visible')
   
    });


});