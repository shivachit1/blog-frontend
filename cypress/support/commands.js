// cypress command for logging in user with given credentials
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username, password
  }).then(({ body }) => {
    // storing loggedUser to localStorage after successful login
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

// creating new blog with given data and sending loggedUser token through Authorization Header
Cypress.Commands.add('createBlog', ({ title, author, url,likes, user }) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { title, author, url,likes, user },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})

// logging out loggedUser by removing localStorage data of user
Cypress.Commands.add('logout', () => {
  localStorage.removeItem('loggedBlogappUser')
})


