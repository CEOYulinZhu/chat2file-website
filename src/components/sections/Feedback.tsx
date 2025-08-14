"use client";
import React, { useCallback } from 'react';
import SectionHeader from '../common/SectionHeader';
import Button from '../ui/Button';
import Notification from '../common/Notification';
import { useFeedback } from '../../lib/hooks/useFeedback';
import { FeedbackValidator } from '../../lib/validation/feedback';

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
            error_message: string;
        };
        validation: {
            email_required: string;
            invalid_email: string;
            name_required: string;
            message_required: string;
            name_too_long: string;
            message_too_long: string;
        };
    };
}

const Feedback = ({ dictionary }: FeedbackProps) => {
    const { formState, updateField, submitFeedback, clearErrors } = useFeedback();
    
    // 获取字段错误信息
    const getFieldError = useCallback((field: string) => {
        const error = formState.errors.find(err => err.field === field);
        return error ? error.message : '';
    }, [formState.errors]);

    // 处理表单字段变化
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        updateField(name as keyof typeof formState.data, value);
    }, [updateField]);

    // 处理表单提交
    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await submitFeedback();
    }, [submitFeedback]);

    // 处理通知关闭
    const handleNotificationClose = useCallback(() => {
        clearErrors();
    }, [clearErrors]);

    // 获取字符计数信息
    const getCharacterCount = useCallback((field: string, value: string) => {
        const maxLength = FeedbackValidator.getFieldMaxLength(field);
        if (maxLength === 0) return null;
        return `${value.length}/${maxLength}`;
    }, []);

    return (
        <>
            {formState.isSubmitted && (
                <Notification
                    message={dictionary.notification.success_message}
                    type="success"
                    onClose={handleNotificationClose}
                />
            )}
            {formState.submitError && (
                <Notification
                    message={formState.submitError}
                    type="error"
                    onClose={handleNotificationClose}
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
                                        <span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formState.data.name}
                                        onChange={handleChange}
                                        disabled={formState.isSubmitting}
                                        className={`block w-full py-3 px-5 shadow-sm text-base rounded-md bg-white/80 dark:bg-gray-800 border hover:border-[#D0D0D0] dark:hover:border-gray-600 focus:outline-none focus:border-2 focus:border-blue-500 transition-all placeholder:text-[#C0C0C0] dark:placeholder:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                                            getFieldError('name') 
                                                ? 'border-red-500 dark:border-red-500' 
                                                : 'border-[#E0E0E0] dark:border-gray-700'
                                        }`}
                                        placeholder={dictionary.form.name_placeholder}
                                        maxLength={50}
                                    />
                                    {getFieldError('name') && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                            {getFieldError('name')}
                                        </p>
                                    )}
                                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-right">
                                        {getCharacterCount('name', formState.data.name)}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-base font-bold text-gray-700 dark:text-gray-300 mb-3">
                                        {dictionary.form.email_label}
                                        <span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formState.data.email}
                                        onChange={handleChange}
                                        disabled={formState.isSubmitting}
                                        className={`block w-full py-3 px-5 shadow-sm text-base rounded-md bg-white/80 dark:bg-gray-800 border hover:border-[#D0D0D0] dark:hover:border-gray-600 focus:outline-none focus:border-2 focus:border-blue-500 transition-all placeholder:text-[#C0C0C0] dark:placeholder:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                                            getFieldError('email') 
                                                ? 'border-red-500 dark:border-red-500' 
                                                : 'border-[#E0E0E0] dark:border-gray-700'
                                        }`}
                                        placeholder={dictionary.form.email_placeholder}
                                    />
                                    {getFieldError('email') && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                            {getFieldError('email')}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="pt-2">
                                <label htmlFor="suggestion" className="block text-base font-bold text-gray-700 dark:text-gray-300 mb-3">
                                    {dictionary.form.message_label}
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <textarea
                                    name="suggestion"
                                    id="suggestion"
                                    value={formState.data.suggestion}
                                    onChange={handleChange}
                                    disabled={formState.isSubmitting}
                                    rows={8}
                                    className={`block w-full py-4 px-5 shadow-sm text-base rounded-md bg-white/80 dark:bg-gray-800 border hover:border-[#D0D0D0] dark:hover:border-gray-600 focus:outline-none focus:border-2 focus:border-blue-500 transition-all placeholder:text-[#C0C0C0] dark:placeholder:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                                        getFieldError('suggestion') 
                                            ? 'border-red-500 dark:border-red-500' 
                                            : 'border-[#E0E0E0] dark:border-gray-700'
                                    }`}
                                    placeholder={dictionary.form.message_placeholder}
                                    maxLength={1000}
                                ></textarea>
                                {getFieldError('suggestion') && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                        {getFieldError('suggestion')}
                                    </p>
                                )}
                                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-right">
                                    {getCharacterCount('suggestion', formState.data.suggestion)}
                                </div>
                            </div>
                            <div className="text-center pt-4">
                                <Button
                                    type="submit"
                                    variant="outline"
                                    className="cta-button brand text-lg px-20 py-4"
                                    disabled={formState.isSubmitting}
                                >
                                    {formState.isSubmitting ? '提交中...' : dictionary.form.submit_button}
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