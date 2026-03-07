import {Given,When,Then} from "@badeball/cypress-cucumber-preprocessor";

let studentIds=[]

Given("user have to login",()=>{
    cy.fixture('Users').then((data)=>{

        cy.Login(data);
    })
})

When("now user will create the student",()=>{
    cy.fixture("POST").then((students)=>{
        cy.wrap(students).each((student)=>{
            cy.Post(student).then((res)=>{
                expect(res.status).to.eq(201)
                studentIds.push(res.body.id);
              cy.log(JSON.stringify(res.body))
            })
        })
    })
})

When("the user will update with put",()=>{
    cy.fixture("PUT").then((students)=>{
        cy.wrap(studentIds).each((id,index)=>{
            cy.Put(id,students[index]).then((res)=>{
            expect(res.status).to.eq(200)
            cy.log(JSON.stringify(res.body))
            })
        })
    })
})

Then("the student should get update",()=>{
    studentIds.forEach((data)=>{
        cy.Get_id(data).then((res)=>{
            cy.log(JSON.stringify(res.body))
        })
    })
})

When("user will partially update the student with Patch",()=>{
    cy.fixture("PATCH").then((students)=>{
       cy.wrap(studentIds).each((id,index)=>{
            cy.Patch(id,students[index]).then((res)=>{
            expect(res.status).to.eq(200)
            cy.log(JSON.stringify(res.body))
            })
        })
    })
})

Then("student will be update",()=>{
     studentIds.forEach((data)=>{
        cy.Get_id(data).then((res)=>{
            cy.log(JSON.stringify(res.body))
        })
    })
})

When("now user remove the student",()=>{
 cy.wrap(studentIds).each((id)=>{
    cy.Delete(id).then((res)=>{
        expect(res.status).to.eq(200)
    })
 })
})

Then("student should be removed",()=>{
   cy.wrap(studentIds).each((id)=>{
    cy.Delete_response(id).then((res)=>{
        expect(res.status).to.eq(404)
    })
   })
})