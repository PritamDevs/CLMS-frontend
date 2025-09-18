import React, { useEffect, useState } from 'react';

export default function Calendar() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentTime.toLocaleDateString(undefined, options);
    const formattedTime = currentTime.toLocaleTimeString();

    return (
        <div className="fixed bottom-6 right-6 bg-white shadow-lg rounded-xl p-4 w-64 text-center z-50">
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">📅 Today</h3>
            <p className="text-gray-800 text-sm">{formattedDate}</p>
            <p className="text-gray-600 text-xl font-mono mt-2">{formattedTime}</p>
        </div>
    );
}