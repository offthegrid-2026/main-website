import {herotext} from "@/public";
import {heroelement1, heroelement2, heroelement3, heroelement4, heroelement5, heroelement6, heroelement7} from "@/public";
import Image from "next/image";

export default function HeroText() {
    return (
        <div className="blk">


            //BIG PROBLEM-
            // - on hiding blk-2 blk-1 becomes (0x0) -- invisible
            // - for aanimation we need to hide blk-2 or remove it

            <div className="blk-1">
                <div className="absolute top-36 left-36 z-10">
                    <Image
                        src={heroelement5}
                        alt="herotext"
                    />
                </div>
                <div className="gayyy absolute top-0 left-0 z-1">
                    <Image
                        src={heroelement6}
                        alt="herotext"
                    />
                </div>
                <div className="gayyy absolute top-16 right-0">
                    <Image
                        src={heroelement7}
                        alt="herotext"
                    />
                </div>

                <div className="absolute top-44.5 right-35 z-1">
                    <Image
                        src={heroelement1}
                        alt="herotext"
                    />
                </div>
                <div className="absolute top-20 right-83 z-1">
                    <Image
                        src={heroelement2}
                        alt="herotext"
                    />
                </div>
                <div className="absolute top-38.5 left-65.5 z-10">
                    <Image
                        src={heroelement3}
                        alt="herotext"
                    />
                </div>
                <div className="absolute top-16.5 left-16 z-10">
                    <Image
                        src={heroelement4}
                        alt="herotext"
                    />
                </div>
            </div>

            <div className="blk-2">
                <Image
                    src={herotext}
                    alt="herotext"
                    style={{

                    }}
                />
            </div>

        </div>
    )
}