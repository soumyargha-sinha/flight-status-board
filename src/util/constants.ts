const constants = {
    apiBaseUrl: 'https://flight-status-mock.core.travelopia.cloud/flights',
    flightList: {
        tableHeaders: ['ID', 'Flight Number', 'Airline', 'Origin', 'Destination', 'Departure Time', 'Status']
    },
    statusColors: {
        'Departed': 'pale-blue',
        'On Time': 'medium-green',
        'Delayed': 'dark-red',
        'Boarding': 'bright-blue'
    } as any
}

export default constants