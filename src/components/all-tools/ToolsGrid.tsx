'use client';

import { useRouter } from 'next/navigation';
import { tools } from './toolsData';
import ToolCard from './ToolCard';

export default function ToolsGrid() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {tools.map((tool) => (
        <ToolCard
          key={tool.label}
          tool={tool}
          onClick={() => tool.active && tool.route && router.push(tool.route)}
        />
      ))}
    </div>
  );
}
