import React from 'react';

interface ValidatedEmailInputProps {
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    placeholder?: string;
    error?: string;
}

const ValidatedEmailInput: React.FC<ValidatedEmailInputProps> = ({
    id,
    name,
    value,
    onChange,
    onBlur,
    placeholder,
    error,
}) => {
    // Decouple color from structural styles for clarity and correctness.
    // The base classes are now universal, and only the colors change based on the 'error' state.
    const conditionalClasses = error
        ? 'border-red-500 focus:border-red-500' // Error state: red border, red focus border
        : 'border-[#E0E0E0] dark:border-gray-700 focus:border-blue-500'; // Normal state: grey border, blue focus border

    const inputClassName = `block w-full py-3 px-5 shadow-sm text-base rounded-md bg-white/80 dark:bg-gray-800 border hover:border-[#D0D0D0] dark:hover:border-gray-600 focus:outline-none focus:border-2 transition-all placeholder:text-[#C0C0C0] dark:placeholder:text-gray-500 ${conditionalClasses}`;

    return (
        <div>
            <input
                type="email"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                className={inputClassName}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-error` : undefined}
            />
            {error && <p id={`${id}-error`} className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
};

export default ValidatedEmailInput; 