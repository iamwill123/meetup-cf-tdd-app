Feature: SHOW/HIDE AN EVENT'S DETAILS

Scenario: An event details is collapsed (hidden) by default
  Given the user is looking at a list of events
  When the user scrolls through the event list
  Then no event detail should be expanded (visible)

Scenario: User can expand an event to see its details
  Given the user is looking at a list of events
  When the user clicks on an event details button
  Then the selected event should expand to show details

Scenario: User can collapse an event to hide its details
  Given the user is looking at an expanded event details
  And the details are showing
  When the user clicks the hide button to collapse the event
  Then the event details is collapsed (hidden)
