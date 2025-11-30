import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Block, Page } from '@/types/blocks';

interface EditorContextType {
  currentPage: Page | null;
  pages: Page[];
  selectedBlockId: string | null;
  setSelectedBlockId: (id: string | null) => void;
  addBlock: (block: Block) => void;
  updateBlock: (id: string, updates: Partial<Block>) => void;
  deleteBlock: (id: string) => void;
  duplicateBlock: (id: string) => void;
  reorderBlocks: (startIndex: number, endIndex: number) => void;
  createPage: (title: string, slug: string) => void;
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

  const addBlock = useCallback((block: Block) => {
    if (!currentPage) return;

    setCurrentPage({
      ...currentPage,
      blocks: [...currentPage.blocks, block],
      updatedAt: new Date().toISOString(),
    });
  }, [currentPage]);

  const updateBlock = useCallback((id: string, updates: Partial<Block>) => {
    if (!currentPage) return;

    setCurrentPage({
      ...currentPage,
      blocks: currentPage.blocks.map(b =>
        b.id === id ? { ...b, ...updates } as Block : b
      ),
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
    return currentPage.blocks.find(b => b.id === selectedBlockId) || null;
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

    setCurrentPage({
      ...currentPage,
      blocks: currentPage.blocks.filter(b => b.id !== id),
      updatedAt: new Date().toISOString(),
    });
    if (selectedBlockId === id) {
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

  return (
    <EditorContext.Provider
      value={ {
        currentPage,
        pages,
        selectedBlockId,
        setSelectedBlockId,
        addBlock,
        updateBlock,
        deleteBlock,
        duplicateBlock,
        reorderBlocks,
        createPage,
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
