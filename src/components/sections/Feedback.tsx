"use client";
import React, { useState, useCallback } from 'react';
import SectionHeader from '../common/SectionHeader';
import Button from '../ui/Button';
import ValidatedEmailInput from '../common/ValidatedEmailInput';
import Notification from '../common/Notification';

interface FeedbackProps {
    dictionary: {
        section_header: {
            title_part1: string;
            title_part2: string;
            subtitle: string;
        };
        form: {
            name_label: string;
            name_placeholder: string;
            email_label: string;
            email_placeholder: string;
            message_label: string;
            message_placeholder: string;
            submit_button: string;
        };
        notification: {
            success_message: string;
        };
        validation: {
            email_required: string;
            invalid_email: string;
        };
    };
}

const Feedback = ({ dictionary }: FeedbackProps) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [emailError, setEmailError] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    const validateEmail = useCallback((email: string) => {
        if (!email) {
            return dictionary.validation.email_required;
        }
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            return dictionary.validation.invalid_email;
        }
        return "";
    }, [dictionary.validation]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'email' && emailError) {
            setEmailError(validateEmail(value));
        }
    };

    const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setEmailError(validateEmail(e.target.value));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationError = validateEmail(formData.email);
        if (validationError) {
            setEmailError(validationError);
            return;
        }
        setShowNotification(true);
        setFormData({ name: '', email: '', message: '' });
        setEmailError('');
    };

    return (
        <>
            {showNotification && (
                <Notification
                    message={dictionary.notification.success_message}
                    type="success"
                    onClose={() => setShowNotification(false)}
                />
            )}
            <section id="feedback" className="bg-white dark:bg-black py-24 md:py-40">
                <div className="container mx-auto px-4">
                    <SectionHeader
                        title={<>{dictionary.section_header.title_part1}<span className="text-blue-500">{dictionary.section_header.title_part2}</span></>}
                        subtitle={dictionary.section_header.subtitle}
                    />
                    <div className="max-w-4xl mx-auto">
                        <form onSubmit={handleSubmit} noValidate className="space-y-10 bg-white dark:bg-black rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label htmlFor="name" className="block text-base font-bold text-gray-700 dark:text-gray-300 mb-3">
                                        {dictionary.form.name_label}
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="block w-full py-3 px-5 shadow-sm text-base rounded-md bg-white/80 dark:bg-gray-800 border border-[#E0E0E0] dark:border-gray-700 hover:border-[#D0D0D0] dark:hover:border-gray-600 focus:outline-none focus:border-2 focus:border-blue-500 transition-all placeholder:text-[#C0C0C0] dark:placeholder:text-gray-500"
                                        placeholder={dictionary.form.name_placeholder}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-base font-bold text-gray-700 dark:text-gray-300 mb-3">
                                        {dictionary.form.email_label}
                                    </label>
                                    <ValidatedEmailInput
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={handleEmailBlur}
                                        placeholder={dictionary.form.email_placeholder}
                                        error={emailError}
                                    />
                                </div>
                            </div>
                            <div className="pt-2">
                                <label htmlFor="message" className="block text-base font-bold text-gray-700 dark:text-gray-300 mb-3">
                                    {dictionary.form.message_label}
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={8}
                                    className="block w-full py-4 px-5 shadow-sm text-base rounded-md bg-white/80 dark:bg-gray-800 border border-[#E0E0E0] dark:border-gray-700 hover:border-[#D0D0D0] dark:hover:border-gray-600 focus:outline-none focus:border-2 focus:border-blue-500 transition-all placeholder:text-[#C0C0C0] dark:placeholder:text-gray-500"
                                    placeholder={dictionary.form.message_placeholder}
                                ></textarea>
                            </div>
                            <div className="text-center pt-4">
                                <Button
                                    type="submit"
                                    variant="outline"
                                    className="cta-button brand text-lg px-20 py-4"
                                >
                                    {dictionary.form.submit_button}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Feedback; 