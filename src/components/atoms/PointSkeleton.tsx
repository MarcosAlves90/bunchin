import Skeleton from 'react-loading-skeleton';
// @ts-ignore
import 'react-loading-skeleton/dist/skeleton.css';
import { PointSkeletonProps } from "../../types/interfaces";

export const PointSkeleton = ({ tema }: PointSkeletonProps) => {
    const baseColor = tema === 'dark' ? '#232323' : '#d2d2d2';
    const highlightColor = tema === 'dark' ? '#494949' : '#f8f8f8';

    return (
        <Skeleton
            className="absolute inset-0 h-full min-h-9 max-h-9 w-full rounded-sm"
            containerClassName='min-h-9 max-h-9 flex items-center justify-center'
            baseColor={baseColor}
            highlightColor={highlightColor}
        />
    );
};
