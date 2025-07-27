// components/CategorySkeleton.tsx
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CategorySkeleton() {
  return (
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
      <div className="flex flex-col items-center gap-2">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary shadow p-1 relative">
          <Skeleton circle width="100%" height="100%" />
        </div>
        <Skeleton width={60} height={14} borderRadius={4} />
      </div>
    </SkeletonTheme>
  );
}
