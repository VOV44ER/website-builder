import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Page } from '@/types/blocks';
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
import { Button } from '@/components/ui/button';
import { ArrowLeft, Monitor, Tablet, Smartphone } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type ViewportSize = 'desktop' | 'tablet' | 'mobile';

const Preview = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState<Page | null>(null);
  const [viewportSize, setViewportSize] = useState<ViewportSize>('desktop');

  useEffect(() => {
    const saved = localStorage.getItem('cms-pages');
    if (saved) {
      const pages: Page[] = JSON.parse(saved);
      const foundPage = pages.find(p => p.slug === slug);
      setPage(foundPage || null);
    }
  }, [slug]);

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <Button onClick={ () => navigate('/editor') }>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Editor
          </Button>
        </div>
      </div>
    );
  }

  const getViewportWidth = () => {
    switch (viewportSize) {
      case 'desktop':
        return '100%';
      case 'tablet':
        return '768px';
      case 'mobile':
        return '375px';
    }
  };

  const getViewportClass = () => {
    switch (viewportSize) {
      case 'desktop':
        return 'max-w-4xl';
      case 'tablet':
        return 'max-w-[768px]';
      case 'mobile':
        return 'max-w-[375px]';
    }
  };

  const getViewportPadding = () => {
    switch (viewportSize) {
      case 'desktop':
        return 'px-4 md:px-8';
      case 'tablet':
        return 'px-6';
      case 'mobile':
        return 'px-4';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={ () => navigate('/editor') }>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад в редактор
          </Button>
          <Tabs value={ viewportSize } onValueChange={ (value) => setViewportSize(value as ViewportSize) }>
            <TabsList>
              <TabsTrigger value="desktop" title="Desktop (1920px)">
                <Monitor className="w-4 h-4 mr-2" />
                Desktop
              </TabsTrigger>
              <TabsTrigger value="tablet" title="Tablet (768px)">
                <Tablet className="w-4 h-4 mr-2" />
                Tablet
              </TabsTrigger>
              <TabsTrigger value="mobile" title="Mobile (375px)">
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>

      <div className="flex justify-center py-8 bg-muted/30 min-h-screen">
        <div
          className={ `${getViewportClass()} mx-auto transition-all duration-300 bg-background shadow-2xl rounded-lg overflow-hidden` }
          style={ {
            width: viewportSize !== 'desktop' ? getViewportWidth() : undefined,
            minHeight: viewportSize === 'desktop' ? 'auto' : '667px',
            maxHeight: viewportSize === 'mobile' ? '667px' : viewportSize === 'tablet' ? '1024px' : 'none',
            overflow: viewportSize !== 'desktop' ? 'auto' : 'visible',
          } }
        >
          <main className={ `py-12 ${getViewportPadding()}` }>
            <h1 className={ `font-bold mb-8 text-foreground ${viewportSize === 'mobile' ? 'text-2xl' : viewportSize === 'tablet' ? 'text-3xl' : 'text-4xl'
              }` }>{ page.title }</h1>

            <div className="space-y-4">
              { page.blocks.map((block) => {
                switch (block.type) {
                  case 'heading':
                    return <HeadingBlockComponent key={ block.id } block={ block } isSelected={ false } />;
                  case 'text':
                    return <TextBlockComponent key={ block.id } block={ block } isSelected={ false } />;
                  case 'image':
                    return <ImageBlockComponent key={ block.id } block={ block } isSelected={ false } />;
                  case 'button':
                    return <ButtonBlockComponent key={ block.id } block={ block } isSelected={ false } />;
                  case 'container':
                    return <ContainerBlockComponent key={ block.id } block={ block } isSelected={ false } />;
                  case 'video':
                    return <VideoBlockComponent key={ block.id } block={ block } isSelected={ false } />;
                  case 'divider':
                    return <DividerBlockComponent key={ block.id } block={ block } isSelected={ false } />;
                  case 'list':
                    return <ListBlockComponent key={ block.id } block={ block } isSelected={ false } />;
                  case 'card':
                    return <CardBlockComponent key={ block.id } block={ block } isSelected={ false } />;
                  case 'spacer':
                    return <SpacerBlockComponent key={ block.id } block={ block } isSelected={ false } />;
                }
              }) }
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Preview;
