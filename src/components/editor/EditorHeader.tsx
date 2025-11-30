import React, { useState } from 'react';
import { useEditor } from '@/contexts/EditorContext';
import { Button } from '@/components/ui/button';
import { Save, Eye, FileText, Plus, Download, Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { generateHTML, generateReact } from '@/lib/codeGenerator';
import { pageTemplates, PageTemplate } from '@/lib/pageTemplates';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const EditorHeader: React.FC = () => {
  const { currentPage, savePage, createPage, createPageFromTemplate, pages } = useEditor();
  const navigate = useNavigate();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<PageTemplate | null>(null);
  const [exportFormat, setExportFormat] = useState<'html' | 'react'>('html');

  const handleSave = () => {
    savePage();
    toast.success('Page saved successfully!');
  };

  const handlePreview = () => {
    if (!currentPage) return;
    savePage();
    navigate(`/preview/${currentPage.slug}`);
  };

  const handleCreatePage = () => {
    if (!newPageTitle || !newPageSlug) {
      toast.error('Please fill in all fields');
      return;
    }

    if (pages.some(p => p.slug === newPageSlug)) {
      toast.error('A page with this slug already exists');
      return;
    }

    if (selectedTemplate) {
      createPageFromTemplate(selectedTemplate, newPageTitle, newPageSlug);
    } else {
      createPage(newPageTitle, newPageSlug);
    }

    setNewPageTitle('');
    setNewPageSlug('');
    setSelectedTemplate(null);
    setIsCreateDialogOpen(false);
    toast.success('Page created successfully!');
  };

  const getGeneratedCode = () => {
    if (!currentPage) return '';

    if (exportFormat === 'html') {
      return generateHTML(currentPage);
    } else {
      return generateReact(currentPage);
    }
  };

  const handleDownloadCode = () => {
    if (!currentPage) return;

    const code = getGeneratedCode();
    const extension = exportFormat === 'html' ? 'html' : 'tsx';
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentPage.slug}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Code exported as ${extension.toUpperCase()}!`);
  };

  return (
    <header className="h-16 border-b border-editor-border bg-background flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Micro CMS
        </h1>

        <Dialog open={ isCreateDialogOpen } onOpenChange={ setIsCreateDialogOpen }>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Page
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Page</DialogTitle>
              <DialogDescription>
                Choose a template or start with a blank page
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div>
                <Label className="mb-2 block">Choose Template</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  { pageTemplates.map((template) => (
                    <Card
                      key={ template.id }
                      className={ `cursor-pointer transition-all hover:border-primary ${selectedTemplate?.id === template.id ? 'border-primary ring-2 ring-primary' : ''
                        }` }
                      onClick={ () => setSelectedTemplate(template) }
                    >
                      <CardHeader className="pb-2">
                        <div className="text-4xl mb-2">{ template.thumbnail }</div>
                        <CardTitle className="text-base">{ template.name }</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-xs">
                          { template.description }
                        </CardDescription>
                      </CardContent>
                    </Card>
                  )) }
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Page Title</Label>
                  <Input
                    id="title"
                    value={ newPageTitle }
                    onChange={ (e) => setNewPageTitle(e.target.value) }
                    placeholder="About Us"
                  />
                </div>
                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={ newPageSlug }
                    onChange={ (e) => setNewPageSlug(e.target.value) }
                    placeholder="about-us"
                  />
                </div>
                <Button onClick={ handleCreatePage } className="w-full">
                  Create Page
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <Dialog open={ isExportDialogOpen } onOpenChange={ setIsExportDialogOpen }>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" disabled={ !currentPage }>
              <Code className="w-4 h-4 mr-2" />
              Export Code
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Export Code</DialogTitle>
              <DialogDescription>
                Generate and download code for the current page
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Tabs value={ exportFormat } onValueChange={ (value) => setExportFormat(value as 'html' | 'react') }>
                <TabsList>
                  <TabsTrigger value="html">HTML</TabsTrigger>
                  <TabsTrigger value="react">React</TabsTrigger>
                </TabsList>
                <TabsContent value="html" className="mt-4">
                  <Textarea
                    value={ getGeneratedCode() }
                    readOnly
                    className="font-mono text-sm"
                    rows={ 20 }
                  />
                </TabsContent>
                <TabsContent value="react" className="mt-4">
                  <Textarea
                    value={ getGeneratedCode() }
                    readOnly
                    className="font-mono text-sm"
                    rows={ 20 }
                  />
                </TabsContent>
              </Tabs>
              <Button onClick={ handleDownloadCode } className="w-full" disabled={ !currentPage }>
                <Download className="w-4 h-4 mr-2" />
                Download { exportFormat.toUpperCase() } Code
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Button
          onClick={ handleSave }
          disabled={ !currentPage }
          variant="outline"
          size="sm"
          title="Auto-save is enabled (saves after 1 second of inactivity)"
        >
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        <Button
          onClick={ handlePreview }
          disabled={ !currentPage }
          size="sm"
        >
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>
      </div>
    </header>
  );
};
