//Register command 
Cypress.Commands.add("Register",(data)=>{
    return cy.request('POST','http://localhost:3000/students',data)
})

//Login command
Cypress.Commands.add("Login",(data)=>{
    return cy.request('Post','http://localhost:3000/students',data).then((res)=>{
        Cypress.env('token',res.body.accessToken)
    })
})

//token command 
const authHeader=()=>({
    Authorization:`Bearer ${Cypress.env('token')}`,
    'Content-Type':'application/json'
})

//Create the student or post command 
Cypress.Commands.add("Post",(data)=>{
    return cy.request({
        method:'POST',
        url:'http://localhost:3000/students',
        body:data,
        headers:authHeader
    })
})

//get the student without id 
Cypress.Commands.add("Get",()=>{
    return cy.request({
        method:"GET",
        url:"http://localhost:3000/students/",
        headers:authHeader()
    })
})

//get the student with id 
Cypress.Commands.add("Get_id",(id)=>{
    return cy.request({
        method:"GET",
        url:`http://localhost:3000/students/${id}`,
        headers:authHeader()
    })
})

//put request for the student
Cypress.Commands.add("Put",(id,data)=>{
 return cy.request({
    method:'PUT',
    url:`http://localhost:3000/students/${id}`,
    headers: authHeader(),
    body: data,
 })

})

//patch the data
Cypress.Commands.add("Patch",(id,data)=>{
 return cy.request({
    method:'PATCH',
    url:`http://localhost:3000/students/${id}`,
    headers: authHeader(),
    body: data,
 })

})

//delete the student data 
Cypress.Commands.add("Delete",(id)=>{
    return cy.request({
        method:'Delete',
        url:`http://localhost:3000/students/${id}`,
        headers:authHeader()

    })
})

//Get the delete student response
Cypress.Commands.add("Delete_response",(id)=>{
    return cy.request({
        method:'Delete',
        url:`http://localhost:3000/students/${id}`,
        headers:authHeader(),
        failOnStatusCode: false

    })
})

//Get student for invalid or negtive testing
Cypress.Commands.add("Get_invalid_student",(id)=>{
    return cy.request({
        method:'Get',
        url:`http://localhost:3000/students/${id}`,
        headers:authHeader(),
        failOnStatusCode: false
    })
})


