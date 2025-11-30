import React from 'react';
import { Type, AlignLeft, Image, MousePointerClick } from 'lucide-react';
import { useEditor } from '@/contexts/EditorContext';
import { Block } from '@/types/blocks';

const blockTemplates = [
  {
    type: 'heading' as const,
    icon: Type,
    label: 'Heading',
    create: (): Block => ({
      id: Date.now().toString(),
      type: 'heading',
      content: 'New Heading',
      level: 1,
      align: 'left',
      position: 0,
    }),
  },
  {
    type: 'text' as const,
    icon: AlignLeft,
    label: 'Text',
    create: (): Block => ({
      id: Date.now().toString(),
      type: 'text',
      content: 'New text block',
      align: 'left',
      position: 0,
    }),
  },
  {
    type: 'image' as const,
    icon: Image,
    label: 'Image',
    create: (): Block => ({
      id: Date.now().toString(),
      type: 'image',
      url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      alt: 'Image',
      width: '100%',
      position: 0,
    }),
  },
  {
    type: 'button' as const,
    icon: MousePointerClick,
    label: 'Button',
    create: (): Block => ({
      id: Date.now().toString(),
      type: 'button',
      text: 'Click me',
      url: '#',
      variant: 'primary',
      align: 'center',
      position: 0,
    }),
  },
];

export const BlocksPalette: React.FC = () => {
  const { addBlock, currentPage } = useEditor();

  const handleAddBlock = (template: typeof blockTemplates[0]) => {
    if (!currentPage) return;
    const newBlock = template.create();
    addBlock(newBlock);
  };

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 text-sidebar-foreground">Blocks</h2>
      <div className="space-y-2">
        {blockTemplates.map((template) => (
          <button
            key={template.type}
            onClick={() => handleAddBlock(template)}
            disabled={!currentPage}
            className="w-full flex items-center gap-3 p-3 rounded-lg border border-sidebar-border hover:bg-primary hover:text-primary-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <template.icon className="w-5 h-5" />
            <span className="font-medium">{template.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
