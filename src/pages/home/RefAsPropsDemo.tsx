import { Zap } from 'lucide-react';
import { useState } from 'react';

const CustomInput = ({
  inputRef,
  setFocused,
  ...props
}: {
  inputRef: React.Ref<HTMLInputElement>;
  placeholder: string;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <input
      ref={inputRef}
      {...props}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
};

// 4. ref 作为 prop 示例
function RefAsPropDemo() {
  const [focused, setFocused] = useState(false);
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);

  const focusInput = () => {
    if (inputRef) {
      inputRef.focus();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5 text-orange-600" />
        4. ref 作为 prop - 简化的 ref 转发
      </h3>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <pre className="text-xs text-gray-700 overflow-x-auto">
          <code>
            {`const CustomInput = (inputRef, ...props) => { 
  return <input ref={inputRef} /> 
}`}
          </code>
        </pre>
      </div>

      <div className="space-y-4">
        <CustomInput
          inputRef={setInputRef}
          placeholder="点击按钮聚焦此输入框"
          setFocused={setFocused}
        />

        <button
          type="button"
          onClick={focusInput}
          className="px-4 py-2 bg-orange-600 text-white  rounded-lg font-medium hover:bg-orange-700 transition-all"
        >
          聚焦输入框
        </button>

        {focused && (
          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <span className="text-orange-700">✨ 输入框已聚焦</span>
          </div>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-600 bg-orange-50 p-3 rounded-lg">
        <strong>特性：</strong> React 19 中不再需要 forwardRef，可以直接使用 ref
        作为 prop
      </div>
    </div>
  );
}

export default RefAsPropDemo;
