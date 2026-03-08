import { Given ,When ,Then} from "@badeball/cypress-cucumber-preprocessor";

let studentId;

//in below scenario we are checking this is created or present or not in our db.json file 
Given("the user should be logged in", () => {

  const loginData = {
    email: "pooja@test.com",
    password: "Pooja@123"
  }

  cy.Login(loginData).then((response) => {

   expect(response.status).to.eq(201)
   cy.task("queryDb", `SELECT * FROM users WHERE email='${loginData.email}'`)
  .then((result) => {

    expect(result.length).to.be.greaterThan(0)
    expect(result[0].email).to.eq(loginData.email)

  })

 // this is how we are verifying the student is actualy present inside the data base or not 
//   const userId = response.body.id
//   cy.log(userId)
//   cy.request("GET", `http://localhost:3000/students/${userId}`).then((res) => {

//     expect(res.status).to.eq(200)
//     expect(res.body.email).to.eq(loginData.email)

//   })

}   )   

})
When("the user creates a new student",()=>{
      cy.Post({
        "name":'Vinod panzade',
        "job":'Test engineer'
    }).then((response)=>{

  // this method shows the validation in api testing
        expect(response.status).to.eq(201)
        //this is how we check the property
        expect(response.body).to.have.property("id")
        expect(response.body).to.have.property("name")
        expect(response.body).to.have.property("job")
        //this is how we check the value
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
        //check the property of schema
        expect(response.body).to.have.property("name")
        expect(response.body).to.have.property("job")
        //check the value of schema 
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






