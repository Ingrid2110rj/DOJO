// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, senha) => {
    cy.visit('login');
    cy.get('[data-test="login-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email)
    cy.get('[data-test="login-password"] > .MuiInputBase-root > .MuiInputBase-input').type(senha)
    cy.get('[data-test="login-submit"]').click()

 })

 Cypress.Commands.add('cadastro', (name, email, password, confirmPassword) => {
    cy.visit('cadastrar')

    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(name)
    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email)
    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type(password)
    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type(confirmPassword)
    cy.get('[data-test="register-submit"]').click()
})

Cypress.Commands.add('criarPerfil', (cia, site, cidade, skills, github, minibio) => {
    
    cy.get('#mui-component-select-status').click()
    cy.get('.MuiList-root').contains('Especialista em QA').click()
    cy.get('[data-test="profile-company"]').type(cia)
    cy.get('[data-test="profile-webSite"]').type(site)
    cy.get('[data-test="profile-location"]').type(cidade)
    cy.get('[data-test="profile-skills"]').type(skills)
    cy.get('[data-test="profile-gitHub"]').type(github)
    cy.get('[data-test="profile-bio"]').type(minibio)
    cy.get('[data-test="profile-submit"]').click()
  })

  
  Cypress.Commands.add('apagarPerfil', () => {
    cy.get('[data-test="profile-company"] > .MuiInputBase-root > .MuiInputBase-input').clear()
    cy.get('[data-test="profile-webSite"]').clear()
    cy.get('[data-test="profile-location"]').clear()
    cy.get('[data-test="profile-skills"]').clear()
    cy.get('[data-test="profile-gitHub"]').clear()
    cy.get('[data-test="profile-bio"]').clear()
      

})
import user from "../fixtures/multi.json"

Cypress.Commands.add('token', () => {
  cy.request({
    method: 'POST',
    url: 'api/auth',
    body: {
      "email": user[0].usuario,
      "password": user[0].senha
    }
  }).then((response) => {
    expect(response.status).to.equal(200) //opcional
    return response.body.jwt
  })
})

Cypress.Commands.add('criarPost', (token, texto) => {
    cy.request({
      method: 'POST',
      url: 'api/posts',
      headers: { Cookie: token },
      body: {
        text: texto
      }
    })
  })
  
  Cypress.Commands.add('loginApp', () => {
    cy.request({
      method: 'POST',
      url: 'api/auth',
      body:
      {
        "email": user[0].usuario,
        "password": user[0].senha
      }
    }).then((response) =>{
        cy.setCookie('location' , 'BR-PR')
        cy.setCookie('jwt' , response.body.jwt)
        window.localStorage.setItem('logadoCom', user[0].usuario)
        window.sessionStorage.setItem('jwt2', response.body.jwt)
    })
  
  })