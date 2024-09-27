import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react'
import FlightTable from './FlightTable';
import { BrowserRouter } from 'react-router-dom';

global.fetch = jest.fn();

describe('FlightTable', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state and then displays flight data in a table', async () => {
    const mockFlights = [
        {"id":1,"flightNumber":"A1B60","airline":"Airline 1","origin":"Origin 1","destination":"Destination 1",
        "departureTime":"2024-09-26T19:00:15.120Z","status":"Departed"},{"id":2,"flightNumber":"A2B3","airline":"Airline 2",
        "origin":"Origin 2", "destination":"Destination 2","departureTime":"2024-09-26T19:16:55.120Z","status":"Departed"},
        {"id":3,"flightNumber":"A2B3","airline":"Airline 2",
        "origin":"Origin 2", "destination":"Destination 2","departureTime":"2024-09-26T19:16:55.120Z","status":"Departed"},
        {"id":4,"flightNumber":"A2B3","airline":"Airline 2",
        "origin":"Origin 2", "destination":"Destination 2","departureTime":"2024-09-26T19:16:55.120Z","status":"Departed"},{"id":5,"flightNumber":"A2B3","airline":"Airline 2",
        "origin":"Origin 2", "destination":"Destination 2","departureTime":"2024-09-26T19:16:55.120Z","status":"Departed"},
        {"id":6,"flightNumber":"A2B3","airline":"Airline 2",
        "origin":"Origin 2", "destination":"Destination 2","departureTime":"2024-09-26T19:16:55.120Z","status":"Departed"},
        {"id":7,"flightNumber":"A2B3","airline":"Airline 2",
        "origin":"Origin 2", "destination":"Destination 2","departureTime":"2024-09-26T19:16:55.120Z","status":"Departed"}
    ];
    const getJSON = () => mockFlights;
    (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: getJSON,
      });

    const { container } = render(<BrowserRouter><FlightTable /></BrowserRouter>);

    // Wait for the table to be rendered and the pagination buttons to load
    await waitFor(() => expect(container.getElementsByClassName('pagination').length).toBe(1));

    // the first page will have 5 rows + 1 header
    expect(container.getElementsByTagName('tr').length).toBe(6);

    const nextButton = Array.from(container.querySelectorAll('button')).find(
        (btn) => btn.textContent === 'Next'
    );
    if (nextButton) {
        // go to the 2nd page
        userEvent.click(nextButton);
        setTimeout(() => {
            // 2 rows will remain + 1 header
            expect(container.getElementsByTagName('tr').length).toBe(3);
        }, 5000);
    }
  });
});