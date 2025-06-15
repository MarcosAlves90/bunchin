import Skeleton from 'react-loading-skeleton';
// @ts-ignore
import 'react-loading-skeleton/dist/skeleton.css';
import { EmployeeSkeletonProps } from "../../types/interfaces";

export const EmployeeSkeleton = ({ tema }: EmployeeSkeletonProps) => {
    const baseColor = tema === 'dark' ? '#0f0f0f' : '#f0f0f0';
    const highlightColor = tema === 'dark' ? '#212121' : '#d1d1d1';

    return (
        <Skeleton
            className="absolute inset-0 h-full min-h-[calc(42px)] max-h-[calc(42px)] w-full rounded-sm"
            containerClassName="min-h-[calc(42px)] max-h-[calc(42px)] flex items-center justify-center"
            baseColor={baseColor}
            highlightColor={highlightColor}
        />
    );
};
