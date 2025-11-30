import React from 'react';
import { TextBlock } from '@/types/blocks';
import { useEditorOptional } from '@/contexts/EditorContext';

interface Props {
  block: TextBlock;
  isSelected: boolean;
  isEditing?: boolean;
}

export const TextBlockComponent: React.FC<Props> = ({ block, isSelected, isEditing = false }) => {
  const editor = useEditorOptional();

  const handleContentChange = (e: React.FocusEvent) => {
    if (!editor) return;
    const target = e.currentTarget as HTMLElement;
    editor.updateBlock(block.id, { content: target.textContent || '' });
  };

  const canEdit = isEditing && editor !== undefined;

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

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

  const textStyles: React.CSSProperties = {
    ...(block.styles?.textColor && { color: block.styles.textColor }),
    ...(block.styles?.fontSize && { fontSize: block.styles.fontSize }),
    ...(block.styles?.fontWeight && { fontWeight: block.styles.fontWeight }),
    ...(block.styles?.fontFamily && { fontFamily: block.styles.fontFamily }),
  };

  return (
    <div
      className={ `p-4 rounded-lg transition-all ${isSelected ? 'ring-2 ring-primary bg-block-hover' : ''
        } ${isEditing ? 'cursor-text' : 'cursor-pointer'}` }
      style={ blockStyles }
    >
      <p
        contentEditable={ canEdit }
        suppressContentEditableWarning
        onBlur={ handleContentChange }
        className={ `text-base ${alignClasses[block.align]} focus:outline-none text-foreground` }
        style={ textStyles }
      >
        { block.content || 'Text content' }
      </p>
    </div>
  );
};

