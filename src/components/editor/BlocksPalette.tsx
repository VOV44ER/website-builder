import React from 'react';
import { Type, AlignLeft, Image, MousePointerClick, Box, Video, Minus, List, CreditCard, Space } from 'lucide-react';
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
  {
    type: 'container' as const,
    icon: Box,
    label: 'Container',
    create: (): Block => ({
      id: Date.now().toString(),
      type: 'container',
      blocks: [],
      layout: 'vertical',
      gap: '1rem',
      position: 0,
    }),
  },
  {
    type: 'video' as const,
    icon: Video,
    label: 'Video',
    create: (): Block => ({
      id: Date.now().toString(),
      type: 'video',
      url: '',
      width: '100%',
      autoplay: false,
      controls: true,
      loop: false,
      position: 0,
    }),
  },
  {
    type: 'divider' as const,
    icon: Minus,
    label: 'Divider',
    create: (): Block => ({
      id: Date.now().toString(),
      type: 'divider',
      style: 'solid',
      thickness: '1px',
      color: '#e5e7eb',
      position: 0,
    }),
  },
  {
    type: 'list' as const,
    icon: List,
    label: 'List',
    create: (): Block => ({
      id: Date.now().toString(),
      type: 'list',
      items: ['Item 1', 'Item 2', 'Item 3'],
      listType: 'unordered',
      position: 0,
    }),
  },
  {
    type: 'card' as const,
    icon: CreditCard,
    label: 'Card',
    create: (): Block => ({
      id: Date.now().toString(),
      type: 'card',
      title: 'Card Title',
      content: 'Card content goes here',
      position: 0,
    }),
  },
  {
    type: 'spacer' as const,
    icon: Space,
    label: 'Spacer',
    create: (): Block => ({
      id: Date.now().toString(),
      type: 'spacer',
      height: '2rem',
      position: 0,
    }),
  },
];

export const BlocksPalette: React.FC = () => {
  const { addBlock, currentPage, selectedBlockId, getSelectedBlock } = useEditor();
  const selectedBlock = getSelectedBlock();
  const isContainerSelected = selectedBlock?.type === 'container';

  const handleAddBlock = (template: typeof blockTemplates[0]) => {
    if (!currentPage) return;
    const newBlock = template.create();
    addBlock(newBlock);
  };

  return (
    <div className="w-56 bg-sidebar border-r border-sidebar-border p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 text-sidebar-foreground">Blocks</h2>
      { isContainerSelected && (
        <div className="mb-4 p-2 bg-primary/10 border border-primary/20 rounded-md text-xs text-primary">
          Container selected. Blocks will be added to the container.
        </div>
      ) }
      <div className="space-y-2">
        { blockTemplates.map((template) => (
          <button
            key={ template.type }
            onClick={ () => handleAddBlock(template) }
            disabled={ !currentPage }
            className="w-full flex items-center gap-3 p-3 rounded-lg border border-sidebar-border hover:bg-primary hover:text-primary-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <template.icon className="w-5 h-5" />
            <span className="font-medium">{ template.label }</span>
          </button>
        )) }
      </div>
    </div>
  );
};
