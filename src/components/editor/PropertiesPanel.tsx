import React from 'react';
import { useEditor } from '@/contexts/EditorContext';
import { Block, HeadingBlock, TextBlock, ImageBlock, ButtonBlock, ContainerBlock, VideoBlock, DividerBlock, ListBlock, CardBlock, SpacerBlock, BlockStyles } from '@/types/blocks';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

export const PropertiesPanel: React.FC = () => {
    const { selectedBlockId, getSelectedBlock, updateBlock } = useEditor();
    const block = getSelectedBlock();

    if (!block || !selectedBlockId) {
        return (
            <div className="w-72 bg-sidebar border-l border-sidebar-border p-4">
                <h2 className="text-lg font-semibold mb-4 text-sidebar-foreground">Properties</h2>
                <p className="text-sm text-muted-foreground">Select a block to edit its properties</p>
            </div>
        );
    }

    const updateStyles = (styles: Partial<BlockStyles>) => {
        updateBlock(block.id, {
            styles: {
                ...block.styles,
                ...styles,
            },
        });
    };

    const renderProperties = () => {
        switch (block.type) {
            case 'heading':
                return <HeadingProperties block={ block } updateBlock={ updateBlock } updateStyles={ updateStyles } />;
            case 'text':
                return <TextProperties block={ block } updateBlock={ updateBlock } updateStyles={ updateStyles } />;
            case 'image':
                return <ImageProperties block={ block } updateBlock={ updateBlock } updateStyles={ updateStyles } />;
            case 'button':
                return <ButtonProperties block={ block } updateBlock={ updateBlock } updateStyles={ updateStyles } />;
            case 'container':
                return <ContainerProperties block={ block } updateBlock={ updateBlock } updateStyles={ updateStyles } />;
            case 'video':
                return <VideoProperties block={ block } updateBlock={ updateBlock } updateStyles={ updateStyles } />;
            case 'divider':
                return <DividerProperties block={ block } updateBlock={ updateBlock } updateStyles={ updateStyles } />;
            case 'list':
                return <ListProperties block={ block } updateBlock={ updateBlock } updateStyles={ updateStyles } />;
            case 'card':
                return <CardProperties block={ block } updateBlock={ updateBlock } updateStyles={ updateStyles } />;
            case 'spacer':
                return <SpacerProperties block={ block } updateBlock={ updateBlock } updateStyles={ updateStyles } />;
        }
    };

    return (
        <div className="w-72 bg-sidebar border-l border-sidebar-border p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4 text-sidebar-foreground">Properties</h2>
            <div className="space-y-4">
                { renderProperties() }
            </div>
        </div>
    );
};

