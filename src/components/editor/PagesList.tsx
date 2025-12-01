import React from 'react';
import { useEditor } from '@/contexts/EditorContext';
import { Button } from '@/components/ui/button';
import { FileText, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export const PagesList: React.FC = () => {
  const { pages, currentPage, loadPage, deletePage } = useEditor();

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deletePage(id);
    toast.success('Page deleted');
  };

  if (pages.length === 0) {
    return (
      <div className="w-56 bg-sidebar border-l border-sidebar-border p-4">
        <h2 className="text-lg font-semibold mb-4 text-sidebar-foreground">Pages</h2>
        <p className="text-sm text-muted-foreground">No pages yet. Create your first page!</p>
      </div>
    );
  }

  return (
    <div className="w-56 bg-sidebar border-l border-sidebar-border p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 text-sidebar-foreground">Pages</h2>
      <div className="space-y-2">
        { pages.map((page) => (
          <div
            key={ page.id }
            className={ `flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${currentPage?.id === page.id
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-sidebar-border hover:bg-muted'
              }` }
            onClick={ () => loadPage(page.id) }
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <FileText className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium truncate text-sm">{ page.title }</span>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={ (e) => handleDelete(page.id, e) }
              className="flex-shrink-0 h-6 w-6 p-0"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        )) }
      </div>
    </div>
  );
};
