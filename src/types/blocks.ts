export type BlockType = 'heading' | 'text' | 'image' | 'button' | 'container' | 'video' | 'divider' | 'list' | 'card' | 'spacer';

export interface BlockStyles {
  backgroundColor?: string;
  textColor?: string;
  fontSize?: string;
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  fontFamily?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  borderWidth?: string;
  borderColor?: string;
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none';
  boxShadow?: string;
}

export interface BaseBlock {
  id: string;
  type: BlockType;
  position: number;
  styles?: BlockStyles;
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

export interface ContainerBlock extends BaseBlock {
  type: 'container';
  blocks: Block[];
  layout: 'vertical' | 'horizontal';
  gap?: string;
}

export interface VideoBlock extends BaseBlock {
  type: 'video';
  url: string;
  width: string;
  autoplay: boolean;
  controls: boolean;
  loop: boolean;
}

export interface DividerBlock extends BaseBlock {
  type: 'divider';
  style: 'solid' | 'dashed' | 'dotted';
  thickness: string;
  color: string;
}

export interface ListBlock extends BaseBlock {
  type: 'list';
  items: string[];
  listType: 'unordered' | 'ordered';
}

export interface CardBlock extends BaseBlock {
  type: 'card';
  title: string;
  content: string;
  imageUrl?: string;
  buttonText?: string;
  buttonUrl?: string;
}

export interface SpacerBlock extends BaseBlock {
  type: 'spacer';
  height: string;
}

export type Block = HeadingBlock | TextBlock | ImageBlock | ButtonBlock | ContainerBlock | VideoBlock | DividerBlock | ListBlock | CardBlock | SpacerBlock;

export interface Page {
  id: string;
  title: string;
  slug: string;
  blocks: Block[];
  createdAt: string;
  updatedAt: string;
}
