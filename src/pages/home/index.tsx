import ActionsDemo from './ActionsDemo';
import Compiler from './Compiler';
import OptimisticDemo from './OptimisticDemo';
import RefAsPropDemo from './RefAsPropsDemo';
import MyForm from './UseFormStatus';
import UseHookDemo from './UseHookDemo';

const Home = () => {
  return (
    <div className="page">
      <title>Home - 1</title>
      <meta name="description" content="React Demo Home" />
      <h1>React-19</h1>
      <h2>React 编译器</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <ul>
          <li>
            学习 React 编译器的作用
            以及它如何通过自动处理记忆化（memoization）来优化你的 React
            应用，从而无需再手动使用 useMemo，useCallback，和 React.memo。
          </li>
        </ul>
        <Compiler />
      </div>
      <h2>Actions (异步操作)</h2>
      <ActionsDemo />
      <h2>OptimisticDemo</h2>
      <OptimisticDemo />
      <h2>UseHookDemo</h2>
      <UseHookDemo />
      <h2>Ref</h2>
      <RefAsPropDemo />
      <h2>useFormStatus</h2>
      <MyForm />
    </div>
  );
};

export default Home;
