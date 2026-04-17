import RecentFilesCard from './RecentFilesCard';
import EditorCard from './EditorCard';
import StatsCard from './StatsCard';

export default function DashboardCards() {
  return (
    <div className="animate-fade-up delay-600">
      {/* Desktop */}
      <div className="hidden md:flex items-end justify-center mt-20 pb-20 gap-4 max-w-[960px] mx-auto">
        <RecentFilesCard />
        <EditorCard />
        <StatsCard />
      </div>

      {/* Mobile — center card first */}
      <div className="flex md:hidden flex-col items-center gap-4 pb-16">
        <div className="w-full max-w-[360px]"><EditorCard /></div>
        <div className="w-full max-w-[300px]"><RecentFilesCard /></div>
        <div className="w-full max-w-[280px]"><StatsCard /></div>
      </div>
    </div>
  );
}
