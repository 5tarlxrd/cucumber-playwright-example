@search @regression
Feature: Scenarios related to search

    Background:
        Given Home page is opened
    
    @smoke
    Scenario: Search with a valid search string
        Given perform search with "Graphics in Python" serch string in top navigation bar
        Then Search Result page contains serched post (or placeholder) with text "Graphics in Python"
    
    Scenario: Example Failed tests - Search with a valid search string
        Given perform search with "Python" serch string in top navigation bar
        Then Search Result page contains serched post (or placeholder) with text "Graphics in Python"

    Scenario: Search with an invalid search string
        Given perform search with "invalid_serach_string" serch string in top navigation bar
        Then Search Result page contains serched post (or placeholder) with text "Sorry, no posts matched your criteria."