const BlockStylesEditor: React.FC<{ styles?: BlockStyles; updateStyles: (styles: Partial<BlockStyles>) => void }> = ({ styles, updateStyles }) => {
    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="styles">
                <AccordionTrigger>Styles</AccordionTrigger>
                <AccordionContent className="space-y-4">
                    <div>
                        <Label htmlFor="bg-color">Background Color</Label>
                        <Input
                            id="bg-color"
                            type="color"
                            value={ styles?.backgroundColor || '#ffffff' }
                            onChange={ (e) => updateStyles({ backgroundColor: e.target.value }) }
                            className="mt-1 h-10"
                        />
                    </div>
                    <div>
                        <Label htmlFor="text-color">Text Color</Label>
                        <Input
                            id="text-color"
                            type="color"
                            value={ styles?.textColor || '#000000' }
                            onChange={ (e) => updateStyles({ textColor: e.target.value }) }
                            className="mt-1 h-10"
                        />
                    </div>
                    <div>
                        <Label htmlFor="font-size">Font Size</Label>
                        <Input
                            id="font-size"
                            value={ styles?.fontSize || '' }
                            onChange={ (e) => updateStyles({ fontSize: e.target.value }) }
                            className="mt-1"
                            placeholder="16px"
                        />
                    </div>
                    <div>
                        <Label htmlFor="font-weight">Font Weight</Label>
                        <Select
                            value={ styles?.fontWeight || 'normal' }
                            onValueChange={ (value) => updateStyles({ fontWeight: value as BlockStyles['fontWeight'] }) }
                        >
                            <SelectTrigger className="mt-1">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="normal">Normal</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="semibold">Semibold</SelectItem>
                                <SelectItem value="bold">Bold</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="font-family">Font Family</Label>
                        <Input
                            id="font-family"
                            value={ styles?.fontFamily || '' }
                            onChange={ (e) => updateStyles({ fontFamily: e.target.value }) }
                            className="mt-1"
                            placeholder="Arial, sans-serif"
                        />
                    </div>
                    <div>
                        <Label htmlFor="padding">Padding</Label>
                        <Input
                            id="padding"
                            value={ styles?.padding || '' }
                            onChange={ (e) => updateStyles({ padding: e.target.value }) }
                            className="mt-1"
                            placeholder="1rem"
                        />
                    </div>
                    <div>
                        <Label htmlFor="margin">Margin</Label>
                        <Input
                            id="margin"
                            value={ styles?.margin || '' }
                            onChange={ (e) => updateStyles({ margin: e.target.value }) }
                            className="mt-1"
                            placeholder="1rem"
                        />
                    </div>
                    <div>
                        <Label htmlFor="border-radius">Border Radius</Label>
                        <Input
                            id="border-radius"
                            value={ styles?.borderRadius || '' }
                            onChange={ (e) => updateStyles({ borderRadius: e.target.value }) }
                            className="mt-1"
                            placeholder="0.5rem"
                        />
                    </div>
                    <div>
                        <Label htmlFor="border-width">Border Width</Label>
                        <Input
                            id="border-width"
                            value={ styles?.borderWidth || '' }
                            onChange={ (e) => updateStyles({ borderWidth: e.target.value }) }
                            className="mt-1"
                            placeholder="1px"
                        />
                    </div>
                    <div>
                        <Label htmlFor="border-color">Border Color</Label>
                        <Input
                            id="border-color"
                            type="color"
                            value={ styles?.borderColor || '#000000' }
                            onChange={ (e) => updateStyles({ borderColor: e.target.value }) }
                            className="mt-1 h-10"
                        />
                    </div>
                    <div>
                        <Label htmlFor="border-style">Border Style</Label>
                        <Select
                            value={ styles?.borderStyle || 'solid' }
                            onValueChange={ (value) => updateStyles({ borderStyle: value as BlockStyles['borderStyle'] }) }
                        >
                            <SelectTrigger className="mt-1">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="solid">Solid</SelectItem>
                                <SelectItem value="dashed">Dashed</SelectItem>
                                <SelectItem value="dotted">Dotted</SelectItem>
                                <SelectItem value="none">None</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="box-shadow">Box Shadow</Label>
                        <Input
                            id="box-shadow"
                            value={ styles?.boxShadow || '' }
                            onChange={ (e) => updateStyles({ boxShadow: e.target.value }) }
                            className="mt-1"
                            placeholder="0 2px 4px rgba(0,0,0,0.1)"
                        />
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

const HeadingProperties: React.FC<{ block: HeadingBlock; updateBlock: (id: string, updates: Partial<Block>) => void; updateStyles: (styles: Partial<BlockStyles>) => void }> = ({ block, updateBlock, updateStyles }) => {
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
            <Separator />
            <BlockStylesEditor styles={ block.styles } updateStyles={ updateStyles } />
        </>
    );
};

const TextProperties: React.FC<{ block: TextBlock; updateBlock: (id: string, updates: Partial<Block>) => void; updateStyles: (styles: Partial<BlockStyles>) => void }> = ({ block, updateBlock, updateStyles }) => {
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
            <Separator />
            <BlockStylesEditor styles={ block.styles } updateStyles={ updateStyles } />
        </>
    );
};

const ImageProperties: React.FC<{ block: ImageBlock; updateBlock: (id: string, updates: Partial<Block>) => void; updateStyles: (styles: Partial<BlockStyles>) => void }> = ({ block, updateBlock, updateStyles }) => {
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
            <Separator />
            <BlockStylesEditor styles={ block.styles } updateStyles={ updateStyles } />
        </>
    );
};

const ButtonProperties: React.FC<{ block: ButtonBlock; updateBlock: (id: string, updates: Partial<Block>) => void; updateStyles: (styles: Partial<BlockStyles>) => void }> = ({ block, updateBlock, updateStyles }) => {
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
            <Separator />
            <BlockStylesEditor styles={ block.styles } updateStyles={ updateStyles } />
        </>
    );
};

