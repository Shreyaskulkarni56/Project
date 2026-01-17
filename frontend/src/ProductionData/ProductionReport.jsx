import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import MachineData from '../data/MachineData';
import DateFilter from '../components/DateFilter';
import MachineFilter from '../components/MachineFilter';
import ActionButtons from '../components/ActionButtons';
import ProductionTable from '../components/ProductionTable';
import IdleTimeChart from '../components/IdleTimeChart';
import { timeToMinutes, minutesToTime } from '../utils/timeUtils';
import './ProductionReport.css';

export default function ProductionReport() {
  const [formData, setFormData] = useState({
    fromDate: '',
    toDate: '',
    machine: ''
  });

  const [showDropdown, setShowDropdown] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  console.log("before hardcoded", MachineData)

  const TOTALHr = "08:00";

  // Helper functions moved to utils

  const machineData = MachineData.map(machine => {
    const totalMinutes = timeToMinutes(TOTALHr);
    const workingMinutes = timeToMinutes(machine.totalMachineWorkingHr);
    const idleMinutes = totalMinutes - workingMinutes;

    return {
      ...machine,
      "totalHr": TOTALHr,
      "totalMachineIdleHr": minutesToTime(idleMinutes)
    };
  });


  // Helper function to convert DD-MM-YYYY to Date object
  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('-');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };

  // Get unique machines for dropdown
  const allMachines = [...new Set(machineData.map(item => item.machineId))];

  const getMachinesToDisplay = () => {
    if (!submittedData) return [];

    let filteredData = machineData;
    // Filter by date range
    if (submittedData.fromDate && submittedData.toDate) {
      filteredData = filteredData.filter((record) => {
        // Parse DD-MM-YYYY from MachineData
        const recordDate = parseDate(record.date);

        // Parse YYYY-MM-DD from date input and set to start of day
        const fromDate = new Date(submittedData.fromDate);
        fromDate.setHours(0, 0, 0, 0);

        const toDate = new Date(submittedData.toDate);
        toDate.setHours(23, 59, 59, 999);

        return recordDate >= fromDate && recordDate <= toDate;
      });
    }

    // Filter by specific machine
    if (submittedData.machine) {
      filteredData = filteredData.filter((record) =>
        record.machineId === submittedData.machine
      );
    }

    return filteredData;
  };

  const machinesToDisplay = getMachinesToDisplay();

  const handleSubmit = () => {
    if (!formData.fromDate || !formData.toDate) {
      return;
    }
    console.log('Form submitted:', formData);
    setSubmittedData({ ...formData });
  };

  const handleDownload = () => {
    if (!machinesToDisplay || machinesToDisplay.length === 0) {
      return;
    }

    // Prepare data for Excel
    const excelData = machinesToDisplay.map(machine => ({
      'Machine Name': machine.machineId,
      'Date': machine.date,
      'Total Hours': machine.totalHr,
      'Working Hours': machine.totalMachineWorkingHr,
      'Idle Hours': machine.totalMachineIdleHr
    }));
    // Create a new workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Production Report');

    // Set column widths for better readability
    const columnWidths = [
      { wch: 20 }, // Machine Name
      { wch: 15 }, // Date
      { wch: 15 }, // Total Hours
      { wch: 18 }, // Working Hours
      { wch: 15 }  // Idle Hours
    ];
    worksheet['!cols'] = columnWidths;

    // Generate Excel file and download
    const fileName = `production_report_${formData.fromDate}_to_${formData.toDate}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const handleDateChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleMachineSelect = (machineId) => {
    setFormData(prev => ({
      ...prev,
      machine: machineId
    }));
    setShowDropdown(false);
  };

  const handleSelectAll = () => {
    setFormData(prev => ({
      ...prev,
      machine: ''
    }));
    setShowDropdown(false);
  };

  return (
    <div className="production-report-container">
      {/* Teal Header */}
      <div className="header-bg">
        <div className="logo-circle">
          <span style={{ fontSize: '22px', fontWeight: 'bold', letterSpacing: '1px' }}>STS</span>
        </div>
        <h1 className="header-title">Idle Time Report Production </h1>
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <div className="filter-row">
          <DateFilter
            formData={formData}
            handleDateChange={handleDateChange}
          />

          <MachineFilter
            formData={formData}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            allMachines={allMachines}
            handleMachineSelect={handleMachineSelect}
            handleSelectAll={handleSelectAll}
          />

          <ActionButtons
            handleSubmit={handleSubmit}
            handleDownload={handleDownload}
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="table-section">
        <ProductionTable
          submittedData={submittedData}
          machinesToDisplay={machinesToDisplay}
        />
        {submittedData && machinesToDisplay.length > 0 && (
          <div className="animate-scale-in" key={JSON.stringify(submittedData)}>
            <IdleTimeChart data={machinesToDisplay} />
          </div>
        )}
      </div>
    </div>
  );
}