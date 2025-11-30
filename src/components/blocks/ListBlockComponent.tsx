import React from 'react';
import { ListBlock } from '@/types/blocks';
import { useEditorOptional } from '@/contexts/EditorContext';

interface Props {
    block: ListBlock;
    isSelected: boolean;
    isEditing?: boolean;
}

export const ListBlockComponent: React.FC<Props> = ({ block, isSelected, isEditing = false }) => {
    const editor = useEditorOptional();

    const listStyles: React.CSSProperties = {
        ...(block.styles?.textColor && { color: block.styles.textColor }),
        ...(block.styles?.fontSize && { fontSize: block.styles.fontSize }),
        ...(block.styles?.fontWeight && { fontWeight: block.styles.fontWeight }),
        ...(block.styles?.fontFamily && { fontFamily: block.styles.fontFamily }),
        ...(block.styles?.padding && { padding: block.styles.padding }),
        ...(block.styles?.margin && { margin: block.styles.margin }),
    };

    const ListTag = block.listType === 'ordered' ? 'ol' : 'ul';

    return (
        <div
            className={ `p-4 rounded-lg transition-all ${isSelected ? 'ring-2 ring-primary bg-block-hover' : ''
                } ${isEditing ? 'cursor-text' : 'cursor-pointer'}` }
            style={ {
                ...(block.styles?.backgroundColor && { backgroundColor: block.styles.backgroundColor }),
                ...(block.styles?.borderRadius && { borderRadius: block.styles.borderRadius }),
            } }
        >
            <ListTag style={ listStyles } className="list-inside space-y-2">
                { block.items.map((item, index) => (
                    <li key={ index }>{ item || 'List item' }</li>
                )) }
                { block.items.length === 0 && <li>List item</li> }
            </ListTag>
        </div>
    );
};

