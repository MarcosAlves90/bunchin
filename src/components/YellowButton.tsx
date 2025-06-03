import React from "react";

interface YllBtnProps {
    text: string;
    clickFunction: React.MouseEventHandler<HTMLButtonElement>;
    error: string | null;
}

const YellowButton: React.FC<YllBtnProps> = ({text, clickFunction, error}) => {
    return(
        <button className={`button-session transition-colors duration-200 text-secondary hover:!bg-primary ${error ? "error !bg-red-500" : "!bg-highlight"}`} onClick={clickFunction}>
            {text}
        </button>
    )
}

export default YellowButton;