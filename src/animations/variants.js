
export const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.1,
            when: "beforeChildren",
            staggerChildren: 0.08, 
        },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

export const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { type: 'spring', stiffness: 100 }
    },
};

export const pdfVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.3 }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
}
