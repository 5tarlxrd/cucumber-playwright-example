@navigation @regression @smoke
Feature: Scenarios related to navigation

    Background:
        Given Home page is opened

    Scenario: Navigate to CheatSheets page
        Given click on "CheatSheets" button in top navigation bar
        Then page has title "Cheatsheets for Python, SQL, ML, AI, GIT, VIM, Bash - GlobalSQA"
    
     Scenario: Navigate to Free Ebooks page
        Given click on "Free Ebooks" button in top navigation bar
        Then page has title "Free Ebooks - GlobalSQA"
    
     Scenario: Navigate to Tester's Hub page
        Given click on "Tester’s Hub" button in top navigation bar
        Then page has title "Tester's Hub - GlobalSQA"
    
     Scenario: Navigate to Contacts page
        Given click on "Contact Us" button in top navigation bar
        Then page has title "Contact Us - GlobalSQA"

     Scenario: Navigate to Home page
        Given click on "Home" button in top navigation bar
        Then page has title "CheatSheets, Mindmaps, Free Ebooks- GlobalSQA"

    
