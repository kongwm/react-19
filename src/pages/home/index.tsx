import ActionsDemo from './ActionsDemo';
import OptimisticDemo from './OptimisticDemo';
import RefAsPropDemo from './RefAsPropsDemo';
import MyForm from './UseFormStatus';
import UseHookDemo from './UseHookDemo';

const Home = () => {
  return (
    <div className="page">
      <title>Home</title>
      <meta name="description" content="React Demo Home" />
      <h1>React 编译器</h1>
      <section className="m-4 p-1">
        <ul>
          <li>
            学习 React 编译器的作用
            以及它如何通过自动处理记忆化（memoization）来优化你的 React
            应用，从而无需再手动使用 useMemo，useCallback，和 React.memo。
          </li>
        </ul>
      </section>
      <h1>useFormStatus</h1>
      <MyForm />
      <h1>Ref</h1>
      <RefAsPropDemo />
      <h1>UseHookDemo</h1>
      <UseHookDemo />
      <h1>OptimisticDemo</h1>
      <OptimisticDemo />
      <h1>Actions (异步操作)</h1>
      <ActionsDemo />
    </div>
  );
};

export default Home;
