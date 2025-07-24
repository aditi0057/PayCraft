
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { FileUpload } from './components/FileUpload';
import { PayslipGenerator } from './components/PayslipGenerator';
import { MessageBox } from './components/ui/MessageBox';

export default function App() {
    const [view, setView] =  useState('upload'); // 'upload' or 'generator'
    const [employees, setEmployees] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });

    const handleUploadSuccess = (employeeData) => {
        setEmployees(employeeData);
        setView('generator');
    };
    
    const handleReset = () => {
        setEmployees([]);
        setView('upload');
        setNotification({ message: '', type: '' });
    }

    const dismissNotification = () => setNotification({ message: '', type: '' });

    return (
        <div className="font-sans w-full h-screen antialiased text-gray-900 bg-gray-50">
            <MessageBox message={notification.message} type={notification.type} onDismiss={dismissNotification} />
            <AnimatePresence mode="wait">
                {view === 'upload' ? (
                    <FileUpload 
                        key="upload" 
                        onUploadSuccess={handleUploadSuccess} 
                        setNotification={setNotification} 
                    />
                ) : (
                    <PayslipGenerator 
                        key="generator" 
                        employees={employees} 
                        setNotification={setNotification} 
                        onReset={handleReset} 
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
