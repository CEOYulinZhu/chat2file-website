/**
 * 反馈表单 Hook
 * 负责表单状态管理和提交逻辑
 */

import { useState, useCallback } from 'react';
import { feedbackApi, FeedbackData, FeedbackApiError } from '../api/feedback';
import { FeedbackValidator, ValidationError } from '../validation/feedback';

export interface FeedbackFormData {
  name: string;
  email: string;
  suggestion: string;
}

export interface FeedbackFormState {
  data: FeedbackFormData;
  errors: ValidationError[];
  isSubmitting: boolean;
  isSubmitted: boolean;
  submitError: string | null;
}

export interface UseFeedbackReturn {
  formState: FeedbackFormState;
  updateField: (field: keyof FeedbackFormData, value: string) => void;
  submitFeedback: () => Promise<void>;
  resetForm: () => void;
  clearErrors: () => void;
}

const initialFormData: FeedbackFormData = {
  name: '',
  email: '',
  suggestion: '',
};

const initialFormState: FeedbackFormState = {
  data: initialFormData,
  errors: [],
  isSubmitting: false,
  isSubmitted: false,
  submitError: null,
};

/**
 * 反馈表单 Hook
 */
export function useFeedback(): UseFeedbackReturn {
  const [formState, setFormState] = useState<FeedbackFormState>(initialFormState);

  /**
   * 更新表单字段
   */
  const updateField = useCallback((field: keyof FeedbackFormData, value: string) => {
    setFormState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [field]: value,
      },
      // 清除该字段的错误
      errors: prev.errors.filter(error => error.field !== field),
      submitError: null,
    }));
  }, []);

  /**
   * 提交反馈
   */
  const submitFeedback = useCallback(async () => {
    // 验证表单数据
    const validationResult = FeedbackValidator.validate(formState.data);
    
    if (!validationResult.isValid) {
      setFormState(prev => ({
        ...prev,
        errors: validationResult.errors,
        submitError: null,
      }));
      return;
    }

    // 开始提交
    setFormState(prev => ({
      ...prev,
      isSubmitting: true,
      errors: [],
      submitError: null,
    }));

    try {
      const feedbackData: FeedbackData = {
        name: formState.data.name.trim(),
        email: formState.data.email.trim(),
        suggestion: formState.data.suggestion.trim(),
      };

      await feedbackApi.submitFeedback(feedbackData);

      // 提交成功
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        isSubmitted: true,
        data: initialFormData, // 重置表单数据
      }));
    } catch (error) {
      let errorMessage = '提交失败，请稍后重试';

      if (error instanceof FeedbackApiError) {
        errorMessage = error.message;
      }

      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        submitError: errorMessage,
      }));
    }
  }, [formState.data]);

  /**
   * 重置表单
   */
  const resetForm = useCallback(() => {
    setFormState(initialFormState);
  }, []);

  /**
   * 清除错误
   */
  const clearErrors = useCallback(() => {
    setFormState(prev => ({
      ...prev,
      errors: [],
      submitError: null,
    }));
  }, []);

  return {
    formState,
    updateField,
    submitFeedback,
    resetForm,
    clearErrors,
  };
}