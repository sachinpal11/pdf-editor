import RecentFilesCard from './RecentFilesCard';
import EditorCard from './EditorCard';
import StatsCard from './StatsCard';

export default function DashboardCards() {
  return (
    <div className="animate-fade-up delay-600">
      {/* Desktop */}
      <div
        className="hidden md:flex mt-20 items-end justify-center"
        style={{ gap: 16, maxWidth: 960, paddingBottom: 80 }}
      >
        <RecentFilesCard />
        <EditorCard />
        <StatsCard />
      </div>

      {/* Mobile — center card first */}
      <div className="flex md:hidden flex-col items-center" style={{ gap: 16, paddingBottom: 60 }}>
        <div style={{ width: '100%', maxWidth: 360 }}><EditorCard /></div>
        <div style={{ width: '100%', maxWidth: 300 }}><RecentFilesCard /></div>
        <div style={{ width: '100%', maxWidth: 280 }}><StatsCard /></div>
      </div>
    </div>
  );
}
