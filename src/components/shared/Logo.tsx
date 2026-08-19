import Image from "next/image";
import React from "react";

interface AitLogoProps {
    className?: string;
}

export const Logo: React.FC<AitLogoProps> = () => {
    return (
        <Image src="/logo.png" width={45} height={45} alt="AIT logo" className="rounded-xl bg-black dark:bg-none" />
    );
};

export default Logo;
