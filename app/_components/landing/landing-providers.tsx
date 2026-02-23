"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

interface LandingProvidersProps {
  children: React.ReactNode;
}

export function LandingProviders({ children }: LandingProvidersProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
