/// <reference types="cypress" />

import usuario from "../../fixtures/usuario.json"
import multi from "../../fixtures/multi.json"

describe('Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.visit('login');

    });

  
    it('Login sucesso', () => {
        cy.get('[data-test="login-email"] > .MuiInputBase-root > .MuiInputBase-input').type('teste123@teste.com')
        cy.get('[data-test="login-password"] > .MuiInputBase-root > .MuiInputBase-input').type('teste123')
        cy.get('[data-test="login-submit"]').click()
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo Ingrid Santos');


    });
    it('Validar login inválido', () => {
                cy.get('[data-test="login-email"] > .MuiInputBase-root > .MuiInputBase-input').type('teste123@teste.com')
        cy.get('[data-test="login-password"] > .MuiInputBase-root > .MuiInputBase-input').type('teste12')
        cy.get('[data-test="login-submit"]').click()
        cy.get('[data-test="alert"]').should('contain', 'Credenciais inválidas');

    });

    it('ValidarLogin sucesso commands', () => {
        cy.login('teste123@teste.com', 'teste123')
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo Ingrid Santos');
        

    });
     it('Validar login com sucesso usando importação de massa de dados', () => {
        
        cy.login(usuario.usuario, usuario.senha)
        cy.get('[data-test="dashboard-welcome"]').should('contain', usuario.nome);

        
     });

     

     
});