import Image from "next/image";
import React from "react";

interface AitLogoProps {
    className?: string;
}

export const Logo: React.FC<AitLogoProps> = () => {
    return (
        <Image src="/logo.png" width={50} height={50} alt="AIT logo" className="rounded-xl" />
    );
};

export default Logo;
