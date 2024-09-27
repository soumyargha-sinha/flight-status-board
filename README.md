# flight-status-board

## Installation

To install the project, run the following command:

```bash
npm i
```

To run the tests, run the following command:

```bash
npm run test
```

To run the project, run the following command:

```bash
npm run dev
```

## Implementation

If detail page is hit with a wrong id, it will show an error toast.
Pagination is implemented for the homepage.
Spinner loading is used.

Components:
1. FlightTable: holds the table with pagination.
2. Navbar: the top navbar.

Pages:
1. HomePage
2. DetailPage: uses a loader function to load details.

Utils:
1. constants: holds constants like table headers, auto-refresh time.
2. datetime: holds a function to parse timestamp into a readable format

Jest is used for the unit tests.