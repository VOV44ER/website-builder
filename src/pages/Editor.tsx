import React from 'react';
import { EditorProvider } from '@/contexts/EditorContext';
import { EditorHeader } from '@/components/editor/EditorHeader';
import { BlocksPalette } from '@/components/editor/BlocksPalette';
import { Canvas } from '@/components/editor/Canvas';
import { PagesList } from '@/components/editor/PagesList';
import { PropertiesPanel } from '@/components/editor/PropertiesPanel';

const Editor = () => {
  return (
    <EditorProvider>
      <div className="h-screen flex flex-col overflow-hidden">
        <EditorHeader />
        <div className="flex-1 flex overflow-hidden">
          <BlocksPalette />
          <Canvas />
          <PropertiesPanel />
          <PagesList />
        </div>
      </div>
    </EditorProvider>
  );
};

export default Editor;
