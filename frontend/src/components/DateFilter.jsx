import React from 'react';

const DateFilter = ({ formData, handleDateChange }) => {
    return (
        <>
            <div className="filter-group">
                <label className="filter-label">From Date:</label>
                <input
                    type="date"
                    name="fromDate"
                    value={formData.fromDate}
                    onChange={handleDateChange}
                    className="filter-input"
                />
            </div>

            <div className="filter-group">
                <label className="filter-label">To Date:</label>
                <input
                    type="date"
                    name="toDate"
                    value={formData.toDate}
                    onChange={handleDateChange}
                    className="filter-input"
                />
            </div>
        </>
    );
};

export default DateFilter;
