import { CheckCircle, Loader2, RefreshCw } from 'lucide-react';
import { createContext, Suspense, use, useEffect, useState } from 'react';

interface Data {
  message: string;
  timestamp: string;
  items: string[];
}

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

const ThemeContext = createContext('light');

// 模拟 API 调用
const fetchUser = (id: number): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: `用户 ${id}`,
        email: `user${id}@example.com`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`,
        role: 'Developer',
      });
    }, 3500);
  });
};

function PromiseDemo({ promise }: { promise: Promise<User> }) {
  console.log(promise);

  const data = use(promise);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      新写法（use + Suspense） 等 Promise resolve 后，自动渲染； 抛给{' '}
      {`<Suspense />`} 显示 loading；reject 抛给 {`<ErrorBoundary />`}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <pre className="text-xs text-gray-700 overflow-x-auto">
          <code>{`代码示例：

// ✅ 使用 use() 读取 Promise
function UserDisplay({ promise }) {
  const user = use(promise); // 自动等待 Promise
  return <div>{user.name}</div>;
}

// 使用 Suspense 包裹
<Suspense fallback={<Loading />}>
  <UserDisplay promise={userPromise} />
</Suspense>`}</code>
        </pre>
      </div>
      <div>{data.id}</div>
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <pre className="text-xs text-gray-700 overflow-x-auto">
          <code>
            {`代码示例：

// ✅ use() 可以在条件语句中使用
function Component({ promise, showData }) {
  if (showData) {
    const data = use(promise); // 条件式使用
    return <div>{data.name}</div>;
  }
  return <div>暂无数据</div>;
}

// ❌ 传统 Hooks 不能这样用
function OldWay({ showData }) {
  if (showData) {
    const data = useState(); // ❌ 错误！
  }
}`}
          </code>
        </pre>
      </div>
    </div>
  );
}

function ContextDemo() {
  const theme = use(ThemeContext);
  return (
    <>
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <pre className="text-xs text-gray-700 overflow-x-auto">
          <code>{`const theme = use(ThemeContext);
  return <p>当前主题: {theme}</p>;`}</code>
        </pre>
      </div>
      <p>当前主题: {theme}</p>
    </>
  );
}

// 3. use() Hook 示例 - 处理 Promise
function UseHookDemo() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Data | null>(null);

  const [promise1, setPromise1] = useState<Promise<User> | null>(null);

  useEffect(() => {
    const promise = fetchUser(1);
    setPromise1(promise);
  }, []);

  const fetchData = () => {
    setLoading(true);
    setData(null);

    const promise: Promise<Data> = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          message: '数据加载成功！',
          timestamp: new Date().toLocaleTimeString(),
          items: [
            'React 19',
            'Actions',
            'useOptimistic',
            'use() Hook',
            'ref as prop',
          ],
        });
      }, 1500);
    });

    promise.then((result) => {
      setData(result);
      setLoading(false);
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <ThemeContext value="dark">
        <ContextDemo />
      </ThemeContext>
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <RefreshCw className="w-5 h-5 text-green-600" />
        3. use() Hook - 处理 Promise - context, use 只能在 render 阶段使用
      </h3>

      <button
        type="button"
        onClick={fetchData}
        disabled={loading}
        className="px-4 py-2 bg-green-600 text-white  rounded-lg font-medium hover:bg-green-700 transition-all disabled:opacity-50 flex items-center gap-2"
      >
        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        {loading ? '加载中...' : '触发数据加载'}
      </button>

      {loading && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg flex items-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-green-600" />
          <span className="text-gray-600">正在加载数据...</span>
        </div>
      )}

      {data && !loading && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 font-medium mb-2">{data.message}</p>
          <p className="text-sm text-green-600 mb-3">时间: {data.timestamp}</p>
          <div className="space-y-1">
            {data.items.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {promise1 && (
        <Suspense fallback={<div>加载中...</div>}>
          <PromiseDemo promise={promise1} />
        </Suspense>
      )}

      <div className="mt-4 text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
        <strong>特性：</strong> use() 可以在组件中直接处理 Promise，自动处理
        Suspense 边界
      </div>
    </div>
  );
}

export default UseHookDemo;
