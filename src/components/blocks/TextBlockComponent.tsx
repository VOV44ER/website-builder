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

  return (
    <div
      className={ `p-4 rounded-lg transition-all ${isSelected ? 'ring-2 ring-primary bg-block-hover' : ''
        } ${isEditing ? 'cursor-text' : 'cursor-pointer'}` }
    >
      <p
        contentEditable={ canEdit }
        suppressContentEditableWarning
        onBlur={ handleContentChange }
        className={ `text-base ${alignClasses[block.align]} focus:outline-none text-foreground` }
      >
        { block.content || 'Text content' }
      </p>
    </div>
  );
};

