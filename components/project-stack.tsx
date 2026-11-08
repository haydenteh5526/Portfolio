"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

// Keep the sticky items in one containing block so the entire pile leaves together.
export function ProjectStack({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll();
  return (
    <div className="project-stack-list">
      {Children.map(children, (child, index) => (
        <StackItem index={index} scrollY={scrollY}>
          {child}
        </StackItem>
      ))}
    </div>
  );
}

function StackItem({
  children,
  index,
  scrollY,
}: {
  children: ReactNode;
  index: number;
  scrollY: MotionValue<number>;
}) {
  const item = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const start = useMotionValue(0);
  const stride = useMotionValue(469);
  const limit = useMotionValue(0);
  const scale = useTransform(() => {
    const progress = Math.max(0, (scrollY.get() - start.get()) / stride.get());
    return 1 - Math.min(limit.get(), progress * 0.05);
  });

  useEffect(() => {
    const element = item.current;
    const list = element?.parentElement;
    if (!element || !list) return;
    const measure = () => {
      const siblings = Array.from(list.children) as HTMLElement[];
      const gap = parseFloat(getComputedStyle(list).rowGap) || 0;
      const preceding = siblings
        .slice(0, index)
        .reduce((sum, el) => sum + el.offsetHeight + gap, 0);
      // Measure normal flow, not the sticky element's moving viewport position.
      const naturalTop =
        list.getBoundingClientRect().top + window.scrollY + preceding;
      start.set(naturalTop + element.offsetHeight / 2);
      stride.set(element.offsetHeight + gap);
      limit.set((siblings.length - index - 1) * 0.05);
      element.dataset.scrollTop = String(naturalTop);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    Array.from(list.children).forEach((child) => observer.observe(child));
    window.addEventListener("resize", measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [index, start, stride, limit]);

  return (
    <m.div
      ref={item}
      className="project-stack-item"
      style={{
        top: [100, 130, 170, 210][Math.min(index, 3)],
        scale: reduceMotion ? 1 : scale,
      }}
      onFocusCapture={(event) => {
        // Keyboard navigation must reveal a card even when later cards cover it.
        if (
          event.target.matches(":focus-visible") &&
          getComputedStyle(event.currentTarget).position === "sticky"
        ) {
          window.scrollTo({
            top: Number(event.currentTarget.dataset.scrollTop) - 120,
            behavior: "instant",
          });
        }
      }}
    >
      {children}
    </m.div>
  );
}
