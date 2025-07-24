
import React, { useState } from 'react';
import apiClient from '../api';
import { motion, AnimatePresence } from 'framer-motion';

import { ArrowDownTrayIcon, PlaceholderIcon } from './ui/Icon';
import { containerVariants, itemVariants, pdfVariants } from '../animations/variants';

export const PayslipGenerator = ({ employees, setNotification, onReset }) => {
    const [selectedEmpNo, setSelectedEmpNo] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [isLoadingPdf, setIsLoadingPdf] = useState(false);

    const handleSelectEmployee = async (empNo) => {
        if (selectedEmpNo === empNo && pdfUrl) return;
        setSelectedEmpNo(empNo);
        setIsLoadingPdf(true);
        setPdfUrl(null);
        try {
            const response = await apiClient.get(`/api/payslip/${empNo}`, { responseType: 'blob' });
            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            setPdfUrl(fileURL);
        } catch (error) {
            setNotification({ type: 'error', message: error.response?.data?.message || 'Failed to generate PDF.' });
        } finally {
            setIsLoadingPdf(false);
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col h-screen bg-gray-50"
        >
            <header className="p-4 border-b bg-white/70 backdrop-blur-sm flex items-center justify-between sticky top-0 z-10 flex-shrink-0">
                 <h1 className="text-2xl font-bold text-gray-800">PayCraft Dashboard</h1>
                 <motion.button whileHover={{scale: 1.05}} whileTap={{scale: 0.95}} onClick={onReset} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">Start Over</motion.button>
            </header>

            <main className="flex-grow grid grid-cols-12 gap-6 p-6 overflow-hidden">
                {/* Employee List - takes 3 of 12 columns */}
                <motion.div variants={itemVariants} className="col-span-12 md:col-span-4 lg:col-span-3 bg-white rounded-xl border shadow-sm flex flex-col overflow-hidden">
                    <div className="p-4 border-b flex-shrink-0">
                        <h2 className="font-bold text-lg">Employees ({employees.length})</h2>
                    </div>
                    <ul className="overflow-y-auto">
                        {employees.map((emp) => (
                            <li key={emp.empNo}>
                                <button
                                    onClick={() => handleSelectEmployee(emp.empNo)}
                                    className={`w-full text-left p-4 border-l-4 transition-colors duration-200 ${selectedEmpNo === emp.empNo ? 'border-indigo-500 bg-indigo-50' : 'border-transparent hover:bg-gray-100'}`}
                                >
                                    <p className="font-semibold text-gray-800">{emp.name}</p>
                                    <p className="text-sm text-gray-500">Emp No: {emp.empNo}</p>
                                </button>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* PDF Preview - takes 9 of 12 columns */}
                <motion.div variants={itemVariants} className="col-span-12 md:col-span-8 lg:col-span-9 bg-gray-100 rounded-xl border flex flex-col items-center justify-center p-4 overflow-hidden">
                    <AnimatePresence mode="wait">
                        {isLoadingPdf ? (
                            <motion.div key="loader" variants={pdfVariants} initial="hidden" animate="visible" exit="exit" className="text-center">
                               <svg className="animate-spin mx-auto h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                               <p className="mt-4 font-semibold text-gray-700">Generating Payslip...</p>
                            </motion.div>
                        ) : pdfUrl ? (
                            <motion.div key="pdf" variants={pdfVariants} initial="hidden" animate="visible" exit="exit" className="w-full h-full flex flex-col">
                                <div className="flex-shrink-0 p-2 text-center">
                                    <motion.a whileHover={{scale: 1.05}} whileTap={{scale: 0.95}} href={pdfUrl} download={`${employees.find(e => e.empNo === selectedEmpNo)?.name || 'payslip'}_payslip.pdf`} className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700">
                                        <ArrowDownTrayIcon /> Download PDF
                                    </motion.a>
                                </div>
                                <div className="flex-grow w-full h-full bg-gray-200 rounded-lg mt-2 overflow-hidden">
                                    <embed src={pdfUrl} type="application/pdf" width="100%" height="100%"/>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div key="placeholder" variants={pdfVariants} initial="hidden" animate="visible" exit="exit" className="text-center text-gray-500">
                                <PlaceholderIcon />
                                <p className="mt-4 font-semibold text-lg">Select an employee to generate their payslip.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </main>
        </motion.div>
    );
};
