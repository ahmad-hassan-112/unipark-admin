import React, { ReactNode } from 'react';

interface RenderIfProps {
  isTrue: boolean;
  children: ReactNode;
  fallback?: ReactNode;
}

const RenderIf: React.FC<RenderIfProps> = ({ isTrue, children, fallback = null }) => {
  return isTrue ? children : fallback;
};

export default RenderIf;
