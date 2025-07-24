
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { itemVariants } from '../../animations/variants';

export const TemplateGuideModal = ({ isOpen, onClose }) => {
    const placeholders = [
        { key: '__NAM__', value: 'Employee Name' }, { key: '__EN__', value: 'Employee Number' },
        { key: '__LOC__', value: 'Location' }, { key: '__DOB__', value: 'Date of Birth' },
        { key: '__DOJ__', value: 'Date of Joining' }, { key: '__DSG__', value: 'Designation' },
        { key: '__STS__', value: 'Status' }, { key: '__LWD__', value: 'Last Working Day' },
        { key: '__BAS__', value: 'Base Salary' }, { key: '__BOA__', value: 'Bonus/Allowances' },
        { key: '__EXP__', value: 'Expenses' }, { key: '__TAX__', value: 'Tax Deduction' },
        { key: '__TOT__', value: 'Total Net Pay' }, { key: '__ACC__', value: 'Account Number' },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-40 p-4"
                >
                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
                    >
                        <div className="p-6 border-b sticky top-0 bg-white/70 backdrop-blur-sm">
                            <h2 className="text-2xl font-bold text-gray-800">Word Template Guide</h2>
                            <p className="text-gray-600 mt-1">Your `.docx` template must use these exact placeholders to work correctly.</p>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {placeholders.map(p => (
                                    <motion.li variants={itemVariants} key={p.key} className="bg-gray-50 p-3 rounded-lg border">
                                        <code className="font-mono text-indigo-600 bg-indigo-100 px-2 py-1 rounded-md">{p.key}</code>
                                        <p className="text-gray-700 mt-1 text-sm">{p.value}</p>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-4 bg-gray-50 border-t sticky bottom-0 flex justify-end">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onClose}
                                className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Close
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
