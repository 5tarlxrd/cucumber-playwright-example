@sample_page @regression 
Feature: Scenarios related to Sample page

    Background:
        Given "samplepagetest" page is opened

    @smoke
    Scenario: Submit form on the Sample page with valid data
        Given fill the form on the Sample page with "<name>", "<email>", "<website>", "<comment>"
        And select Experience (In Years) in the form on the Sample page "<experience>"
        And select Expertise in the form on the Sample page:
            | Expertise          | Selected |
            | Functional Testing | true     |
            | Automation Testing | false    |
            | Manual Testing     | true     |
        And select Education in the form on the Sample page "<education>"
        When click on the Submit button on the the Sample page
        Then verify data in submitted form on the Sample page "<name>", "<email>", "<website>", "<comment>", "<experience>", "<education>"
        Examples:
            | name      | email                | website            | comment        | experience | education |
            | John Doe1 | john_doe_1@email.com | https://mytest.com | Test Comment 1 | 3-5        | Graduate  |


        Scenario: Submit form on the Sample page with invalid data in different fields
        Given fill the form on the Sample page with "<name>", "<email>", "<website>", "<comment>"
        And select Experience (In Years) in the form on the Sample page "<experience>"
        And select Expertise in the form on the Sample page:
            | Expertise          | Selected |
            | Functional Testing | true     |
            | Automation Testing | false    |
            | Manual Testing     | true     |
        And select Education in the form on the Sample page "<education>"
        When click on the Submit button on the the Sample page
        Then verify form not submitted on the Sample page
        Examples:
            | name      | email                | website            | comment        | experience | education |
            |           | john_doe_2@email.com | https://mytest.com | Test Comment 2 | 3-5        | Graduate  |
            | John Doe3 |                      | https://mytest.com | Test Comment 3 | 3-5        | Graduate  |
            | John Doe4 | wrong_email          | https://mytest.com | Test Comment 4 | 3-5        | Graduate  |
            | John Doe5 | john_doe_5@email.com | wrong_website      | Test Comment 5 | 3-5        | Graduate  |
            | John Doe6 | john_doe_5@email.com | wrong_website      |                | 3-5        | Graduate  |