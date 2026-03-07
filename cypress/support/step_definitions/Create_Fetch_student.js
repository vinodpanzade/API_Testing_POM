import {When,Then} from "@badeball/cypress-cucumber-preprocessor";

let studentId;

When("the user will create a student",()=>{
    cy.Post({
        "name":'Vinod panzade',
        "job":'Test engineer'
    }).then((response)=>{
        expect(response.status).to.eq(201)
        studentId=response.body.id
    })

})

Then("the student created successfully",()=>{
    expect(studentId).to.not.be.null
})

When("the user get a student ID",()=>{
    cy.Get_id(studentId).then((response)=>{
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    })
})
