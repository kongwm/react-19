/*
 * Compare this snippet from src/UseFormStatus.tsx:
 * # React 19 useFormStatus Hook 完整指南

## 📖 什么是 useFormStatus？

`useFormStatus` 是 React 19 新增的 Hook，用于获取父表单的提交状态。它让你可以轻松地在表单的子组件中访问提交状态，而无需通过 props 传递。

 */

import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending, data, method } = useFormStatus();

  console.log(pending, data, method);

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-[80px] p-4 px-4 py-2 mt-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
    >
      {pending ? '提交中...' : '提交'}
    </button>
  );
}

// 使用
function MyForm() {
  async function handleSubmit(formData: FormData) {
    // 处理提交
    await saveData(formData);
  }

  const saveData = (formData: FormData) => {
    // 保存数据
    return new Promise<FormData>((resolve) => {
      setTimeout(() => {
        resolve(formData);
      }, 1000);
    });
  };

  return (
    <form action={handleSubmit}>
      <input name="username" className="border-1" />
      <br />
      <SubmitButton /> {/* 自动获取表单状态 */}
    </form>
  );
}

export default MyForm;
