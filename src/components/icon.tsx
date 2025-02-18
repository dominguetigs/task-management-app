import { createElement } from 'react';

import { ICON_MAP } from '@/constants';
import { IconNames } from '@/types';

interface IconProps {
  name: IconNames | undefined;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 24, className = '' }: IconProps) {
  if (!name) {
    return null;
  }

  const IconElement = ICON_MAP[name];

  if (!IconElement) {
    return null;
  }

  return createElement(IconElement, { size, className });
}
