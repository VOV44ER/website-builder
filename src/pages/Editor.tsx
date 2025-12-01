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

  const getFloatingRight = () => {
    if (showProperties) {
      return '304px'; // ~w-72 + gap
    }
    if (showPages) {
      return '240px'; // ~w-56 + gap
    }
    return '16px';
  };

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
          <div
            className="absolute top-4 z-10 flex flex-col gap-2"
            style={ { right: getFloatingRight() } }
          >
            { !showProperties && (
              <Button
                variant="outline"
                size="sm"
                className="shadow-lg"
                onClick={ () => setShowProperties(true) }
              >
                <Settings className="w-4 h-4 mr-2" />
                Properties
              </Button>
            ) }
            { !showPages && (
              <Button
                variant="outline"
                size="sm"
                className="shadow-lg"
                onClick={ () => setShowPages(true) }
              >
                <FileText className="w-4 h-4 mr-2" />
                Pages
              </Button>
            ) }
          </div>
        </div>
      </div>
    </EditorProvider>
  );
};

export default Editor;
