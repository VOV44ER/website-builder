import React from 'react';
import { ButtonBlock } from '@/types/blocks';
import { Button } from '@/components/ui/button';

interface Props {
  block: ButtonBlock;
  isSelected: boolean;
}

export const ButtonBlockComponent: React.FC<Props> = ({ block, isSelected }) => {
  const alignClass = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  return (
    <div
      className={ `p-4 rounded-lg transition-all ${isSelected ? 'ring-2 ring-primary bg-block-hover' : ''
        } cursor-pointer` }
    >
      <div className={ `flex ${alignClass[block.align]}` }>
        <Button variant={ block.variant as any } asChild>
          <a href={ block.url || '#' } target={ block.url?.startsWith('http') ? '_blank' : undefined } rel={ block.url?.startsWith('http') ? 'noopener noreferrer' : undefined }>
            { block.text || 'Button' }
          </a>
        </Button>
      </div>
    </div>
  );
};
