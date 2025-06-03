import Skeleton from 'react-loading-skeleton';
// @ts-ignore
import 'react-loading-skeleton/dist/skeleton.css';

interface PointSkeletonProps {
    tema: string;
}

export const PointSkeleton = ({ tema }: PointSkeletonProps) => {
    const baseColor = tema === 'light' ? '#0f0f0f' : '#f0f0f0';
    const highlightColor = tema === 'light' ? '#212121' : '#d1d1d1';

    return (
        <Skeleton
            className="absolute inset-0 h-full min-h-9 max-h-9 w-full rounded-sm"
            containerClassName='min-h-9 max-h-9 flex items-center justify-center'
            baseColor={baseColor}
            highlightColor={highlightColor}
        />
    );
};
