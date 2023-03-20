import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/solid';

const AlertBox = ({ message }) => {
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mt-5" role="alert">
            <ExclamationCircleIcon className="h-6 w-6 inline mr-2" />
            <span className="block sm:inline">{message}</span>
        </div>
    );
};

export default AlertBox;