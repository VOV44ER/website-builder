import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { ContainerBlock, Block } from '@/types/blocks';
import { HeadingBlockComponent } from './HeadingBlockComponent';
import { TextBlockComponent } from './TextBlockComponent';
import { ImageBlockComponent } from './ImageBlockComponent';
import { ButtonBlockComponent } from './ButtonBlockComponent';
import { VideoBlockComponent } from './VideoBlockComponent';
import { DividerBlockComponent } from './DividerBlockComponent';
import { ListBlockComponent } from './ListBlockComponent';
import { CardBlockComponent } from './CardBlockComponent';
import { SpacerBlockComponent } from './SpacerBlockComponent';
import { GripVertical, Trash2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEditorOptional } from '@/contexts/EditorContext';

interface Props {
    block: ContainerBlock;
    isSelected: boolean;
    selectedBlockId?: string | null;
    onBlockSelect?: (id: string) => void;
}

const renderBlock = (block: Block, isSelected: boolean, isEditing: boolean) => {
    switch (block.type) {
        case 'heading':
            return <HeadingBlockComponent block={ block } isSelected={ isSelected } isEditing={ isEditing } />;
        case 'text':
            return <TextBlockComponent block={ block } isSelected={ isSelected } isEditing={ isEditing } />;
        case 'image':
            return <ImageBlockComponent block={ block } isSelected={ isSelected } />;
        case 'button':
            return <ButtonBlockComponent block={ block } isSelected={ isSelected } />;
        case 'video':
            return <VideoBlockComponent block={ block } isSelected={ isSelected } />;
        case 'divider':
            return <DividerBlockComponent block={ block } isSelected={ isSelected } />;
        case 'list':
            return <ListBlockComponent block={ block } isSelected={ isSelected } />;
        case 'card':
            return <CardBlockComponent block={ block } isSelected={ isSelected } />;
        case 'spacer':
            return <SpacerBlockComponent block={ block } isSelected={ isSelected } />;
        default:
            return null;
    }
};

