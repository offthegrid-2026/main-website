import {herotext} from "@/public";
import Image from "next/image";

export default function HeroText() {
    return (
        <div>
            <Image
                src={herotext}
                alt="herotext"
                style={{

                }}
            />
        </div>
    )
}