import type { ConditionalProps } from './types';
import React from 'react';
import type { FCWithChildren } from '../../types';

const Conditional: FCWithChildren<ConditionalProps> = ({ children, value }) => {
  if (!value) {
    return null;
  }

  return <>{children}</>;
};

export default Conditional;
