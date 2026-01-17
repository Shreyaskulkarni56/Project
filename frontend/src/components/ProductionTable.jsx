import React, { useMemo } from 'react';
import { timeToMinutes, minutesToTime } from '../utils/timeUtils';

const ProductionTable = ({ submittedData, machinesToDisplay }) => {

    const totalIdleTime = useMemo(() => {
        if (!machinesToDisplay) return '00:00';
        const totalMinutes = machinesToDisplay.reduce((acc, curr) => {
            return acc + timeToMinutes(curr.totalMachineIdleHr);
        }, 0);
        return minutesToTime(totalMinutes);
    }, [machinesToDisplay]);

    return (
        <>
            {!submittedData ? (
                <div className="table-empty-state animate-fade-in">
                    <p>Select date range and click Submit to view production report</p>
                </div>
            ) : machinesToDisplay.length === 0 ? (
                <div className="table-no-data animate-fade-in">
                    <p>No data found for the selected date range and machine</p>
                </div>
            ) : (
                <div className="production-table-wrapper">
                    <table className="production-table">
                        <thead>
                            <tr>
                                <th>Machine Name</th>
                                <th>Date</th>
                                <th>Total Hours</th>
                                <th>Working Hours</th>
                                <th>Idle Hours</th>
                            </tr>
                        </thead>
                        <tbody key={submittedData ? JSON.stringify(submittedData) : 'init'}>
                            {machinesToDisplay.map((machine, index) => (
                                <tr
                                    key={`${machine.machineId}-${machine.date}`}
                                    className="animate-slide-up"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <td className="machine-name">{machine.machineId}</td>
                                    <td>{machine.date}</td>
                                    <td>{machine.totalHr}</td>
                                    <td>{machine.totalMachineWorkingHr}</td>
                                    <td>{machine.totalMachineIdleHr}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total:</td>
                                <td style={{ fontWeight: 'bold', color: '#0d7377' }}>{totalIdleTime} Hrs</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            )}
        </>
    );
};

export default ProductionTable;
