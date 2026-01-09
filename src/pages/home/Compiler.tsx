import {
  AlertCircle,
  CheckCircle,
  RefreshCw,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { memo, useCallback, useMemo, useRef, useState } from 'react';

// ========================================
// 示例 1: 传统方式 vs React Compiler
// ========================================

type ListFucType = { item: Item; onToggle: (id: number) => void };
type ExpenseFucType = { data: string; onUpdate: (e: any) => void };

// 传统方式：需要手动优化
const ExpensiveComponentOld = memo(({ data, onUpdate }: ExpenseFucType) => {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-red-900">❌ 传统方式（手动 memo）</h4>
        <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded-full">
          渲染次数: {renderCount.current}
        </span>
      </div>
      <p className="text-sm text-red-700">数据: {data}</p>
      <button
        type="button"
        onClick={onUpdate}
        className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
      >
        更新
      </button>
    </div>
  );
});

// React Compiler 方式：自动优化
function ExpensiveComponentNew({ data, onUpdate }: ExpenseFucType) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  // React Compiler 会自动：
  // 1. 记忆化这个组件
  // 2. 记忆化 props
  // 3. 不需要手动 memo/useMemo/useCallback

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-green-900">
          ✅ React Compiler（自动优化）
        </h4>
        <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
          渲染次数: {renderCount.current}
        </span>
      </div>
      <p className="text-sm text-green-700">数据: {data}</p>
      <button
        type="button"
        onClick={onUpdate}
        className="mt-2 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
      >
        更新
      </button>
    </div>
  );
}

function Example1() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState('初始数据');

  // 传统方式：需要手动 useCallback
  const handleUpdateOld = useCallback(() => {
    setData('已更新 ' + Date.now());
  }, []);

  // React Compiler 方式：不需要 useCallback
  const handleUpdateNew = () => {
    setData('已更新 ' + Date.now());
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5 text-blue-600" />
        示例 1: 组件优化对比
      </h3>

      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900 mb-2">
          <strong>测试方法：</strong>{' '}
          点击"触发父组件更新"，观察两个子组件的渲染次数
        </p>
        <p className="text-xs text-blue-700">
          ✓ 手动优化的组件不会重新渲染（使用了 memo）
          <br />✓ React Compiler 的组件也不会重新渲染（自动优化）
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            触发父组件更新 (Count: {count})
          </button>
          <span className="text-sm text-gray-600">
            这不会影响数据，但会触发父组件重渲染
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ExpensiveComponentOld data={data} onUpdate={handleUpdateOld} />
          <ExpensiveComponentNew data={data} onUpdate={handleUpdateNew} />
        </div>
      </div>
    </div>
  );
}

// ========================================
// 示例 2: 复杂计算的优化
// ========================================

// 昂贵的计算函数
function expensiveCalculation(num: number) {
  console.log('执行昂贵计算...');
  let result = 0;
  for (let i = 0; i < 100000; i++) {
    result += num * i;
  }
  return result;
}

// 传统方式：手动 useMemo
function CalculationOld({ number }: { number: number }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  const result = useMemo(() => {
    return expensiveCalculation(number);
  }, [number]);

  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
      <h4 className="font-semibold text-red-900 mb-2">
        ❌ 传统方式（useMemo）
      </h4>
      <p className="text-sm text-red-700">渲染次数: {renderCount.current}</p>
      <p className="text-sm text-red-700">
        计算结果: {result.toLocaleString()}
      </p>
    </div>
  );
}

// React Compiler：自动优化
function CalculationNew({ number }: { number: number }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  // React Compiler 会自动记忆化这个计算
  const result = expensiveCalculation(number);

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h4 className="font-semibold text-green-900 mb-2">
        ✅ React Compiler（自动）
      </h4>
      <p className="text-sm text-green-700">渲染次数: {renderCount.current}</p>
      <p className="text-sm text-green-700">
        计算结果: {result.toLocaleString()}
      </p>
    </div>
  );
}

function Example2() {
  const [number, setNumber] = useState(10);
  const [unrelatedState, setUnrelatedState] = useState(0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-purple-600" />
        示例 2: 复杂计算优化
      </h3>

      <div className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <p className="text-sm text-purple-900 mb-2">
          <strong>测试方法：</strong> 观察控制台，改变计算数字时才会执行计算
        </p>
        <p className="text-xs text-purple-700">
          ✓ 点击"无关更新"不会重新计算
          <br />✓ 改变数字才会重新计算
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setNumber(number + 1)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            改变数字 ({number})
          </button>
          <button
            type="button"
            onClick={() => setUnrelatedState(unrelatedState + 1)}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            无关更新 ({unrelatedState})
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CalculationOld number={number} />
          <CalculationNew number={number} />
        </div>
      </div>
    </div>
  );
}

// ========================================
// 示例 3: 列表渲染优化
// ========================================

interface Item {
  id: number;
  text: string;
  completed: boolean;
}

const ListItemOld = memo(({ item, onToggle }: ListFucType) => {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => onToggle(item.id)}
          className="w-4 h-4"
        />
        <span
          className={
            item.completed ? 'line-through text-gray-400' : 'text-gray-900'
          }
        >
          {item.text}
        </span>
      </div>
      <span className="text-xs text-red-600">渲染: {renderCount.current}</span>
    </div>
  );
});

