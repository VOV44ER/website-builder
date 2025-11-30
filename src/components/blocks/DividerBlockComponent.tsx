import React from 'react';
import { DividerBlock } from '@/types/blocks';

interface Props {
    block: DividerBlock;
    isSelected: boolean;
}

export const DividerBlockComponent: React.FC<Props> = ({ block, isSelected }) => {
    const borderStyle = block.style === 'dashed' ? 'dashed' : block.style === 'dotted' ? 'dotted' : 'solid';

    const dividerStyles: React.CSSProperties = {
        borderTopWidth: block.thickness,
        borderTopStyle: borderStyle,
        borderTopColor: block.color,
        ...(block.styles?.margin && { margin: block.styles.margin }),
    };

    return (
        <div
            className={ `rounded-lg transition-all ${isSelected ? 'ring-2 ring-primary bg-block-hover' : ''
                } cursor-pointer` }
            onClick={ (e) => e.stopPropagation() }
        >
            <hr style={ dividerStyles } className="border-0" />
        </div>
    );
};

