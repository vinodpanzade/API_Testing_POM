Feature:Life cycle of API 

 Scenario: Student API lifecycle
  Given the user should be logged in 
  When the user creates a new student
  When the user updates the student using PUT
  Then the student details should be updated
  When the user partially updates the student using PATCH
  Then the student fields should be updated
  When the user deletes the student
  Then the student record should be removed