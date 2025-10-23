import React from "react";
import CustomSVGProps from "@/types/CustomSVGProps";

const ArrowRightIcon= ({...props}:CustomSVGProps) => {
    return (
        <svg
            viewBox='0 0 16 16'
            width={16}
            height={16}
            {...props}
        >
            <image 
                href="/images/RightArrow.svg"
                width='16'
                height='16'
            />            
        </svg>
    )
}

export default ArrowRightIcon;