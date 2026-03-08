import {When,Then} from "@badeball/cypress-cucumber-preprocessor";
import Ajv from "ajv"
import { userSchema } from "../../Schemas/userSchema"
let studentId;

const ajv = new Ajv()
When("the user will create a student",()=>{
    cy.Post({
        "name":'Vinod panzade',
        "job":'Test engineer'
    }).then((response)=>{

  
        //checking the status of response
        expect(response.status).to.eq(201)
        // this is studentId
        studentId=response.body.id
        //schema validation
        const valid = ajv.validate(userSchema, response.body)
        cy.log("validate the schema")
        expect(valid).to.eq(true)

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
