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
import { ArrowLeft } from 'lucide-react';

const Preview = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState<Page | null>(null);

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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border p-4">
        <Button variant="outline" onClick={ () => navigate('/editor') }>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Editor
        </Button>
      </header>

      <main className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-foreground">{ page.title }</h1>

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
  );
};

export default Preview;
