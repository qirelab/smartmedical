import React from "react";
import CustomSVGProps from "@/types/CustomSVGProps";

const ArrowRightGreenIcon= ({...props}:CustomSVGProps) => {
    return (
        <svg
            viewBox='0 0 16 16'
            width={16}
            height={16}
            {...props}
        >
            <image 
                href="/images/RightArrowGreen.svg"
                width='16'
                height='16'
            />            
        </svg>
    )
}

export default ArrowRightGreenIcon;