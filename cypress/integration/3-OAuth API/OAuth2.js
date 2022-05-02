/// <reference types="cypress" />

describe('OAuth feature APIs', () => {

  let accessToken = '';
  let refreshToken = '';

  it('get the access token test', ()=>{

    cy.request({
      method: 'POST',
      url: 'http://localhost:4000/login',
      body: {
        "username": "Suraj"
      }
    }).then(response => {
      cy.log(JSON.stringify(response));
      cy.log(response.body.accessToken);
      accessToken = response.body.accessToken;
      refreshToken = response.body.refreshToken;

      cy.request({
        method: 'GET',
        url: 'http://localhost:3000/posts',
        headers: {
          'Authorization' : 'Bearer ' + accessToken

        }
      }).then(response => {
        cy.log(JSON.stringify(response));
      });
    });
  });


  it('cy.wait() - wait for a specific amount of time', () => {
    cy.wait(1500);
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/posts',
      headers: {
        'Authorization' : 'Bearer ' + accessToken

      }
    }).then(response => {
      cy.log(JSON.stringify(response));
      cy.wait(15000);
      cy.request({
        method: 'POST',
        url: 'http://localhost:4000/token',
        body: {
          "token": refreshToken
        }
      }).then(response => {
        cy.log(JSON.stringify(response));
        //cy.log(response.body.accessToken);
        accessToken = response.body.accessToken;
        cy.request({
            method: 'GET',
            url: 'http://localhost:3000/posts',
            headers: {
              'Authorization' : 'Bearer ' + accessToken
    
            }
          }).then(response => {
            cy.log(JSON.stringify(response));
          });
        cy.wait(15000);
      })

    });
        
  });
});