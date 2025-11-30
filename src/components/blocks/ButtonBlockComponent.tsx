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

  const blockStyles: React.CSSProperties = {
    ...(block.styles?.padding && { padding: block.styles.padding }),
    ...(block.styles?.margin && { margin: block.styles.margin }),
    ...(block.styles?.backgroundColor && { backgroundColor: block.styles.backgroundColor }),
    ...(block.styles?.borderRadius && { borderRadius: block.styles.borderRadius }),
  };

  const buttonStyles: React.CSSProperties = {
    ...(block.styles?.fontSize && { fontSize: block.styles.fontSize }),
    ...(block.styles?.fontWeight && { fontWeight: block.styles.fontWeight }),
    ...(block.styles?.fontFamily && { fontFamily: block.styles.fontFamily }),
    ...(block.styles?.borderRadius && { borderRadius: block.styles.borderRadius }),
    ...(block.styles?.boxShadow && { boxShadow: block.styles.boxShadow }),
  };

  return (
    <div
      className={ `p-4 rounded-lg transition-all ${isSelected ? 'ring-2 ring-primary bg-block-hover' : ''
        } cursor-pointer` }
      style={ blockStyles }
    >
      <div className={ `flex ${alignClass[block.align]}` }>
        <Button variant={ block.variant as any } asChild style={ buttonStyles }>
          <a href={ block.url || '#' } target={ block.url?.startsWith('http') ? '_blank' : undefined } rel={ block.url?.startsWith('http') ? 'noopener noreferrer' : undefined }>
            { block.text || 'Button' }
          </a>
        </Button>
      </div>
    </div>
  );
};
