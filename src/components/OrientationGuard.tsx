'use client';

import React from 'react';

// OrientationGuard: Device portrait mode experience enabled natively without auto-rotate screen popups.
export default function OrientationGuard({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
