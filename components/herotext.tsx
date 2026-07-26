"use client";

import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import type { StaticImageData } from "next/image";
import {
    heroelement1,
    heroelement2,
    heroelement3,
    heroelement4,
    heroelement5,
    heroelement6,
    heroelement7,
    heroelement8,
} from "@/public";

// The artwork was authored as one 1000x378 SVG (public/herotext.svg) and split
// into the pieces below, so x/y/w/h are its exact coordinates in that space.
// Laying them out as percentages of an aspect-locked box means the group scales
// as one unit and no longer needs the full-size image behind it to have a size.
const ART_W = 1000;
const ART_H = 378;

// How much faster the bursts spin while the artwork is hovered.
const HOVER_BOOST = 4;
// Per-frame easing towards the target speed, so the boost ramps instead of snapping.
const SPEED_EASING = 0.06;

type Layer = {
    src: StaticImageData;
    alt: string;
    x: number;
    y: number;
    w: number;
    h: number;
    drift: number;
    delay: number;
    /** degrees per second, continuous. positive = clockwise. bursts only. */
    spin?: number;
    /** degrees of to-and-fro sway, for the pieces that are not bursts. */
    wobble?: number;
};

// Back to front, matching the paint order of the source artwork.
// The purple burst on the right and the orange one behind "OF" turn clockwise;
// the pink burst on the left turns anticlockwise.
const layers: Layer[] = [
    { src: heroelement7, alt: "purple burst", x: 694, y: 76, w: 297, h: 292, spin: 12, drift: 10, delay: 0 },
    { src: heroelement1, alt: "bengal", x: 588, y: 178, w: 272, h: 132, drift: 6, delay: 0.35 },
    { src: heroelement6, alt: "pink burst", x: 5, y: 0, w: 208, h: 211, spin: -12, drift: 12, delay: 0.05 },
    { src: heroelement4, alt: "future", x: 65, y: 66, w: 377, h: 96, drift: 6, delay: 0.15 },
    { src: heroelement3, alt: "of design", x: 261, y: 124, w: 316, h: 160, drift: 6, delay: 0.25 },
    // the burst turns under the "OF" letters, which stay upright on top of it
    { src: heroelement5, alt: "orange burst", x: 144, y: 144, w: 121, h: 148, spin: 14, drift: 8, delay: 0.1 },
    { src: heroelement8, alt: "of", x: 168, y: 173, w: 72, h: 103, drift: 8, delay: 0.1 },
    { src: heroelement2, alt: "in", x: 544, y: 76, w: 124, h: 108, wobble: -8, drift: 9, delay: 0.3 },
];

const pct = (value: number, of: number) => `${(value / of) * 100}%`;

function HeroLayer({ layer, boosted }: { layer: Layer; boosted: boolean }) {
    // Driven by hand rather than by a looping keyframe: a keyframe animation
    // would have to restart to change speed, which shows up as a visible jump.
    const rotate = useMotionValue(0);
    const speed = useRef(0);

    useAnimationFrame((_, delta) => {
        if (!layer.spin) return;
        const target = layer.spin * (boosted ? HOVER_BOOST : 1);
        speed.current += (target - speed.current) * SPEED_EASING;
        rotate.set((rotate.get() + (speed.current * delta) / 1000) % 360);
    });

    return (
        <motion.div
            className="absolute"
            style={{
                left: pct(layer.x, ART_W),
                top: pct(layer.y, ART_H),
                width: pct(layer.w, ART_W),
                height: pct(layer.h, ART_H),
            }}
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
                delay: layer.delay,
                type: "spring",
                stiffness: 200,
                damping: 18,
            }}
        >
            {/* separate element so the idle loop does not fight the entrance */}
            <motion.div
                className="relative h-full w-full"
                style={layer.spin ? { rotate } : undefined}
                animate={{
                    y: [0, -layer.drift, 0],
                    ...(layer.wobble ? { rotate: [0, layer.wobble, 0] } : {}),
                }}
                transition={{
                    y: {
                        duration: 6 + layer.drift / 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: layer.delay,
                    },
                    rotate: {
                        duration: 9,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: layer.delay,
                    },
                }}
            >
                <Image
                    src={layer.src}
                    alt={layer.alt}
                    fill
                    sizes="(max-width: 1000px) 100vw, 1000px"
                    priority
                />
            </motion.div>
        </motion.div>
    );
}

export default function HeroText() {
    const [hovered, setHovered] = useState(false);

    // Keep the width explicit. Every layer is absolutely positioned, so this box
    // has no in-flow content of its own - a percentage or min() width would leave
    // its shrink-to-fit parent nothing to size against and collapse the artwork.
    return (
        <div
            className="relative w-[1000px] max-w-full aspect-[1000/378]"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {layers.map((layer) => (
                <HeroLayer key={layer.alt} layer={layer} boosted={hovered} />
            ))}
        </div>
    );
}
