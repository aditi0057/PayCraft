
import React, { useState, useCallback } from 'react';
import apiClient from '../api';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';

import { TemplateGuideModal } from './ui/TemplateGuideModal';
import { FileIcon, CheckCircleIcon } from './ui/Icon';
import { containerVariants, itemVariants } from '../animations/variants';

const DropzoneUI = ({ getRootProps, getInputProps, isDragActive, file, title }) => (
    <motion.div variants={itemVariants} {...getRootProps()} className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors duration-300 h-48 flex flex-col items-center justify-center ${isDragActive ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}`}>
        <input {...getInputProps()} />
        <FileIcon />
        {file ? (
            <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-2 font-semibold text-gray-700">
                    <CheckCircleIcon />
                    <span>{file.name}</span>
                </div>
                <p className="text-sm text-gray-500">{Math.round(file.size / 1024)} KB</p>
            </div>
        ) : (
            <div className="mt-4">
                <p className="font-semibold text-gray-700">{isDragActive ? `Drop the file...` : `Drag & drop ${title}`}</p>
                <p className="text-sm text-gray-500 mt-1">or click to select</p>
            </div>
        )}
    </motion.div>
);

const InfoSection = () => (
    <motion.div 
        className="mt-24 max-w-6xl mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
    >
        {/* How it works - Redesigned */}
        <div className="text-center">
            <motion.h2 variants={itemVariants} className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                A Process So Simple, It Feels Like Magic
            </motion.h2>
            <motion.p variants={itemVariants} className="mt-4 text-lg text-gray-600">
                Generate hundreds of payslips in three intuitive steps.
            </motion.p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
            <motion.div variants={itemVariants} whileHover={{ y: -8, scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }} className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 cursor-pointer">
                <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-indigo-100 text-indigo-600 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">1. Upload Files</h3>
                <p className="mt-2 text-gray-600">Drag and drop your employee Excel sheet and your branded Word template.</p>
            </motion.div>
            <motion.div variants={itemVariants} whileHover={{ y: -8, scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }} className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 cursor-pointer">
                <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-indigo-100 text-indigo-600 mx-auto">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">2. Select & Preview</h3>
                <p className="mt-2 text-gray-600">Click on an employee's name to instantly generate and preview their unique payslip.</p>
            </motion.div>
            <motion.div variants={itemVariants} whileHover={{ y: -8, scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }} className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 cursor-pointer">
                <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-indigo-100 text-indigo-600 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">3. Download PDF</h3>
                <p className="mt-2 text-gray-600">Download the finalized, professional PDF payslip, ready for distribution.</p>
            </motion.div>
        </div>

        {/* Why PayCraft? - Redesigned */}
        <div className="mt-24 relative">
             <div className="text-center">
                <motion.h2 variants={itemVariants} className="text-3xl font-extrabold text-gray-900 sm:text-4xl">A Workflow Revolution</motion.h2>
                <motion.p variants={itemVariants} className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">PayCraft is built to save time, eliminate errors, and empower your organization.</motion.p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }} className="bg-white p-6 rounded-xl shadow-md cursor-pointer">
                    <h3 className="text-lg font-bold text-indigo-600">Time-Saving Automation</h3>
                    <p className="mt-2 text-gray-600">Slash hours of manual data entry. What used to take a whole day now takes minutes.</p>
                </motion.div>
                 <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }} className="bg-white p-6 rounded-xl shadow-md cursor-pointer">
                    <h3 className="text-lg font-bold text-indigo-600">Error Reduction</h3>
                    <p className="mt-2 text-gray-600">By automating data transfer, PayCraft minimizes the risk of costly human errors in payroll.</p>
                </motion.div>
                 <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }} className="bg-white p-6 rounded-xl shadow-md cursor-pointer">
                    <h3 className="text-lg font-bold text-indigo-600">Professional Branding</h3>
                    <p className="mt-2 text-gray-600">Use your own branded Word template to maintain a consistent and professional company image.</p>
                </motion.div>
                 <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }} className="bg-white p-6 rounded-xl shadow-md cursor-pointer">
                    <h3 className="text-lg font-bold text-indigo-600">Enhanced Security</h3>
                    <p className="mt-2 text-gray-600">No need to upload sensitive data to third-party services. Everything is processed directly from your files.</p>
                </motion.div>
                 <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }} className="bg-white p-6 rounded-xl shadow-md cursor-pointer">
                    <h3 className="text-lg font-bold text-indigo-600">Scalable Solution</h3>
                    <p className="mt-2 text-gray-600">Whether you have 10 employees or 500, PayCraft handles it with the same speed and efficiency.</p>
                </motion.div>
                 <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }} className="bg-white p-6 rounded-xl shadow-md cursor-pointer">
                    <h3 className="text-lg font-bold text-indigo-600">Cost-Effective</h3>
                    <p className="mt-2 text-gray-600">Get the power of enterprise-level payroll automation without the expensive software subscription.</p>
                </motion.div>
            </div>
        </div>

        {/* Sample File Previews - Layout Fixed */}
        <div className="mt-24">
            <div className="text-center">
                <motion.h2 variants={itemVariants} className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Get Started Instantly</motion.h2>
                <motion.p variants={itemVariants} className="mt-4 text-lg text-gray-600">See how your files should be structured or use our samples to test.</motion.p>
            </div>
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
                <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }} className="bg-white rounded-2xl shadow-xl border p-4 flex flex-col cursor-pointer">
                    <h3 className="font-semibold text-gray-800 mb-3 text-lg text-center">Sample Excel Data (`sample-data.xlsx`)</h3>
                    <div className="flex-grow rounded-lg overflow-hidden">
                        {/* CORRECTED a class here from object-cover to object-contain */}
                        <img src="/sample-excel-preview.png" alt="Sample Excel Preview" className="w-full h-full object-contain" />
                    </div>
                </motion.div>
                <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }} className="bg-white rounded-2xl shadow-xl border p-4 flex flex-col cursor-pointer">
                    <h3 className="font-semibold text-gray-800 mb-3 text-lg text-center">Sample Word Template (`sample-template.docx`)</h3>
                    <div className="flex-grow rounded-lg overflow-hidden">
                        <img src="/sample-word-preview.png" alt="Sample Word Template Preview" className="w-full h-full object-contain" />
                    </div>
                </motion.div>
            </div>
        </div>
    </motion.div>
);


export const FileUpload = ({ onUploadSuccess, setNotification }) => {
    const [excelFile, setExcelFile] = useState(null);
    const [templateFile, setTemplateFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isGuideOpen, setIsGuideOpen] = useState(false);
    const [isSampleLoading, setIsSampleLoading] = useState(false);

    const onDrop = useCallback((acceptedFiles, fileRejections, field) => {
        if (fileRejections.length > 0) {
            setNotification({ type: 'error', message: `Invalid file type. Please upload a ${field === 'excel' ? '.xlsx' : '.docx'} file.` });
        } else if (acceptedFiles.length > 0) {
            if (field === 'excel') setExcelFile(acceptedFiles[0]);
            if (field === 'template') setTemplateFile(acceptedFiles[0]);
        }
    }, [setNotification]);

    const { getRootProps: getExcelRootProps, getInputProps: getExcelInputProps, isDragActive: isExcelDragActive } = useDropzone({ onDrop: (f, r) => onDrop(f, r, 'excel'), accept: { 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] }, maxFiles: 1 });
    const { getRootProps: getTemplateRootProps, getInputProps: getTemplateInputProps, isDragActive: isTemplateDragActive } = useDropzone({ onDrop: (f, r) => onDrop(f, r, 'template'), accept: { 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] }, maxFiles: 1 });

    const handleUpload = async () => {
        if (!excelFile || !templateFile) {
            setNotification({ type: 'error', message: 'Both Excel and Word template files are required.' });
            return;
        }
        setIsLoading(true);
        const formData = new FormData();
        formData.append('excelFile', excelFile);
        formData.append('templateFile', templateFile);

        try {
            const response = await apiClient.post('/api/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            setNotification({ type: 'success', message: response.data.message });
            onUploadSuccess(response.data.employees);
        } catch (error) {
            setNotification({ type: 'error', message: error.response?.data?.message || 'An error occurred during file upload.' });
            setIsLoading(false);
        }
    };

    const handleUseSampleFiles = async () => {
        setIsSampleLoading(true);
        setNotification({ message: 'Loading sample files...', type: 'success' });
        try {
            const excelResponse = await fetch('/sample-data.xlsx');
            if (!excelResponse.ok) throw new Error('Sample Excel file not found in /public folder.');
            const excelBlob = await excelResponse.blob();
            const excelSampleFile = new File([excelBlob], "sample-data.xlsx", { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            setExcelFile(excelSampleFile);

            const templateResponse = await fetch('/sample-template.docx');
            if (!templateResponse.ok) throw new Error('Sample template file not found in /public folder.');
            const templateBlob = await templateResponse.blob();
            const templateSampleFile = new File([templateBlob], "sample-template.docx", { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
            setTemplateFile(templateSampleFile);

            setNotification({ message: 'Sample files loaded! Click "Generate Payslips".', type: 'success' });

        } catch (error) {
            console.error("Failed to load sample files:", error);
            setNotification({ type: 'error', message: "Could not load sample files. Make sure they are in the 'public' folder." });
        } finally {
            setIsSampleLoading(false);
        }
    };

    return (
        <>
            <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 pt-24 pb-24 bg-gradient-to-b from-gray-50 to-indigo-50">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="max-w-4xl w-full mx-auto"
                >
                    <div className="text-center mb-10">
                        <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl font-extrabold text-gray-800 tracking-tight">Revolutionize Your Payroll</motion.h1>
                        <motion.p variants={itemVariants} className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            Say goodbye to tedious, manual payslips. With PayCraft, generating hundreds of personalized payslips is as simple as a drag, a drop, and a click.
                        </motion.p>
                    </div>

                    <motion.div variants={itemVariants} className="bg-white/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DropzoneUI getRootProps={getExcelRootProps} getInputProps={getExcelInputProps} isDragActive={isExcelDragActive} file={excelFile} title="Employee Excel File" />
                            <DropzoneUI getRootProps={getTemplateRootProps} getInputProps={getTemplateInputProps} isDragActive={isTemplateDragActive} file={templateFile} title="Payslip Word Template" />
                        </div>

                        <div className="mt-8 flex flex-col items-center justify-center gap-4">
                             <motion.button
                                onClick={handleUpload}
                                disabled={!excelFile || !templateFile || isLoading}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                            >
                                {isLoading ? 'Processing...' : 'Generate Payslips'}
                            </motion.button>
                            <div className="flex items-center gap-6 mt-2">
                                <motion.button
                                   onClick={() => setIsGuideOpen(true)}
                                   whileHover={{ scale: 1.05 }}
                                   whileTap={{ scale: 0.95 }}
                                   className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                                >
                                    View Template Guide
                                </motion.button>
                                <motion.button
                                   onClick={handleUseSampleFiles}
                                   disabled={isLoading || isSampleLoading}
                                   whileHover={{ scale: 1.05 }}
                                   whileTap={{ scale: 0.95 }}
                                   className="text-sm font-semibold text-gray-600 hover:text-gray-800 disabled:opacity-50"
                                >
                                    {isSampleLoading ? 'Loading Samples...' : 'Use Sample Files'}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
                <InfoSection />
            </div>
            <TemplateGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
        </>
    );
};
