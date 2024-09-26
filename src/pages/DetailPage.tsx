import React from 'react'
import constants from '../util/constants'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import './detail.css'
import { getFormattedDateTime } from '../util/datetime';
import { FaArrowLeft } from 'react-icons/fa';

const DetailPage = () => {
    const { flightId } = useParams();
    const navigate = useNavigate();
    const flightDetail: any = useLoaderData();
    const assignStatusClass = (statusValue: string) => (constants.statusColors[statusValue] ? constants.statusColors[statusValue] : 'light-red') + ' chip';
    return (
        <div>
            <div className="ticket">
                <div className="ticket-header">
                    <h1><span className="h-icon-span has-link" onClick={() => navigate('/')}><FaArrowLeft></FaArrowLeft></span>Flight Details</h1>
                </div>
                <div className="ticket-body">
                    <div className="flight-info">
                        <div className="flight-details">
                            <h2>Flight No: <span>{flightDetail.flightNumber}</span></h2>
                            <p>From: <span>{flightDetail.origin}</span></p>
                            <p>To: <span>{flightDetail.destination}</span></p>
                        </div>
                        <div className="flight-dates">
                            <p>Date: <span>{getFormattedDateTime(flightDetail.departureTime).date}</span></p>
                            <p>Time: <span>{getFormattedDateTime(flightDetail.departureTime).time}</span></p>
                            <p>Status: <span className={assignStatusClass(flightDetail.status)}>{flightDetail.status}</span></p>
                        </div>
                    </div>
                </div>
                <div className="ticket-footer">
                    <p>This is a flight from the airline: {flightDetail.airline}</p>
                </div>
            </div>
        </div>

    )
}

const flightFetcher = async ({ params }: any) => {
    const res = await fetch(constants.apiBaseUrl + '/' + params.id);
    const data = await res.json();
    return data;
}

export { DetailPage as default, flightFetcher };