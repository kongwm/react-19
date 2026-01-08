// 2. useOptimistic Hook 示例 - 乐观更新

import { Loader2, Sparkles } from 'lucide-react';
import { useOptimistic, useState, useTransition } from 'react';

type ResData = {
  success: boolean;
  data: { id: number; text?: string; completed?: boolean };
};

type Func = (data: ResData['data'], delay: number) => Promise<ResData>;

// 模拟 API 调用
const simulateAPI: Func = (data: ResData['data'], delay = 2000) => {
  return new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject({ success: true, data });
    }, delay);
  });
};

function OptimisticDemo() {
  const [todos, setTodos] = useState([
    { id: 1, text: '学习 React 19 新特性', completed: false },
    { id: 2, text: '构建现代化应用', completed: false },
    { id: 3, text: '掌握 Actions 和 Hooks', completed: false },
  ]);
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(todos);
  const [isPending, startTransition] = useTransition();

  const toggleTodo = (id: number) => {
    startTransition(async () => {
      // 乐观更新 UI
      setOptimisticTodos(
        optimisticTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      );

      try {
        // 模拟 API 调用
        await simulateAPI({ id }, 1500);

        // 实际更新状态
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo,
          ),
        );
      } catch (error) {
        console.log(error);
      }
    });
  };

  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      text: `新任务 ${todos.length + 1}`,
      completed: false,
    };

    startTransition(async () => {
      setOptimisticTodos([...optimisticTodos, newTodo]);
      await simulateAPI(newTodo, 1000);
      setTodos([...todos, newTodo]);
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-purple-600" />
        2. useOptimistic - 乐观更新
      </h3>

      <div className="space-y-2 mb-4">
        {optimisticTodos.map((todo) => (
          <div
            key={todo.id}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
              todo.completed ? 'bg-green-50' : 'bg-gray-50'
            }`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="w-5 h-5 text-purple-600 rounded cursor-pointer"
            />
            <span
              className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}
            >
              {todo.text}
            </span>
            {isPending && (
              <Loader2 className="w-4 h-4 text-purple-600 animate-spin" />
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addTodo}
        className="px-4 py-2 bg-purple-600 text-white  rounded-lg font-medium hover:bg-purple-700 transition-all"
      >
        添加新任务
      </button>

      <div className="mt-4 text-sm text-gray-600 bg-purple-50 p-3 rounded-lg">
        <strong>特性：</strong> UI
        立即响应用户操作，同时在后台同步数据，提供丝滑的用户体验
      </div>
    </div>
  );
}

export default OptimisticDemo;
