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
//
// Below 1261px it rearranges into the taller 612x443 canvas of
// public/hero-text-mobile.svg, which stacks the same eight pieces into three
// lines (FUTURE / OF DESIGN / IN BENGAL) instead of one wide one. Seven of them
// are pure translations of the desktop art; purple is also rotated -4.05deg and
// scaled 1.027, and only the scale is carried over here - it spins continuously,
// so a fixed base rotation would just offset the phase of something already
// turning. Both arrangements ship as CSS custom properties and a media query
// picks between them, so there is one DOM and one set of running animations
// rather than two, and nothing depends on measuring the viewport in JS (which
// would render the desktop layout on the server and visibly snap on hydration).
const CANVAS = {
    desktop: { w: 1000, h: 378 },
    mobile: { w: 612, h: 443 },
};

// How much faster the bursts spin while the artwork is hovered.
const HOVER_BOOST = 4;
// Per-frame easing towards the target speed, so the boost ramps instead of snapping.
const SPEED_EASING = 0.06;

/** placement within one of the two canvases */
type Box = { x: number; y: number; w: number; h: number };

type Layer = {
    src: StaticImageData;
    alt: string;
    desktop: Box;
    mobile: Box;
    drift: number;
    delay: number;
    /** degrees per second, continuous. positive = clockwise. bursts only. */
    spin?: number;
    /** degrees of to-and-fro sway, for the pieces that are not bursts. */
    wobble?: number;
};

// Back to front, matching the paint order of the source artwork.
// The purple burst on the right and the orange one behind "OF" turn clockwise;
// the pink burst on the left turns anticlockwise. Only the boxes differ between
// the two arrangements - spin, drift, wobble and delay belong to the piece.
const layers: Layer[] = [
    { src: heroelement7, alt: "purple burst", desktop: { x: 694, y: 76, w: 297, h: 292 }, mobile: { x: 297, y: 131, w: 305, h: 300 }, spin: 12, drift: 10, delay: 0 },
    { src: heroelement1, alt: "bengal", desktop: { x: 588, y: 178, w: 272, h: 132 }, mobile: { x: 180, y: 265, w: 272, h: 132 }, drift: 6, delay: 0.35 },
    { src: heroelement6, alt: "pink burst", desktop: { x: 5, y: 0, w: 208, h: 211 }, mobile: { x: 5, y: 0, w: 208, h: 211 }, spin: -12, drift: 12, delay: 0.05 },
    { src: heroelement4, alt: "future", desktop: { x: 65, y: 66, w: 377, h: 96 }, mobile: { x: 86, y: 76, w: 377, h: 96 }, drift: 6, delay: 0.15 },
    { src: heroelement3, alt: "of design", desktop: { x: 261, y: 124, w: 316, h: 160 }, mobile: { x: 199, y: 129, w: 316, h: 160 }, drift: 6, delay: 0.25 },
    // the burst turns under the "OF" letters, which stay upright on top of it
    { src: heroelement5, alt: "orange burst", desktop: { x: 144, y: 144, w: 121, h: 148 }, mobile: { x: 93, y: 146, w: 121, h: 148 }, spin: 14, drift: 8, delay: 0.1 },
    { src: heroelement8, alt: "of", desktop: { x: 168, y: 173, w: 72, h: 103 }, mobile: { x: 118, y: 179, w: 72, h: 103 }, drift: 8, delay: 0.1 },
    { src: heroelement2, alt: "in", desktop: { x: 544, y: 76, w: 124, h: 108 }, mobile: { x: 76, y: 265, w: 124, h: 108 }, wobble: -8, drift: 9, delay: 0.3 },
];

const pct = (value: number, of: number) => `${(value / of) * 100}%`;

/* Both boxes as percentages of their own canvas. .hero-art-layer in globals.css
   reads the -d set by default and swaps to the -m set below 1261px. */
const boxVars = (layer: Layer) =>
    ({
        "--lx-d": pct(layer.desktop.x, CANVAS.desktop.w),
        "--ly-d": pct(layer.desktop.y, CANVAS.desktop.h),
        "--lw-d": pct(layer.desktop.w, CANVAS.desktop.w),
        "--lh-d": pct(layer.desktop.h, CANVAS.desktop.h),
        "--lx-m": pct(layer.mobile.x, CANVAS.mobile.w),
        "--ly-m": pct(layer.mobile.y, CANVAS.mobile.h),
        "--lw-m": pct(layer.mobile.w, CANVAS.mobile.w),
        "--lh-m": pct(layer.mobile.h, CANVAS.mobile.h),
    }) as React.CSSProperties;

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
            className="hero-art-layer"
            style={boxVars(layer)}
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

    // Sizing lives in .hero-art: the canvas width times --u keeps the artwork at
    // its original size on the reference viewport and shrinks it in step with
    // everything else, capped by the width left inside hero-sec's padding so
    // narrow screens cannot overflow. Both terms are viewport-derived on purpose:
    // every layer here is absolutely positioned, so a percentage width would
    // leave this box's shrink-to-fit parent nothing to measure and the artwork
    // would collapse to zero.
    return (
        <div
            className="hero-art"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {layers.map((layer) => (
                <HeroLayer key={layer.alt} layer={layer} boosted={hovered} />
            ))}
        </div>
    );
}
