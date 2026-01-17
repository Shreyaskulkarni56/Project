import React from 'react';

const MachineFilter = ({
    formData,
    showDropdown,
    setShowDropdown,
    allMachines,
    handleMachineSelect,
    handleSelectAll
}) => {
    return (
        <div className="filter-group">
            <label className="filter-label">Select Machine:</label>
            <select
                value={formData.machine}
                onChange={(e) => handleMachineSelect(e.target.value)}
                className="filter-select"
            >
                <option value="">--Select Machine--</option>
                {allMachines.map((machine) => (
                    <option key={machine} value={machine}>
                        {machine}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default MachineFilter;
