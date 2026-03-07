import {Then,Given} from "@badeball/cypress-cucumber-preprocessor";

let studentId;

Given ("First we post the student",()=>{
  cy.Post({
    "name":'rohit',
    "job":'BO developer'
  }).then((response)=>{
    expect(response.status).to.eq(201)
    studentId=response.body.id
    cy.log(studentId)

  })
})


Then("We delete the student",()=>{
    cy.Delete(studentId)
    cy.log(studentId)
})

//gherkin is case sensetive i.e it also consider the space 
Then("delete the student again",()=>{
    cy.Delete_response(studentId).its("status").should("eq",404)
})


Then("Get the student with invalid id means delete id use",()=>{
    cy.Get_invalid_student(studentId).its("status").should("eq",404)
})





