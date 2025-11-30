import React from 'react';
import { ImageBlock } from '@/types/blocks';

interface Props {
  block: ImageBlock;
  isSelected: boolean;
}

export const ImageBlockComponent: React.FC<Props> = ({ block, isSelected }) => {
  return (
    <div 
      className={`p-4 rounded-lg transition-all ${
        isSelected ? 'ring-2 ring-primary bg-block-hover' : ''
      } cursor-pointer`}
    >
      <img 
        src={block.url || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d'} 
        alt={block.alt}
        style={{ width: block.width }}
        className="rounded-md mx-auto"
      />
    </div>
  );
};
