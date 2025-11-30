import React from 'react';
import { ImageBlock } from '@/types/blocks';

interface Props {
  block: ImageBlock;
  isSelected: boolean;
}

export const ImageBlockComponent: React.FC<Props> = ({ block, isSelected }) => {
  const blockStyles: React.CSSProperties = {
    ...(block.styles?.padding && { padding: block.styles.padding }),
    ...(block.styles?.margin && { margin: block.styles.margin }),
    ...(block.styles?.backgroundColor && { backgroundColor: block.styles.backgroundColor }),
    ...(block.styles?.borderRadius && { borderRadius: block.styles.borderRadius }),
    ...(block.styles?.borderWidth && { borderWidth: block.styles.borderWidth }),
    ...(block.styles?.borderColor && { borderColor: block.styles.borderColor }),
    ...(block.styles?.borderStyle && { borderStyle: block.styles.borderStyle }),
    ...(block.styles?.boxShadow && { boxShadow: block.styles.boxShadow }),
  };

  const imageStyles: React.CSSProperties = {
    width: block.width,
    ...(block.styles?.borderRadius && { borderRadius: block.styles.borderRadius }),
  };

  return (
    <div
      className={ `p-4 rounded-lg transition-all ${isSelected ? 'ring-2 ring-primary bg-block-hover' : ''
        } cursor-pointer` }
      style={ blockStyles }
    >
      <img
        src={ block.url || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d' }
        alt={ block.alt }
        style={ imageStyles }
        className="rounded-md mx-auto"
      />
    </div>
  );
};
