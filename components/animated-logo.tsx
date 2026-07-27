"use client";

import { animate, motion, useMotionValue, type AnimationPlaybackControls } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { logoStatic } from "@/public";

/*
 * The "O" of OFF is an eye. Its iris is a single path in logo.svg holding two
 * subpaths - the white disc, and the pupil punched through it as a hole - so
 * moving that one path moves the pupil with it.
 *
 * logo-static.svg is the same artwork with that path removed. It renders as a
 * plain <Image> (the file is ~190kb, almost all of it a base64 raster, so it is
 * not worth inlining) and only the iris is inlined as SVG on top. Both use the
 * same viewBox and fill the same box, so they letterbox identically and line up
 * without any manual offset.
 */
const VIEW_BOX = "0 0 646.62 433.84";

const IRIS =
    "M164.75,121.99c24.64-1.61,43.3-22.89,41.69-47.53s-22.89-43.3-47.53-41.69-43.3,22.89-41.69,47.53c1.61,24.64,22.89,43.3,47.53,41.69Z" +
    "M175.74,85.52c4.9-.32,9.14,3.39,9.46,8.3s-3.39,9.14-8.3,9.46c-4.9.32-9.14-3.39-9.46-8.3s3.39-9.14,8.3-9.46Z";

// The iris (r 44.6) is taller than the eye opening (an ellipse at cx 134.9,
// rx 88.7, ry 43.3), so it is always tangent to the rim top and bottom and only
// has room to slide sideways. Pushed much past the mirror point it runs into the
// narrowing end of the ellipse and visually fuses with the white rim, so the
// travel is exactly that: the artwork's own position (26.9 right of the opening's
// centre) and its mirror 26.9 to the left.
const LOOK_RIGHT = 0;
const LOOK_LEFT = -53.8;

const GLIDE = 0.8;
// seconds the eye rests before each glide, rolled fresh every time
const DWELL_MIN = 1;
const DWELL_MAX = 5;
// while hovered the roll is skipped and every rest is this long
const HOVER_DWELL = 0.5;

const nextDwell = (hovered: boolean) =>
    (hovered ? HOVER_DWELL : DWELL_MIN + Math.random() * (DWELL_MAX - DWELL_MIN)) * 1000;

export default function AnimatedLogo({ className = "" }: { className?: string }) {
    const x = useMotionValue(LOOK_LEFT);
    // a ref, not state: the loop below must read the live value without the
    // effect re-running and restarting the animation on every hover
    const hovered = useRef(false);
    // lets pointerenter cut a rest short instead of waiting out a 5s roll
    const wake = useRef<(() => void) | null>(null);

    // Driven imperatively rather than by a repeating keyframe: a keyframe cycle
    // bakes its timing into `times` and replays it identically, so the dwell
    // cannot change from one side to the next.
    useEffect(() => {
        let cancelled = false;
        let timer: ReturnType<typeof setTimeout>;
        let glide: AnimationPlaybackControls | undefined;

        const rest = () =>
            new Promise<void>((resolve) => {
                const done = () => {
                    clearTimeout(timer);
                    wake.current = null;
                    resolve();
                };
                timer = setTimeout(done, nextDwell(hovered.current));
                wake.current = done;
            });

        void (async () => {
            let target = LOOK_RIGHT;
            while (!cancelled) {
                await rest();
                if (cancelled) return;
                glide = animate(x, target, { duration: GLIDE, ease: "easeInOut" });
                await glide;
                if (cancelled) return;
                target = target === LOOK_RIGHT ? LOOK_LEFT : LOOK_RIGHT;
            }
        })();

        return () => {
            cancelled = true;
            clearTimeout(timer);
            wake.current = null;
            glide?.stop();
        };
    }, [x]);

    return (
        <span
            className={`relative block ${className}`}
            onPointerEnter={() => {
                hovered.current = true;
                // shorten a rest already in progress so hover reacts immediately
                wake.current?.();
            }}
            onPointerLeave={() => {
                hovered.current = false;
            }}
        >
            <Image
                src={logoStatic}
                alt="Off The Grid"
                width={180}
                height={180}
                className="block h-auto w-full"
            />

            <svg
                viewBox={VIEW_BOX}
                className="pointer-events-none absolute inset-0 h-full w-full"
                aria-hidden="true"
            >
                <motion.path d={IRIS} fill="#ffffff" style={{ x }} />
            </svg>
        </span>
    );
}
