"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  once?: boolean;
}

export default function AnimateIn({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 28,
  duration = 0.55,
  once = true,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.15 });

  const initial = {
    opacity: 0,
    x:
      direction === "left"
        ? -distance
        : direction === "right"
        ? distance
        : 0,
    y: direction === "up" ? distance : direction === "down" ? -distance : 0,
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : initial}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Stagger container — wraps children with staggered delays */
export function StaggerIn({
  children,
  className,
  stagger = 0.1,
  delayStart = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayStart?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delayStart } },
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

/** Individual stagger child */
export function StaggerChild({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
