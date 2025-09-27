import React, { useState } from 'react';
import { TagInput } from '../components/TagInput';

const TagInputPreview: React.FC = () => {
  const [tags, setTags] = useState<string[]>(['React', 'UI']);

  return (
    <div className="p-8 bg-emerald-50　flex flex-col items-center">
      <TagInput
        value={tags}
        onChange={setTags}
        placeholder="请输入标签并回车"
        maxTags={8}
      />
      <div className="mt-4 text-emerald-700">
        {tags.length ? tags.join('，') : '－'}
      </div>
    </div>
  );
};
export default TagInputPreview;