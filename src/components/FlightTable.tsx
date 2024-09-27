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
        setInterval(() => {getAllFlights();}, constants.flightList.tableRefreshTime)

    }, []);

    const navigate = useNavigate();
    const navigateToDetailPage = (flightId: any) => { navigate(`/flight/${flightId}`) };

    // pagination
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = constants.flightList.itemsPerPage;
    const totalPages = Math.ceil(flights.length / itemsPerPage);
    const currentFlights = flights.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
    const nextPage = () => {
        if (currentPage < totalPages - 1)
            setCurrentPage((prevPage) => prevPage + 1);
    };
    const prevPage = () => {
        if (currentPage > 0)
            setCurrentPage((prevPage) => prevPage - 1);
    };

    return (
        <section>
            <h2>View Flights</h2>
            <p>Data is auto-refreshed every {constants.flightList.tableRefreshTime} ms</p>
            <div className="flight-table">
                <table>
                    <thead>
                        <tr>
                            {constants.flightList.tableHeaders.map((headerKey: string, index: number) => (
                                <th key={index}>{headerKey}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentFlights.map((flight: any) => (
                            <tr key={flight.id} className='table-row has-link' onClick={() => navigateToDetailPage(flight.id)}>
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
            {flights && flights.length > 0 && (
                <div className="pagination">
                    <button className='page-button has-link' onClick={prevPage} disabled={currentPage === 0}>Previous</button>
                    <button className='page-button has-link' onClick={nextPage} disabled={currentPage === totalPages - 1}>Next</button>
                </div>
            )}


        </section>
    )
}

export default FlightTable