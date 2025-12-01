import React, { useState } from 'react';
import { EditorProvider } from '@/contexts/EditorContext';
import { EditorHeader } from '@/components/editor/EditorHeader';
import { BlocksPalette } from '@/components/editor/BlocksPalette';
import { Canvas } from '@/components/editor/Canvas';
import { PagesList } from '@/components/editor/PagesList';
import { PropertiesPanel } from '@/components/editor/PropertiesPanel';
import { MobileNotSupported } from '@/components/editor/MobileNotSupported';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { X, FileText, Settings } from 'lucide-react';

const Editor = () => {
  const isMobile = useIsMobile();
  const [showPages, setShowPages] = useState(false);
  const [showProperties, setShowProperties] = useState(true);

  if (isMobile) {
    return <MobileNotSupported />;
  }

  return (
    <EditorProvider>
      <div className="h-screen flex flex-col overflow-hidden">
        <EditorHeader />
        <div className="flex-1 flex overflow-hidden relative">
          <BlocksPalette />
          <Canvas />
          { showProperties && (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 z-10 h-6 w-6 p-0"
                onClick={ () => setShowProperties(false) }
              >
                <X className="w-4 h-4" />
              </Button>
              <PropertiesPanel />
            </div>
          ) }
          { !showProperties && (
            <Button
              variant="outline"
              size="sm"
              className="absolute top-4 right-4 z-10 shadow-lg"
              onClick={ () => setShowProperties(true) }
            >
              <Settings className="w-4 h-4 mr-2" />
              Properties
            </Button>
          ) }
          { showPages && (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 z-10 h-6 w-6 p-0"
                onClick={ () => setShowPages(false) }
              >
                <X className="w-4 h-4" />
              </Button>
              <PagesList />
            </div>
          ) }
          { !showPages && (
            <Button
              variant="outline"
              size="sm"
              className="absolute top-4 z-10 shadow-lg"
              onClick={ () => setShowPages(true) }
              style={ { right: showProperties ? '300px' : '16px' } }
            >
              <FileText className="w-4 h-4 mr-2" />
              Pages
            </Button>
          ) }
        </div>
      </div>
    </EditorProvider>
  );
};

export default Editor;
