
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';

export const MessageBox = ({ message, type, onDismiss }) => {
    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 100 }}
                    className={`fixed top-5 right-5 max-w-sm w-full p-4 rounded-lg shadow-2xl text-white flex items-start justify-between z-50 ${type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}
                >
                    <p className="font-medium">{message}</p>
                    <motion.button whileTap={{scale: 0.9}} onClick={onDismiss} className="ml-4 text-white hover:text-gray-200">
                        <Icon path="M6 18L18 6M6 6l12 12" className="w-5 h-5" />
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
