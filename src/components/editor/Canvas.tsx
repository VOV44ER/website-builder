import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useEditor } from '@/contexts/EditorContext';
import { HeadingBlockComponent } from '@/components/blocks/HeadingBlockComponent';
import { TextBlockComponent } from '@/components/blocks/TextBlockComponent';
import { ImageBlockComponent } from '@/components/blocks/ImageBlockComponent';
import { ButtonBlockComponent } from '@/components/blocks/ButtonBlockComponent';
import { ContainerBlockComponent } from '@/components/blocks/ContainerBlockComponent';
import { VideoBlockComponent } from '@/components/blocks/VideoBlockComponent';
import { DividerBlockComponent } from '@/components/blocks/DividerBlockComponent';
import { ListBlockComponent } from '@/components/blocks/ListBlockComponent';
import { CardBlockComponent } from '@/components/blocks/CardBlockComponent';
import { SpacerBlockComponent } from '@/components/blocks/SpacerBlockComponent';
import { Block } from '@/types/blocks';
import { GripVertical, Trash2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Canvas: React.FC = () => {
  const { currentPage, selectedBlockId, setSelectedBlockId, reorderBlocks, deleteBlock, duplicateBlock } = useEditor();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    reorderBlocks(result.source.index, result.destination.index);
  };

  const renderBlock = (block: Block, isSelected: boolean) => {
    switch (block.type) {
      case 'heading':
        return <HeadingBlockComponent block={ block } isSelected={ isSelected } isEditing={ isSelected } />;
      case 'text':
        return <TextBlockComponent block={ block } isSelected={ isSelected } isEditing={ isSelected } />;
      case 'image':
        return <ImageBlockComponent block={ block } isSelected={ isSelected } />;
      case 'button':
        return <ButtonBlockComponent block={ block } isSelected={ isSelected } />;
      case 'container':
        return <ContainerBlockComponent block={ block } isSelected={ isSelected } selectedBlockId={ selectedBlockId } onBlockSelect={ setSelectedBlockId } />;
      case 'video':
        return <VideoBlockComponent block={ block } isSelected={ isSelected } />;
      case 'divider':
        return <DividerBlockComponent block={ block } isSelected={ isSelected } />;
      case 'list':
        return <ListBlockComponent block={ block } isSelected={ isSelected } isEditing={ isSelected } />;
      case 'card':
        return <CardBlockComponent block={ block } isSelected={ isSelected } />;
      case 'spacer':
        return <SpacerBlockComponent block={ block } isSelected={ isSelected } />;
    }
  };

  if (!currentPage) {
    return (
      <div className="flex-1 bg-canvas-bg flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-muted-foreground mb-2">No page selected</h3>
          <p className="text-sm text-muted-foreground">Create or select a page to start editing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-canvas-bg p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto bg-background rounded-lg shadow-lg min-h-[600px] p-8">
        <h1 className="text-3xl font-bold mb-6 text-foreground">{ currentPage.title }</h1>

        <DragDropContext onDragEnd={ handleDragEnd }>
          <Droppable droppableId="canvas">
            { (provided) => (
              <div
                { ...provided.droppableProps }
                ref={ provided.innerRef }
                className="space-y-4"
              >
                { currentPage.blocks.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No blocks yet. Add some from the palette on the left!</p>
                  </div>
                ) : (
                  currentPage.blocks.map((block, index) => (
                    <Draggable key={ block.id } draggableId={ block.id } index={ index }>
                      { (provided, snapshot) => (
                        <div
                          ref={ provided.innerRef }
                          { ...provided.draggableProps }
                          className={ `relative group ${snapshot.isDragging ? 'opacity-50' : ''}` }
                          onClick={ (e) => {
                            if ((e.target as HTMLElement).closest('button')) return;
                            setSelectedBlockId(block.id);
                          } }
                        >
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
                              onClick={ (e) => {
                                e.stopPropagation();
                                duplicateBlock(block.id);
                              } }
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="h-7 w-7 p-0"
                              onClick={ (e) => {
                                e.stopPropagation();
                                deleteBlock(block.id);
                              } }
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          { renderBlock(block, selectedBlockId === block.id) }
                        </div>
                      ) }
                    </Draggable>
                  ))
                ) }
                { provided.placeholder }
              </div>
            ) }
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};
