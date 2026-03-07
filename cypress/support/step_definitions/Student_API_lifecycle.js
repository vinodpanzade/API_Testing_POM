import { Given ,When ,Then} from "@badeball/cypress-cucumber-preprocessor";

let studentId;

Given("the user should be logged in",()=>{
    cy.Login({
     email:'pooja@test.com',
     password:'Pooja@123'
  });
})

When("the user creates a new student",()=>{
      cy.Post({
        "name":'Vinod panzade',
        "job":'Test engineer'
    }).then((response)=>{

  // this method shows the validation in api testing
        expect(response.status).to.eq(201)
        expect(response.body.name).to.eq("Vinod panzade")
        expect(response.body.job).to.eq("Test engineer")
        expect(response.body.id).to.exist
        studentId=response.body.id
        cy.log(studentId)
    })
})

When("the user updates the student using PUT",()=>{
    cy.Put(studentId,{
        "name":'Musaib',
        "job":'Developer'
    }).then((response)=>{
        expect(response.status).to.eq(200)
        expect(response.body.name).to.eq("Musaib")
        expect(response.body.job).to.eq("Developer")
        cy.log(studentId)
    })
})

Then("the student details should be updated",()=>{
    cy.Get_id(studentId).then((response)=>{
        expect(response.status).to.eq(200)
        cy.log(studentId)
    })
})

When("the user partially updates the student using PATCH",()=>{
    cy.Patch(studentId,{
        "name":'sandeep',
         "job":'Developer'
    }).then((response)=>{
        expect(response.status).to.eq(200)
        expect(response.body.name).to.eq("sandeep")
        expect(response.body.job).to.eq("Developer")
        cy.log(studentId)
    })
})

Then("the student fields should be updated",()=>{
    cy.Get_id(studentId).its("status").should("eq",200)
})

When("the user deletes the student",()=>{
    cy.Delete(studentId)
})

Then("the student record should be removed",()=>{
    cy.Delete_response(studentId).its("status").should('eq',404)
})






