// biome-ignore assist/source/organizeImports: <react>
import { useState, useTransition } from 'react';
import { CheckCircle, Loader2, Zap } from 'lucide-react';

type ResData = {
  success: boolean;
  data: { name: string; email: string };
};

type Func = (data: ResData['data']) => Promise<ResData>;

// 模拟 API 调用
const simulateAPI: Func = (data: ResData['data'], delay = 2000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data });
    }, delay);
  });
};

function ActionsDemo() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ResData | null>(null);
  const [formData, setFormData] = useState<ResData['data']>({
    name: '',
    email: '',
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.info('开始提交表单');
    startTransition(async () => {
      try {
        const dd = await simulateAPI(formData);
        setResult(dd);
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5 text-blue-600" />
        1. Actions - 简化异步操作
      </h3>

      <div className="space-y-4">
        <div>
          {/** biome-ignore lint/a11y/noLabelWithoutControl: <label> */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            姓名
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入姓名"
          />
        </div>

        <div>
          {/** biome-ignore lint/a11y/noLabelWithoutControl: <label> */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            邮箱
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入邮箱"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isPending}
          type="button"
          className="w-full px-4 py-2 bg-blue-600 text-white  rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              提交中...
            </>
          ) : (
            '提交表单'
          )}
        </button>
      </div>

      {result && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700">
            提交成功！数据: {result.data.name}
          </span>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
        <strong>特性：</strong> 使用 useTransition
        处理异步操作，自动管理加载状态
      </div>

      <h1>startTransition 的正确方式</h1>
      <section>
        <h2>方式 1: 在 then 回调内部使用</h2>
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <pre className="text-xs text-gray-700 overflow-x-auto">
            {`fetchUserData(1)
  .then(data => {
    startTransition(() => {
      setUser(data); // ✅ 正确
    });
  });

  // 链式 Promise
  fetch()
  .then(step1)
  .then(step2)
  .then(finalData => {
    startTransition(() => {
      setState(finalData); // ✅
    });
  });

  // 所有更新在同一个 transition
  fetch().then(data => {
  startTransition(() => {
    setUser(data.user);
    setPosts(data.posts);
    setComments(data.comments);
  }); // ✅ 所有更新在同一个 transition
});
  `}
          </pre>
        </div>
      </section>
      <section>
        <h2>方式 2: async/await - await 后使用</h2>
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <pre className="text-xs text-gray-700 overflow-x-auto">
            {`const data = await fetchData();
startTransition(() => {
  setState(data); // ✅ 正确
});`}
          </pre>
        </div>
      </section>
      <section>
        <h2>方式 3: 将整个 async 函数包裹</h2>
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <pre className="text-xs text-gray-700 overflow-x-auto">
            {`startTransition(async () => {
  const data = await fetchData();
  setState(data); // ✅ 正确
});`}
          </pre>
        </div>
      </section>
    </div>
  );
}

export default ActionsDemo;
