import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface NotificationProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const bgColor = 'bg-blue-500'; 
    const Icon = type === 'success' ? CheckCircle : XCircle;

    return (
        <div
            className={`fixed z-50 flex items-center p-4 rounded-lg shadow-lg text-white transition-all duration-300 ${bgColor}
                w-auto max-w-[90%] top-5 left-1/2 -translate-x-1/2
                md:max-w-md md:top-auto md:left-auto md:bottom-8 md:right-8 md:translate-x-0
                ${isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-10 md:translate-y-0 md:translate-x-full'
                }`
            }
        >
            <Icon className="h-6 w-6 mr-3 flex-shrink-0" />
            <div className="overflow-hidden">
                <p className="truncate">{message}</p>
            </div>
        </div>
    );
};

export default Notification; 