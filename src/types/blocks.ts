export type BlockType = 'heading' | 'text' | 'image' | 'button';

export interface BaseBlock {
  id: string;
  type: BlockType;
  position: number;
}

export interface HeadingBlock extends BaseBlock {
  type: 'heading';
  content: string;
  level: 1 | 2 | 3;
  align: 'left' | 'center' | 'right';
}

export interface TextBlock extends BaseBlock {
  type: 'text';
  content: string;
  align: 'left' | 'center' | 'right';
}

export interface ImageBlock extends BaseBlock {
  type: 'image';
  url: string;
  alt: string;
  width: string;
}

export interface ButtonBlock extends BaseBlock {
  type: 'button';
  text: string;
  url: string;
  variant: 'primary' | 'secondary' | 'outline';
  align: 'left' | 'center' | 'right';
}

export type Block = HeadingBlock | TextBlock | ImageBlock | ButtonBlock;

export interface Page {
  id: string;
  title: string;
  slug: string;
  blocks: Block[];
  createdAt: string;
  updatedAt: string;
}