const ContainerProperties: React.FC<{ block: ContainerBlock; updateBlock: (id: string, updates: Partial<Block>) => void; updateStyles: (styles: Partial<BlockStyles>) => void }> = ({ block, updateBlock, updateStyles }) => {
    return (
        <>
            <div>
                <Label htmlFor="container-layout">Layout</Label>
                <Select
                    value={ block.layout }
                    onValueChange={ (value) => updateBlock(block.id, { layout: value as 'vertical' | 'horizontal' }) }
                >
                    <SelectTrigger className="mt-1">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="vertical">Vertical</SelectItem>
                        <SelectItem value="horizontal">Horizontal</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="container-gap">Gap</Label>
                <Input
                    id="container-gap"
                    value={ block.gap || '1rem' }
                    onChange={ (e) => updateBlock(block.id, { gap: e.target.value }) }
                    className="mt-1"
                    placeholder="1rem"
                />
            </div>
            <Separator />
            <BlockStylesEditor styles={ block.styles } updateStyles={ updateStyles } />
        </>
    );
};

const VideoProperties: React.FC<{ block: VideoBlock; updateBlock: (id: string, updates: Partial<Block>) => void; updateStyles: (styles: Partial<BlockStyles>) => void }> = ({ block, updateBlock, updateStyles }) => {
    return (
        <>
            <div>
                <Label htmlFor="video-url">Video URL</Label>
                <Input
                    id="video-url"
                    value={ block.url }
                    onChange={ (e) => updateBlock(block.id, { url: e.target.value }) }
                    className="mt-1"
                    placeholder="https://example.com/video.mp4"
                />
            </div>
            <div>
                <Label htmlFor="video-width">Width</Label>
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
            <div className="flex items-center justify-between">
                <Label htmlFor="video-autoplay">Autoplay</Label>
                <Switch
                    id="video-autoplay"
                    checked={ block.autoplay }
                    onCheckedChange={ (checked) => updateBlock(block.id, { autoplay: checked }) }
                />
            </div>
            <div className="flex items-center justify-between">
                <Label htmlFor="video-controls">Controls</Label>
                <Switch
                    id="video-controls"
                    checked={ block.controls }
                    onCheckedChange={ (checked) => updateBlock(block.id, { controls: checked }) }
                />
            </div>
            <div className="flex items-center justify-between">
                <Label htmlFor="video-loop">Loop</Label>
                <Switch
                    id="video-loop"
                    checked={ block.loop }
                    onCheckedChange={ (checked) => updateBlock(block.id, { loop: checked }) }
                />
            </div>
            <Separator />
            <BlockStylesEditor styles={ block.styles } updateStyles={ updateStyles } />
        </>
    );
};

const DividerProperties: React.FC<{ block: DividerBlock; updateBlock: (id: string, updates: Partial<Block>) => void; updateStyles: (styles: Partial<BlockStyles>) => void }> = ({ block, updateBlock, updateStyles }) => {
    return (
        <>
            <div>
                <Label htmlFor="divider-style">Style</Label>
                <Select
                    value={ block.style }
                    onValueChange={ (value) => updateBlock(block.id, { style: value as 'solid' | 'dashed' | 'dotted' }) }
                >
                    <SelectTrigger className="mt-1">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="solid">Solid</SelectItem>
                        <SelectItem value="dashed">Dashed</SelectItem>
                        <SelectItem value="dotted">Dotted</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="divider-thickness">Thickness</Label>
                <Input
                    id="divider-thickness"
                    value={ block.thickness }
                    onChange={ (e) => updateBlock(block.id, { thickness: e.target.value }) }
                    className="mt-1"
                    placeholder="1px"
                />
            </div>
            <div>
                <Label htmlFor="divider-color">Color</Label>
                <Input
                    id="divider-color"
                    type="color"
                    value={ block.color }
                    onChange={ (e) => updateBlock(block.id, { color: e.target.value }) }
                    className="mt-1 h-10"
                />
            </div>
            <Separator />
            <BlockStylesEditor styles={ block.styles } updateStyles={ updateStyles } />
        </>
    );
};

