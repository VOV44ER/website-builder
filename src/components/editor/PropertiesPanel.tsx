import React from 'react';
import { useEditor } from '@/contexts/EditorContext';
import { Block, HeadingBlock, TextBlock, ImageBlock, ButtonBlock } from '@/types/blocks';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const PropertiesPanel: React.FC = () => {
    const { selectedBlockId, getSelectedBlock, updateBlock } = useEditor();
    const block = getSelectedBlock();

    if (!block || !selectedBlockId) {
        return (
            <div className="w-80 bg-sidebar border-l border-sidebar-border p-4">
                <h2 className="text-lg font-semibold mb-4 text-sidebar-foreground">Properties</h2>
                <p className="text-sm text-muted-foreground">Select a block to edit its properties</p>
            </div>
        );
    }

    const renderProperties = () => {
        switch (block.type) {
            case 'heading':
                return <HeadingProperties block={ block } updateBlock={ updateBlock } />;
            case 'text':
                return <TextProperties block={ block } updateBlock={ updateBlock } />;
            case 'image':
                return <ImageProperties block={ block } updateBlock={ updateBlock } />;
            case 'button':
                return <ButtonProperties block={ block } updateBlock={ updateBlock } />;
        }
    };

    return (
        <div className="w-80 bg-sidebar border-l border-sidebar-border p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4 text-sidebar-foreground">Properties</h2>
            <div className="space-y-4">
                { renderProperties() }
            </div>
        </div>
    );
};

const HeadingProperties: React.FC<{ block: HeadingBlock; updateBlock: (id: string, updates: Partial<Block>) => void }> = ({ block, updateBlock }) => {
    return (
        <>
            <div>
                <Label htmlFor="heading-content">Content</Label>
                <Textarea
                    id="heading-content"
                    value={ block.content }
                    onChange={ (e) => updateBlock(block.id, { content: e.target.value }) }
                    className="mt-1"
                />
            </div>
            <div>
                <Label htmlFor="heading-level">Level</Label>
                <Select
                    value={ block.level.toString() }
                    onValueChange={ (value) => updateBlock(block.id, { level: parseInt(value) as 1 | 2 | 3 }) }
                >
                    <SelectTrigger className="mt-1">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">H1</SelectItem>
                        <SelectItem value="2">H2</SelectItem>
                        <SelectItem value="3">H3</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="heading-align">Alignment</Label>
                <Select
                    value={ block.align }
                    onValueChange={ (value) => updateBlock(block.id, { align: value as 'left' | 'center' | 'right' }) }
                >
                    <SelectTrigger className="mt-1">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </>
    );
};

const TextProperties: React.FC<{ block: TextBlock; updateBlock: (id: string, updates: Partial<Block>) => void }> = ({ block, updateBlock }) => {
    return (
        <>
            <div>
                <Label htmlFor="text-content">Content</Label>
                <Textarea
                    id="text-content"
                    value={ block.content }
                    onChange={ (e) => updateBlock(block.id, { content: e.target.value }) }
                    className="mt-1"
                    rows={ 6 }
                />
            </div>
            <div>
                <Label htmlFor="text-align">Alignment</Label>
                <Select
                    value={ block.align }
                    onValueChange={ (value) => updateBlock(block.id, { align: value as 'left' | 'center' | 'right' }) }
                >
                    <SelectTrigger className="mt-1">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </>
    );
};

const ImageProperties: React.FC<{ block: ImageBlock; updateBlock: (id: string, updates: Partial<Block>) => void }> = ({ block, updateBlock }) => {
    return (
        <>
            <div>
                <Label htmlFor="image-url">Image URL</Label>
                <Input
                    id="image-url"
                    value={ block.url }
                    onChange={ (e) => updateBlock(block.id, { url: e.target.value }) }
                    className="mt-1"
                    placeholder="https://example.com/image.jpg"
                />
            </div>
            <div>
                <Label htmlFor="image-alt">Alt Text</Label>
                <Input
                    id="image-alt"
                    value={ block.alt }
                    onChange={ (e) => updateBlock(block.id, { alt: e.target.value }) }
                    className="mt-1"
                    placeholder="Description of the image"
                />
            </div>
            <div>
                <Label htmlFor="image-width">Width</Label>
                <Select
                    value={ block.width }
                    onValueChange={ (value) => updateBlock(block.id, { width: value }) }
                >
                    <SelectTrigger className="mt-1">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="100%">100%</SelectItem>
                        <SelectItem value="75%">75%</SelectItem>
                        <SelectItem value="50%">50%</SelectItem>
                        <SelectItem value="25%">25%</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </>
    );
};

const ButtonProperties: React.FC<{ block: ButtonBlock; updateBlock: (id: string, updates: Partial<Block>) => void }> = ({ block, updateBlock }) => {
    return (
        <>
            <div>
                <Label htmlFor="button-text">Button Text</Label>
                <Input
                    id="button-text"
                    value={ block.text }
                    onChange={ (e) => updateBlock(block.id, { text: e.target.value }) }
                    className="mt-1"
                />
            </div>
            <div>
                <Label htmlFor="button-url">URL</Label>
                <Input
                    id="button-url"
                    value={ block.url }
                    onChange={ (e) => updateBlock(block.id, { url: e.target.value }) }
                    className="mt-1"
                    placeholder="https://example.com"
                />
            </div>
            <div>
                <Label htmlFor="button-variant">Variant</Label>
                <Select
                    value={ block.variant }
                    onValueChange={ (value) => updateBlock(block.id, { variant: value as 'primary' | 'secondary' | 'outline' }) }
                >
                    <SelectTrigger className="mt-1">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="primary">Primary</SelectItem>
                        <SelectItem value="secondary">Secondary</SelectItem>
                        <SelectItem value="outline">Outline</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="button-align">Alignment</Label>
                <Select
                    value={ block.align }
                    onValueChange={ (value) => updateBlock(block.id, { align: value as 'left' | 'center' | 'right' }) }
                >
                    <SelectTrigger className="mt-1">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </>
    );
};

