/**
 * 反馈表单验证工具
 * 负责表单数据的验证逻辑
 */

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * 反馈表单验证器
 */
export class FeedbackValidator {
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private static readonly MAX_NAME_LENGTH = 50;
  private static readonly MAX_SUGGESTION_LENGTH = 1000;

  /**
   * 验证反馈表单数据
   * @param data 表单数据
   * @returns ValidationResult
   */
  static validate(data: {
    name: string;
    email: string;
    suggestion: string;
  }): ValidationResult {
    const errors: ValidationError[] = [];

    // 验证姓名
    const nameErrors = this.validateName(data.name);
    errors.push(...nameErrors);

    // 验证邮箱
    const emailErrors = this.validateEmail(data.email);
    errors.push(...emailErrors);

    // 验证建议内容
    const suggestionErrors = this.validateSuggestion(data.suggestion);
    errors.push(...suggestionErrors);

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * 验证姓名字段
   */
  private static validateName(name: string): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!name || name.trim().length === 0) {
      errors.push({
        field: 'name',
        message: '请输入您的称呼',
      });
    } else if (name.length > this.MAX_NAME_LENGTH) {
      errors.push({
        field: 'name',
        message: `称呼长度不能超过${this.MAX_NAME_LENGTH}个字符`,
      });
    }

    return errors;
  }

  /**
   * 验证邮箱字段
   */
  private static validateEmail(email: string): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!email || email.trim().length === 0) {
      errors.push({
        field: 'email',
        message: '请输入邮箱地址',
      });
    } else if (!this.EMAIL_REGEX.test(email)) {
      errors.push({
        field: 'email',
        message: '请输入有效的邮箱地址',
      });
    }

    return errors;
  }

  /**
   * 验证建议内容字段
   */
  private static validateSuggestion(suggestion: string): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!suggestion || suggestion.trim().length === 0) {
      errors.push({
        field: 'suggestion',
        message: '请输入您的建议',
      });
    } else if (suggestion.length > this.MAX_SUGGESTION_LENGTH) {
      errors.push({
        field: 'suggestion',
        message: `建议内容不能超过${this.MAX_SUGGESTION_LENGTH}个字符`,
      });
    }

    return errors;
  }

  /**
   * 获取字段的最大长度限制
   */
  static getFieldMaxLength(field: string): number {
    switch (field) {
      case 'name':
        return this.MAX_NAME_LENGTH;
      case 'suggestion':
        return this.MAX_SUGGESTION_LENGTH;
      default:
        return 0;
    }
  }
}