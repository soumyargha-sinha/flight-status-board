import React from 'react'
import { useState, useEffect } from 'react';
import constants from '../util/constants';
import './style.css'
import { useNavigate } from 'react-router-dom';
import { getFormattedDateTime } from '../util/datetime';

const FlightTable = () => {
    const assignStatusClass = (statusValue: string) => (constants.statusColors[statusValue] ? constants.statusColors[statusValue] : 'light-red') + ' chip';
    const [flights, setFlights] = useState([]);
    useEffect(() => {
        const getAllFlights = async () => {
            const url = constants.apiBaseUrl;
            try {
                const response = await fetch(url);
                const flightList = await response.json();
                setFlights(flightList);
            } catch (e) {
                console.log('Error getting a response', e);
            } finally {

            }
        }
        getAllFlights();
    }, []);
    const navigate = useNavigate();
    const navigateToDetailPage = (flightId: any) => { navigate(`/flight/${flightId}`) };
    return (
        <section>
            <h2>View Flights</h2>
            <div className="flight-table">
                <table>
                    <thead>
                        <tr>
                            {constants.flightList.tableHeaders.map((headerKey: string) => (
                                <th>{headerKey}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {flights.map((flight: any) => (
                            <tr className='table-row has-link' onClick={() => navigateToDetailPage(flight.id)}>
                                <td>{flight.id}</td>
                                <td>{flight.flightNumber}</td>
                                <td>{flight.airline}</td>
                                <td>{flight.origin}</td>
                                <td>{flight.destination}</td>
                                <td>{`${getFormattedDateTime(flight.departureTime).date}, ${getFormattedDateTime(flight.departureTime).time}`}</td>
                                <td><span className={assignStatusClass(flight.status)}>{flight.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default FlightTable