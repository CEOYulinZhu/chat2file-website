# Chat2File 反馈系统

## 概述

Chat2File 反馈系统是一个完整的前后端对接解决方案，用于收集用户反馈并发送邮件通知。系统采用模块化设计，遵循单一职责原则和开闭原则，便于维护和扩展。

## 系统架构

```
src/lib/
├── api/
│   └── feedback.ts          # API 服务层
├── validation/
│   └── feedback.ts          # 表单验证层
├── hooks/
│   └── useFeedback.ts       # React Hook 层
├── config/
│   └── api.ts               # 配置管理
└── test/
    └── feedback.test.ts     # 测试文件
```

## 核心模块

### 1. API 服务层 (`api/feedback.ts`)

负责与后端 API 的通信，包括：
- 反馈数据提交
- 错误处理
- 超时控制
- 健康检查

**主要类和接口：**
- `FeedbackApiService`: API 服务主类
- `FeedbackData`: 反馈数据接口
- `FeedbackResponse`: API 响应接口
- `FeedbackApiError`: 自定义错误类

### 2. 表单验证层 (`validation/feedback.ts`)

负责表单数据的验证逻辑，包括：
- 字段必填验证
- 邮箱格式验证
- 字符长度限制验证

**主要类和接口：**
- `FeedbackValidator`: 验证器主类
- `ValidationError`: 验证错误接口
- `ValidationResult`: 验证结果接口

### 3. React Hook 层 (`hooks/useFeedback.ts`)

负责表单状态管理和业务逻辑，包括：
- 表单数据状态管理
- 提交状态管理
- 错误状态管理
- 表单重置功能

**主要接口：**
- `FeedbackFormData`: 表单数据接口
- `FeedbackFormState`: 表单状态接口
- `UseFeedbackReturn`: Hook 返回值接口

### 4. 配置管理 (`config/api.ts`)

统一管理 API 相关配置，包括：
- API 基础 URL
- 超时设置
- 端点配置
- 状态码定义

## 使用方法

### 1. 基本使用

```tsx
import { useFeedback } from '../lib/hooks/useFeedback';

function FeedbackForm() {
  const { formState, updateField, submitFeedback } = useFeedback();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitFeedback();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formState.data.name}
        onChange={(e) => updateField('name', e.target.value)}
        disabled={formState.isSubmitting}
      />
      {/* 其他表单字段 */}
      <button type="submit" disabled={formState.isSubmitting}>
        {formState.isSubmitting ? '提交中...' : '提交反馈'}
      </button>
    </form>
  );
}
```

### 2. 错误处理

```tsx
// 显示字段错误
const getFieldError = (field: string) => {
  const error = formState.errors.find(err => err.field === field);
  return error ? error.message : '';
};

// 显示提交错误
{formState.submitError && (
  <div className="error-message">
    {formState.submitError}
  </div>
)}
```

### 3. 成功状态处理

```tsx
// 显示成功消息
{formState.isSubmitted && (
  <div className="success-message">
    反馈提交成功！
  </div>
)}
```

## 环境配置

### 1. 环境变量

在 `.env.local` 文件中配置：

```env
NEXT_PUBLIC_API_BASE_URL=https://115.190.37.151
```

### 2. 后端服务

确保后端服务运行在配置的端口上，并提供以下接口：
- `POST /api/feedback`: 提交反馈
- `GET /health`: 健康检查

## 验证规则

### 字段验证规则

| 字段 | 规则 | 错误消息 |
|------|------|----------|
| name | 必填，1-50字符 | "请输入您的称呼" / "称呼长度不能超过50个字符" |
| email | 必填，有效邮箱格式 | "请输入邮箱地址" / "请输入有效的邮箱地址" |
| suggestion | 必填，1-1000字符 | "请输入您的建议" / "建议内容不能超过1000个字符" |

## 错误处理

### 错误类型

1. **网络错误**: 网络连接失败
2. **超时错误**: 请求超时
3. **验证错误**: 表单数据验证失败
4. **服务器错误**: 后端服务错误

### 错误处理策略

- 网络错误：提示用户检查网络连接
- 超时错误：提示用户稍后重试
- 验证错误：高亮错误字段并显示具体错误信息
- 服务器错误：显示通用错误提示

## 测试

运行测试：

```typescript
import { runAllTests } from './test/feedback.test';

// 在开发环境中运行测试
if (process.env.NODE_ENV === 'development') {
  runAllTests();
}
```

## 扩展指南

### 1. 添加新的验证规则

在 `FeedbackValidator` 类中添加新的验证方法：

```typescript
private static validateNewField(value: string): ValidationError[] {
  const errors: ValidationError[] = [];
  // 添加验证逻辑
  return errors;
}
```

### 2. 添加新的 API 端点

在 `FeedbackApiService` 类中添加新的方法：

```typescript
async newApiMethod(data: any): Promise<any> {
  // 实现新的 API 调用
}
```

### 3. 扩展表单状态

在 `useFeedback` Hook 中添加新的状态：

```typescript
interface FeedbackFormState {
  // 现有状态...
  newState: any;
}
```

## 注意事项

1. **CORS 配置**: 确保后端正确配置 CORS 以允许前端请求
2. **错误日志**: 生产环境中注意不要暴露敏感错误信息
3. **请求频率**: 建议对同一 IP 的请求进行频率限制
4. **数据安全**: 敏感信息不要在 URL 中传递
5. **邮件配置**: 确保后端邮件服务配置正确

## 版本历史

- v1.0.0: 初始版本，包含基本的反馈提交功能
- 支持表单验证、错误处理、状态管理
- 支持多语言（中文、英文、日文）