export const ContainerBlockComponent: React.FC<Props> = ({ block, isSelected, selectedBlockId, onBlockSelect }) => {
    const editor = useEditorOptional();
    const isHorizontal = block.layout === 'horizontal';
    const layoutClass = isHorizontal
        ? 'flex flex-col sm:flex-row flex-wrap'
        : 'flex flex-col';
    const gap = block.gap || '1rem';
    const isEditable = !!editor;

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination || !editor) return;
        editor.reorderBlocksInContainer(block.id, result.source.index, result.destination.index);
    };

    const handleDeleteBlock = (blockId: string, e: React.MouseEvent) => {
        if (!editor) return;
        e.stopPropagation();
        editor.deleteBlockFromContainer(block.id, blockId);
    };

    const handleDuplicateBlock = (childBlock: Block, e: React.MouseEvent) => {
        if (!editor) return;
        e.stopPropagation();
        const duplicatedBlock: Block = {
            ...childBlock,
            id: Date.now().toString(),
        };
        const currentBlocks = block.blocks;
        const blockIndex = currentBlocks.findIndex(b => b.id === childBlock.id);
        const newBlocks = [...currentBlocks];
        newBlocks.splice(blockIndex + 1, 0, duplicatedBlock);
        editor.updateBlock(block.id, {
            blocks: newBlocks,
        } as Partial<ContainerBlock>);
    };

    const containerStyles: React.CSSProperties = {
        ...(block.styles?.padding && { padding: block.styles.padding }),
        ...(block.styles?.margin && { margin: block.styles.margin }),
        ...(block.styles?.backgroundColor && { backgroundColor: block.styles.backgroundColor }),
        ...(block.styles?.borderRadius && { borderRadius: block.styles.borderRadius }),
        ...(block.styles?.borderWidth && { borderWidth: block.styles.borderWidth }),
        ...(block.styles?.borderColor && { borderColor: block.styles.borderColor }),
        ...(block.styles?.borderStyle && { borderStyle: block.styles.borderStyle }),
        ...(block.styles?.boxShadow && { boxShadow: block.styles.boxShadow }),
    };

    const renderBlockItem = (childBlock: Block, index: number, provided?: any, snapshot?: any) => {
        const blockElement = (
            <div className="relative group w-full">
                { isEditable && provided && (
                    <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 z-10">
                        <div
                            { ...provided.dragHandleProps }
                            className="h-7 w-7 flex items-center justify-center rounded-md border border-input bg-background hover:bg-muted cursor-grab active:cursor-grabbing transition-colors"
                        >
                            <GripVertical className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <Button
                            size="sm"
                            variant="outline"
                            className="h-7 w-7 p-0"
                            onClick={ (e) => handleDuplicateBlock(childBlock, e) }
                        >
                            <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            className="h-7 w-7 p-0"
                            onClick={ (e) => handleDeleteBlock(childBlock.id, e) }
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                ) }
                <div
                    onClick={ (e) => {
                        if ((e.target as HTMLElement).closest('button')) return;
                        e.stopPropagation();
                        onBlockSelect?.(childBlock.id);
                    } }
                >
                    { renderBlock(childBlock, selectedBlockId === childBlock.id, isEditable && selectedBlockId === childBlock.id) }
                </div>
            </div>
        );

        if (isEditable && provided) {
            return (
                <div
                    ref={ provided.innerRef }
                    { ...provided.draggableProps }
                    className={ `w-full ${snapshot?.isDragging ? 'opacity-50' : ''}` }
                >
                    { blockElement }
                </div>
            );
        }

        return blockElement;
    };

    if (block.blocks.length === 0) {
        return (
            <div
                className={ `rounded-lg transition-all ${isSelected ? 'ring-2 ring-primary bg-block-hover' : ''}` }
                style={ containerStyles }
            >
                <div className={ `${layoutClass} min-h-[100px]` } style={ { gap } }>
                    <div className="text-center py-8 text-muted-foreground text-sm w-full">
                        { isEditable ? 'Container is empty. Add blocks from the palette.' : '' }
                    </div>
                </div>
            </div>
        );
    }

    const content = (
        <div
            className={ `${layoutClass} min-h-[100px]` }
            style={ { gap } }
        >
            { block.blocks.map((childBlock, index) => {
                if (isEditable) {
                    return (
                        <Draggable key={ childBlock.id } draggableId={ childBlock.id } index={ index }>
                            { (provided, snapshot) => (
                                <div key={ childBlock.id }>
                                    { renderBlockItem(childBlock, index, provided, snapshot) }
                                </div>
                            ) }
                        </Draggable>
                    );
                }
                return (
                    <div key={ childBlock.id }>
                        { renderBlockItem(childBlock, index) }
                    </div>
                );
            }) }
        </div>
    );

    if (isEditable) {
        return (
            <div
                className={ `rounded-lg transition-all ${isSelected ? 'ring-2 ring-primary bg-block-hover' : ''
                    } cursor-pointer` }
                style={ containerStyles }
                onClick={ (e) => {
                    e.stopPropagation();
                    onBlockSelect?.(block.id);
                } }
            >
                <DragDropContext onDragEnd={ handleDragEnd }>
                    <Droppable droppableId={ `container-${block.id}` } direction={ block.layout === 'horizontal' ? 'horizontal' : 'vertical' }>
                        { (provided) => (
                            <div
                                { ...provided.droppableProps }
                                ref={ provided.innerRef }
                                className={ `${layoutClass} min-h-[100px]` }
                                style={ { gap } }
                            >
                                { block.blocks.map((childBlock, index) => (
                                    <Draggable key={ childBlock.id } draggableId={ childBlock.id } index={ index }>
                                        { (provided, snapshot) => renderBlockItem(childBlock, index, provided, snapshot) }
                                    </Draggable>
                                )) }
                                { provided.placeholder }
                            </div>
                        ) }
                    </Droppable>
                </DragDropContext>
            </div>
        );
    }

    return (
        <div
            className={ `rounded-lg transition-all` }
            style={ containerStyles }
        >
            { content }
        </div>
    );
};
