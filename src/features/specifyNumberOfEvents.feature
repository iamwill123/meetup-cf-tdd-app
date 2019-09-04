Feature: SPECIFY NUMBER OF EVENTS

Scenario: When user hasn’t specified a number, 32 is the default number
  Given that no number is specified
  When the user is looking at a list of events
  Then the user sees 32 events by default

Scenario: User can change the number of events they want to see
  Given that the user is looking at a list of events
  When the user changes the number in the input box
  Then the user will see the specified number of events