function ListItemNew({ item, onToggle }: ListFucType) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  // React Compiler 自动优化，只有当 item 或 onToggle 变化时才重渲染
  return (
    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => onToggle(item.id)}
          className="w-4 h-4"
        />
        <span
          className={
            item.completed ? 'line-through text-gray-400' : 'text-gray-900'
          }
        >
          {item.text}
        </span>
      </div>
      <span className="text-xs text-green-600">
        渲染: {renderCount.current}
      </span>
    </div>
  );
}

function Example3() {
  const [items, setItems] = useState([
    { id: 1, text: '学习 React 19', completed: false },
    { id: 2, text: '了解 React Compiler', completed: false },
    { id: 3, text: '构建应用', completed: false },
  ]);
  const [filter, setFilter] = useState('all');

  // 传统方式：需要 useCallback
  const handleToggleOld = useCallback((id: number) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  }, []);

  // React Compiler：不需要 useCallback
  const handleToggleNew = (id: number) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-green-600" />
        示例 3: 列表渲染优化
      </h3>

      <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-sm text-green-900 mb-2">
          <strong>测试方法：</strong> 勾选项目，只有被点击的项目会重新渲染
        </p>
        <p className="text-xs text-green-700">
          ✓ 其他未改变的项目不会重新渲染
          <br />✓ 改变筛选器也只会重渲染必要的部分
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
          >
            全部
          </button>
          <button
            type="button"
            onClick={() => setFilter('active')}
            className={`px-3 py-1 rounded ${filter === 'active' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
          >
            未完成
          </button>
          <button
            type="button"
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 rounded ${filter === 'completed' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
          >
            已完成
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-red-900 mb-2">❌ 传统方式</h4>
            <div className="space-y-2">
              {items.map((item) => (
                <ListItemOld
                  key={item.id}
                  item={item}
                  onToggle={handleToggleOld}
                />
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-green-900 mb-2">
              ✅ React Compiler
            </h4>
            <div className="space-y-2">
              {items.map((item) => (
                <ListItemNew
                  key={item.id}
                  item={item}
                  onToggle={handleToggleNew}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// 验证工具
// ========================================
function VerificationTools() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-orange-600" />
        验证 React Compiler 是否工作
      </h3>

      <div className="space-y-4">
        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <h4 className="font-semibold text-orange-900 mb-3">🔍 验证方法</h4>

          <div className="space-y-3 text-sm text-orange-800">
            <div className="flex items-start gap-2">
              <span className="font-bold">1️⃣</span>
              <div>
                <strong>查看构建输出</strong>
                <pre className="mt-1 bg-white p-2 rounded text-xs overflow-x-auto">
                  {`npm run build
# 查找输出中的 React Compiler 信息`}
                </pre>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="font-bold">2️⃣</span>
              <div>
                <strong>使用 React DevTools</strong>
                <p className="text-xs mt-1">
                  安装 React DevTools 浏览器扩展，在 Profiler 中查看渲染次数
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="font-bold">3️⃣</span>
              <div>
                <strong>添加渲染计数器</strong>
                <pre className="mt-1 bg-white p-2 rounded text-xs overflow-x-auto">
                  {`const renderCount = useRef(0);
renderCount.current += 1;

return <div>渲染次数: {renderCount.current}</div>`}
                </pre>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="font-bold">4️⃣</span>
              <div>
                <strong>检查编译后的代码</strong>
                <p className="text-xs mt-1">
                  React Compiler 会添加特殊的注释和优化标记
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// 代码对比
// ========================================
function CodeComparison() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold mb-4">📝 代码对比</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h4 className="font-semibold text-red-900 mb-3">
            ❌ React 18（手动优化）
          </h4>
          <pre className="text-xs bg-white p-3 rounded overflow-x-auto">
            {`import { memo, useMemo, useCallback } from 'react';

const MyComponent = memo(({ data, onClick }) => {
  const processed = useMemo(() => {
    return processData(data);
  }, [data]);
  
  const handleClick = useCallback(() => {
    onClick(processed);
  }, [onClick, processed]);
  
  return <button onClick={handleClick}>
    {processed}
  </button>;
});`}
          </pre>
        </div>

        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-3">
            ✅ React 19 + Compiler
          </h4>
          <pre className="text-xs bg-white p-3 rounded overflow-x-auto">
            {`// 不需要 memo, useMemo, useCallback

function MyComponent({ data, onClick }) {
  const processed = processData(data);
  
  const handleClick = () => {
    onClick(processed);
  };
  
  return <button onClick={handleClick}>
    {processed}
  </button>;
}

// React Compiler 自动优化！`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ========================================
// 主应用
// ========================================
export default function Compiler() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Zap className="w-8 h-8 text-blue-600" />
            React Compiler 自动优化演示
          </h1>
          <p className="text-gray-600">
            React 19 的 React Compiler 自动优化性能，无需手动使用
            memo/useMemo/useCallback
          </p>
        </header>

        <div className="space-y-6">
          <Example1 />
          <Example2 />
          <Example3 />
          <CodeComparison />
          <VerificationTools />

          {/* 总结 */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              💡 React Compiler 的好处
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-green-600 mb-2">✅ 优点</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• 自动优化，减少样板代码</li>
                  <li>• 不需要手动 memo/useMemo/useCallback</li>
                  <li>• 更好的性能，自动识别优化点</li>
                  <li>• 代码更简洁易读</li>
                  <li>• 减少优化错误</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-blue-600 mb-2">
                  📋 注意事项
                </h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• 需要配置 Babel 插件</li>
                  <li>• 某些边缘情况可能需要手动优化</li>
                  <li>• 检查构建输出确认是否启用</li>
                  <li>• 使用 DevTools 验证优化效果</li>
                  <li>• 逐步迁移，不必一次性全改</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
