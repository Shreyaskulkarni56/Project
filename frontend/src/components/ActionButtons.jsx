import React from 'react';
import { Check, Download } from 'lucide-react';

const ActionButtons = ({ handleSubmit, handleDownload }) => {
    return (
        <div className="action-buttons">
            <button
                className="submit-btn"
                onClick={handleSubmit}
            >
                Submit <Check size={18} />
            </button>
            <button
                className="download-btn"
                onClick={handleDownload}
            >
                Download <Download size={18} />
            </button>
        </div>
    );
};

export default ActionButtons;
