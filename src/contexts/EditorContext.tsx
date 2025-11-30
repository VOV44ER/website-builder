import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Block, Page, ContainerBlock } from '@/types/blocks';
import { PageTemplate } from '@/lib/pageTemplates';

interface EditorContextType {
  currentPage: Page | null;
  pages: Page[];
  selectedBlockId: string | null;
  setSelectedBlockId: (id: string | null) => void;
  addBlock: (block: Block) => void;
  addBlockToContainer: (containerId: string, block: Block) => void;
  updateBlock: (id: string, updates: Partial<Block>) => void;
  deleteBlock: (id: string) => void;
  deleteBlockFromContainer: (containerId: string, blockId: string) => void;
  duplicateBlock: (id: string) => void;
  reorderBlocks: (startIndex: number, endIndex: number) => void;
  reorderBlocksInContainer: (containerId: string, startIndex: number, endIndex: number) => void;
  createPage: (title: string, slug: string) => void;
  createPageFromTemplate: (template: PageTemplate, title: string, slug: string) => void;
  loadPage: (id: string) => void;
  savePage: () => void;
  deletePage: (id: string) => void;
  exportPages: () => string;
  importPages: (json: string) => boolean;
  getSelectedBlock: () => Block | null;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pages, setPages] = useState<Page[]>(() => {
    const saved = localStorage.getItem('cms-pages');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const savePage = useCallback(() => {
    if (!currentPage) return;

    const updatedPages = pages.find(p => p.id === currentPage.id)
      ? pages.map(p => p.id === currentPage.id ? currentPage : p)
      : [...pages, currentPage];

    setPages(updatedPages);
    localStorage.setItem('cms-pages', JSON.stringify(updatedPages));
  }, [currentPage, pages]);

  useEffect(() => {
    if (!currentPage) return;

    const timeoutId = setTimeout(() => {
      savePage();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [currentPage, savePage]);

  const createPage = useCallback((title: string, slug: string) => {
    const newPage: Page = {
      id: Date.now().toString(),
      title,
      slug,
      blocks: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCurrentPage(newPage);
  }, []);

  const createPageFromTemplate = useCallback((template: PageTemplate, title: string, slug: string) => {
    const templatePage = template.create();
    const newPage: Page = {
      ...templatePage,
      id: Date.now().toString(),
      title,
      slug,
      updatedAt: new Date().toISOString(),
    };
    setCurrentPage(newPage);
  }, []);

  const loadPage = useCallback((id: string) => {
    const page = pages.find(p => p.id === id);
    if (page) {
      setCurrentPage(page);
      setSelectedBlockId(null);
    }
  }, [pages]);

  const deletePage = useCallback((id: string) => {
    const updatedPages = pages.filter(p => p.id !== id);
    setPages(updatedPages);
    localStorage.setItem('cms-pages', JSON.stringify(updatedPages));
    if (currentPage?.id === id) {
      setCurrentPage(null);
    }
  }, [pages, currentPage]);

  const addBlockToContainer = useCallback((containerId: string, block: Block) => {
    if (!currentPage) return;

    const newBlock = {
      ...block,
      position: 0,
    };

    setCurrentPage({
      ...currentPage,
      blocks: currentPage.blocks.map(b => {
        if (b.id === containerId && b.type === 'container') {
          return {
            ...b,
            blocks: [...(b as ContainerBlock).blocks, newBlock],
          } as ContainerBlock;
        }
        return b;
      }),
      updatedAt: new Date().toISOString(),
    });
  }, [currentPage]);

  const addBlock = useCallback((block: Block) => {
    if (!currentPage) return;

    const selectedBlock = selectedBlockId ? currentPage.blocks.find(b => b.id === selectedBlockId) : null;

    if (selectedBlock && selectedBlock.type === 'container') {
      addBlockToContainer(selectedBlock.id, block);
      return;
    }

    const newBlock = {
      ...block,
      position: currentPage.blocks.length,
    };

    setCurrentPage({
      ...currentPage,
      blocks: [...currentPage.blocks, newBlock],
      updatedAt: new Date().toISOString(),
    });
  }, [currentPage, selectedBlockId, addBlockToContainer]);

  const updateBlock = useCallback((id: string, updates: Partial<Block>) => {
    if (!currentPage) return;

    const updateBlockRecursive = (blocks: Block[]): Block[] => {
      return blocks.map(b => {
        if (b.id === id) {
          return { ...b, ...updates } as Block;
        }
        if (b.type === 'container') {
          return {
            ...b,
            blocks: updateBlockRecursive((b as ContainerBlock).blocks),
          } as ContainerBlock;
        }
        return b;
      });
    };

    setCurrentPage({
      ...currentPage,
      blocks: updateBlockRecursive(currentPage.blocks),
      updatedAt: new Date().toISOString(),
    });
  }, [currentPage]);

  const duplicateBlock = useCallback((id: string) => {
    if (!currentPage) return;

    const blockToDuplicate = currentPage.blocks.find(b => b.id === id);
    if (!blockToDuplicate) return;

    const duplicatedBlock: Block = {
      ...blockToDuplicate,
      id: Date.now().toString(),
      position: currentPage.blocks.length,
    };

    setCurrentPage({
      ...currentPage,
      blocks: [...currentPage.blocks, duplicatedBlock],
      updatedAt: new Date().toISOString(),
    });
  }, [currentPage]);

  const getSelectedBlock = useCallback((): Block | null => {
    if (!currentPage || !selectedBlockId) return null;

    const findBlockRecursive = (blocks: Block[]): Block | null => {
      for (const block of blocks) {
        if (block.id === selectedBlockId) {
          return block;
        }
        if (block.type === 'container') {
          const found = findBlockRecursive((block as ContainerBlock).blocks);
          if (found) return found;
        }
      }
      return null;
    };

    return findBlockRecursive(currentPage.blocks);
  }, [currentPage, selectedBlockId]);

  const exportPages = useCallback((): string => {
    return JSON.stringify(pages, null, 2);
  }, [pages]);

  const importPages = useCallback((json: string): boolean => {
    try {
      const importedPages: Page[] = JSON.parse(json);
      if (!Array.isArray(importedPages)) return false;

      setPages(importedPages);
      localStorage.setItem('cms-pages', JSON.stringify(importedPages));
      return true;
    } catch {
      return false;
    }
  }, []);

  const deleteBlock = useCallback((id: string) => {
    if (!currentPage) return;

    const deleteBlockRecursive = (blocks: Block[]): Block[] => {
      return blocks.filter(b => {
        if (b.id === id) return false;
        if (b.type === 'container') {
          (b as ContainerBlock).blocks = deleteBlockRecursive((b as ContainerBlock).blocks);
        }
        return true;
      });
    };

    setCurrentPage({
      ...currentPage,
      blocks: deleteBlockRecursive(currentPage.blocks),
      updatedAt: new Date().toISOString(),
    });
    if (selectedBlockId === id) {
      setSelectedBlockId(null);
    }
  }, [currentPage, selectedBlockId]);

  const deleteBlockFromContainer = useCallback((containerId: string, blockId: string) => {
    if (!currentPage) return;

    setCurrentPage({
      ...currentPage,
      blocks: currentPage.blocks.map(b => {
        if (b.id === containerId && b.type === 'container') {
          return {
            ...b,
            blocks: (b as ContainerBlock).blocks.filter(block => block.id !== blockId),
          } as ContainerBlock;
        }
        return b;
      }),
      updatedAt: new Date().toISOString(),
    });
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
  }, [currentPage, selectedBlockId]);

  const reorderBlocks = useCallback((startIndex: number, endIndex: number) => {
    if (!currentPage) return;

    const newBlocks = Array.from(currentPage.blocks);
    const [removed] = newBlocks.splice(startIndex, 1);
    newBlocks.splice(endIndex, 0, removed);

    const reorderedBlocks = newBlocks.map((block, index) => ({
      ...block,
      position: index,
    }));

    setCurrentPage({
      ...currentPage,
      blocks: reorderedBlocks,
      updatedAt: new Date().toISOString(),
    });
  }, [currentPage]);

  const reorderBlocksInContainer = useCallback((containerId: string, startIndex: number, endIndex: number) => {
    if (!currentPage) return;

    setCurrentPage({
      ...currentPage,
      blocks: currentPage.blocks.map(b => {
        if (b.id === containerId && b.type === 'container') {
          const newBlocks = Array.from((b as ContainerBlock).blocks);
          const [removed] = newBlocks.splice(startIndex, 1);
          newBlocks.splice(endIndex, 0, removed);
          return {
            ...b,
            blocks: newBlocks,
          } as ContainerBlock;
        }
        return b;
      }),
      updatedAt: new Date().toISOString(),
    });
  }, [currentPage]);

  return (
    <EditorContext.Provider
      value={ {
        currentPage,
        pages,
        selectedBlockId,
        setSelectedBlockId,
        addBlock,
        addBlockToContainer,
        updateBlock,
        deleteBlock,
        deleteBlockFromContainer,
        duplicateBlock,
        reorderBlocks,
        reorderBlocksInContainer,
        createPage,
        createPageFromTemplate,
        loadPage,
        savePage,
        deletePage,
        exportPages,
        importPages,
        getSelectedBlock,
      } }
    >
      { children }
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within EditorProvider');
  }
  return context;
};

export const useEditorOptional = () => {
  return useContext(EditorContext);
};
