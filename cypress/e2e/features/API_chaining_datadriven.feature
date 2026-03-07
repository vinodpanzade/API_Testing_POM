Feature:Life cycle of API 

 Scenario: Student API Chaining through the Datadriven
  Given user have to login
  When now user will create the student
  When the user will update with put
  Then the student should get update
  When user will partially update the student with Patch
  Then student will be update
  When now user remove the student
  Then student should be removed