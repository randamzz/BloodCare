import React, { useState, useEffect } from 'react';
import EventForm from './EventForm';
import PlannedEventsList from './PlannedEventsList'; // Updated import statement

const EventMain = () => {
    const [refreshPage, setRefreshPage] = useState(false);

    useEffect(() => {
        if (refreshPage) {
            // Reload the page when refreshPage becomes true
            window.location.reload();
            // Reset refreshPage to false after the page reload
            setRefreshPage(false);
        }
    }, [refreshPage]);

    const handleEventSubmitted = () => {
        // Update state to trigger page refresh
        setRefreshPage(true);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{ marginRight: '10px' }}>
                    {/* Pass a callback function to handle successful event submission */}
                    <EventForm onEventSubmitted={handleEventSubmitted} />
                </div>
            </div>
        </div>
    );
};

export default EventMain;
