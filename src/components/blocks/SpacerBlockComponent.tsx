import React from 'react';
import { SpacerBlock } from '@/types/blocks';

interface Props {
    block: SpacerBlock;
    isSelected: boolean;
}

export const SpacerBlockComponent: React.FC<Props> = ({ block, isSelected }) => {
    return (
        <div
            className={ `rounded-lg transition-all ${isSelected ? 'ring-2 ring-primary bg-block-hover' : ''
                } cursor-pointer` }
            style={ {
                height: block.height,
                minHeight: block.height,
                ...(block.styles?.backgroundColor && { backgroundColor: block.styles.backgroundColor }),
            } }
            onClick={ (e) => e.stopPropagation() }
        >
            { isSelected && (
                <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
                    Spacer ({ block.height })
                </div>
            ) }
        </div>
    );
};

