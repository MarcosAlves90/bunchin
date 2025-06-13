import React from "react";
import { Star } from "lucide-react";

interface StoryProps {
    text: string;
    author: string;
    starNumber: number;
} 

const Story: React.FC<StoryProps> = ({ text, author, starNumber }) => (
    <div className="story transition flex flex-col items-center justify-start p-1 bg-story-card rounded-sm text-start hover:scale-110 hover:opacity-100 cursor-pointer text-secondary group-hover:opacity-50">
        <div className="box-star w-full flex gap-0.5 mt-0.5 mb-1">
            {[...Array(5)].map((_, index) => {
                const isFilled = index < starNumber;
                return (
                    <Star
                        key={index}
                        size={20}
                        fill={isFilled ? "var(--color-highlight)" : "none"}
                        stroke="var(--color-highlight)"
                    />
                );
            })}
        </div>
        <p className="story-p text-lg font-light flex-1 mb-1">{text}</p>
        <p className="story-author text-base w-full mb-0.5">{author}</p>
    </div>
);

export default Story;