const ListProperties: React.FC<{ block: ListBlock; updateBlock: (id: string, updates: Partial<Block>) => void; updateStyles: (styles: Partial<BlockStyles>) => void }> = ({ block, updateBlock, updateStyles }) => {
    const updateItem = (index: number, value: string) => {
        const newItems = [...block.items];
        newItems[index] = value;
        updateBlock(block.id, { items: newItems });
    };

    const addItem = () => {
        updateBlock(block.id, { items: [...block.items, ''] });
    };

    const removeItem = (index: number) => {
        const newItems = block.items.filter((_, i) => i !== index);
        updateBlock(block.id, { items: newItems });
    };

    return (
        <>
            <div>
                <Label htmlFor="list-type">List Type</Label>
                <Select
                    value={ block.listType }
                    onValueChange={ (value) => updateBlock(block.id, { listType: value as 'unordered' | 'ordered' }) }
                >
                    <SelectTrigger className="mt-1">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="unordered">Unordered</SelectItem>
                        <SelectItem value="ordered">Ordered</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label>Items</Label>
                <div className="space-y-2 mt-1">
                    { block.items.map((item, index) => (
                        <div key={ index } className="flex gap-2">
                            <Input
                                value={ item }
                                onChange={ (e) => updateItem(index, e.target.value) }
                                placeholder={ `Item ${index + 1}` }
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={ () => removeItem(index) }
                            >
                                ×
                            </Button>
                        </div>
                    )) }
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={ addItem }
                        className="w-full"
                    >
                        + Add Item
                    </Button>
                </div>
            </div>
            <Separator />
            <BlockStylesEditor styles={ block.styles } updateStyles={ updateStyles } />
        </>
    );
};

const CardProperties: React.FC<{ block: CardBlock; updateBlock: (id: string, updates: Partial<Block>) => void; updateStyles: (styles: Partial<BlockStyles>) => void }> = ({ block, updateBlock, updateStyles }) => {
    return (
        <>
            <div>
                <Label htmlFor="card-title">Title</Label>
                <Input
                    id="card-title"
                    value={ block.title }
                    onChange={ (e) => updateBlock(block.id, { title: e.target.value }) }
                    className="mt-1"
                />
            </div>
            <div>
                <Label htmlFor="card-content">Content</Label>
                <Textarea
                    id="card-content"
                    value={ block.content }
                    onChange={ (e) => updateBlock(block.id, { content: e.target.value }) }
                    className="mt-1"
                    rows={ 4 }
                />
            </div>
            <div>
                <Label htmlFor="card-image">Image URL</Label>
                <Input
                    id="card-image"
                    value={ block.imageUrl || '' }
                    onChange={ (e) => updateBlock(block.id, { imageUrl: e.target.value }) }
                    className="mt-1"
                    placeholder="https://example.com/image.jpg"
                />
            </div>
            <div>
                <Label htmlFor="card-button-text">Button Text</Label>
                <Input
                    id="card-button-text"
                    value={ block.buttonText || '' }
                    onChange={ (e) => updateBlock(block.id, { buttonText: e.target.value }) }
                    className="mt-1"
                    placeholder="Learn More"
                />
            </div>
            <div>
                <Label htmlFor="card-button-url">Button URL</Label>
                <Input
                    id="card-button-url"
                    value={ block.buttonUrl || '' }
                    onChange={ (e) => updateBlock(block.id, { buttonUrl: e.target.value }) }
                    className="mt-1"
                    placeholder="https://example.com"
                />
            </div>
            <Separator />
            <BlockStylesEditor styles={ block.styles } updateStyles={ updateStyles } />
        </>
    );
};

const SpacerProperties: React.FC<{ block: SpacerBlock; updateBlock: (id: string, updates: Partial<Block>) => void; updateStyles: (styles: Partial<BlockStyles>) => void }> = ({ block, updateBlock, updateStyles }) => {
    return (
        <>
            <div>
                <Label htmlFor="spacer-height">Height</Label>
                <Input
                    id="spacer-height"
                    value={ block.height }
                    onChange={ (e) => updateBlock(block.id, { height: e.target.value }) }
                    className="mt-1"
                    placeholder="2rem"
                />
            </div>
            <Separator />
            <BlockStylesEditor styles={ block.styles } updateStyles={ updateStyles } />
        </>
    );
};
