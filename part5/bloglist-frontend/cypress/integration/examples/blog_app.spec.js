describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Artur Rybka',
      username: 'arcik',
      password: 'testowe'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      
      cy.get('#username').type('arcik')
      cy.get('#password').type('testowe')  

      cy.contains('login').click()
      cy.contains('Artur Rybka logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.contains('login').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Artur Rybka logged-in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'arcik', password: 'testowe' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Test blog')
      cy.get('#author').type('Test author')
      cy.get('#url').type('Test url')
      //cy.contains('cancel')
      cy.get('#submitBlog').click()
      cy.contains('Test blog')
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'first author', url: 'first url' })
        cy.createBlog({ title: 'second blog', author: 'second author', url: 'second url' })
        cy.createBlog({ title: 'third blog', author: 'third author', url: 'third url' })
      })

      it('one of those can be liked', function () {
        cy.contains('second blog').parent().find('button').contains('view').click()
        cy.contains('second blog').parent().find('button').contains('like').as('likeButton')
        cy.get('@likeButton').click()
        cy.contains('second blog').parent().contains('1 likes')
      })
      it.only('and are displayed in correct order', function () {
        cy.get('[class=viewButton]').click({multiple: true})
        cy.contains('second blog').parent().find('button').contains('like').as('likeButton2')
        for(let i = 0; i < 4; i++) {
          cy.get('@likeButton2').click()
        }

        cy.contains('third blog').parent().find('button').contains('like').as('likeButton3')
        for(let i = 0; i < 3; i++) {
          cy.get('@likeButton3').click()
        }

        cy.get('.blog').then(blogs => {
          cy.wrap(blogs[0]).contains('second blog')
          cy.wrap(blogs[1]).contains('third blog')
          cy.wrap(blogs[2]).contains('first blog')
        })

      })
      it('one of those can be removed', function () {
        cy.contains('third blog').parent().find('button').contains('view').click()
        cy.contains('third blog').parent().find('button').contains('remove').as('removeButton')
        cy.get('@removeButton').click()
        cy.get('.success')
        .should('contain', 'Blog third blog has been removed')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')      
      })
    })
  })
})