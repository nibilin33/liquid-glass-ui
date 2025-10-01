import React, { useState } from 'react';
import { SelectInput } from '../components/SelectInput';

const options: any = [
  '苹果',
  '香蕉',
  '橙子',
  '葡萄',
  '西瓜',
  '哈密瓜',
  '柚子',
  '樱桃',
];

const SelectInputPreview: React.FC = () => {
  const [value, setValue] = useState('');

  return (
    <div className="p-2 flex flex-col items-center justify-center">
      <SelectInput
        options={options}
        value={value}
        onChange={setValue}
        placeholder="请选择或输入水果"
        className="mb-4"
      />
      <div className="mt-2 text-emerald-700">
        当前选择：{value || '无'}
      </div>
    </div>
  );
};

export default SelectInputPreview;