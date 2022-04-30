/// <reference types="cypress" />

describe('OAuth feature APIs', () => {

    let accessToken = '';  

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

            cy.request({
                method: 'GET',
                url: 'http://localhost:3000/posts',
                headers: {
                    'Authorization' : 'Bearer ' + accessToken

                }
            }).then( response => {
                cy.log(JSON.stringify(response));                
            })
        })
    })
})