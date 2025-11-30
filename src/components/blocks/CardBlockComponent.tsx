import React from 'react';
import { CardBlock } from '@/types/blocks';
import { Button } from '@/components/ui/button';

interface Props {
    block: CardBlock;
    isSelected: boolean;
}

export const CardBlockComponent: React.FC<Props> = ({ block, isSelected }) => {
    const cardStyles: React.CSSProperties = {
        ...(block.styles?.backgroundColor && { backgroundColor: block.styles.backgroundColor }),
        ...(block.styles?.borderRadius && { borderRadius: block.styles.borderRadius }),
        ...(block.styles?.borderWidth && { borderWidth: block.styles.borderWidth }),
        ...(block.styles?.borderColor && { borderColor: block.styles.borderColor }),
        ...(block.styles?.borderStyle && { borderStyle: block.styles.borderStyle }),
        ...(block.styles?.boxShadow && { boxShadow: block.styles.boxShadow }),
        ...(block.styles?.padding && { padding: block.styles.padding }),
        ...(block.styles?.margin && { margin: block.styles.margin }),
    };

    const textStyles: React.CSSProperties = {
        ...(block.styles?.textColor && { color: block.styles.textColor }),
        ...(block.styles?.fontSize && { fontSize: block.styles.fontSize }),
        ...(block.styles?.fontWeight && { fontWeight: block.styles.fontWeight }),
        ...(block.styles?.fontFamily && { fontFamily: block.styles.fontFamily }),
    };

    return (
        <div
            className={ `rounded-lg transition-all border ${isSelected ? 'ring-2 ring-primary bg-block-hover' : 'border-border'
                } cursor-pointer overflow-hidden w-full` }
            style={ cardStyles }
        >
            { block.imageUrl && (
                <img
                    src={ block.imageUrl }
                    alt={ block.title }
                    className="w-full h-48 md:h-56 object-cover"
                />
            ) }
            <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2" style={ textStyles }>
                    { block.title || 'Card Title' }
                </h3>
                <p className="text-sm md:text-base text-muted-foreground mb-4" style={ textStyles }>
                    { block.content || 'Card content' }
                </p>
                { block.buttonText && block.buttonUrl && (
                    <Button variant="outline" asChild className="w-full md:w-auto">
                        <a href={ block.buttonUrl } target="_blank" rel="noopener noreferrer">
                            { block.buttonText }
                        </a>
                    </Button>
                ) }
            </div>
        </div>
    );
};

