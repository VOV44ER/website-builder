import { Page, Block, HeadingBlock, TextBlock, ImageBlock, ButtonBlock } from '@/types/blocks';

export const generateHTML = (page: Page): string => {
    const blocksHTML = page.blocks
        .sort((a, b) => a.position - b.position)
        .map((block) => generateBlockHTML(block))
        .join('\n\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.title}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    h1 { font-size: 2.5rem; font-weight: bold; margin-bottom: 1.5rem; }
    h2 { font-size: 2rem; font-weight: 600; margin-bottom: 1rem; }
    h3 { font-size: 1.5rem; font-weight: 500; margin-bottom: 0.75rem; }
    p { margin-bottom: 1rem; }
    img { max-width: 100%; height: auto; border-radius: 0.5rem; }
    .text-left { text-align: left; }
    .text-center { text-align: center; }
    .text-right { text-align: right; }
    .flex { display: flex; }
    .justify-start { justify-content: flex-start; }
    .justify-center { justify-content: center; }
    .justify-end { justify-content: flex-end; }
    .btn {
      display: inline-block;
      padding: 0.5rem 1.5rem;
      border-radius: 0.375rem;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.2s;
      border: none;
      cursor: pointer;
    }
    .btn-primary {
      background-color: #3b82f6;
      color: white;
    }
    .btn-primary:hover {
      background-color: #2563eb;
    }
    .btn-secondary {
      background-color: #6b7280;
      color: white;
    }
    .btn-secondary:hover {
      background-color: #4b5563;
    }
    .btn-outline {
      background-color: transparent;
      color: #3b82f6;
      border: 1px solid #3b82f6;
    }
    .btn-outline:hover {
      background-color: #3b82f6;
      color: white;
    }
  </style>
</head>
<body>
  <h1>${page.title}</h1>
  
${blocksHTML}
</body>
</html>`;
};

const generateBlockHTML = (block: Block): string => {
    switch (block.type) {
        case 'heading':
            return generateHeadingHTML(block);
        case 'text':
            return generateTextHTML(block);
        case 'image':
            return generateImageHTML(block);
        case 'button':
            return generateButtonHTML(block);
    }
};

const generateHeadingHTML = (block: HeadingBlock): string => {
    const alignClass = block.align === 'left' ? 'text-left' : block.align === 'center' ? 'text-center' : 'text-right';
    return `  <h${block.level} class="${alignClass}">${escapeHTML(block.content)}</h${block.level}>`;
};

const generateTextHTML = (block: TextBlock): string => {
    const alignClass = block.align === 'left' ? 'text-left' : block.align === 'center' ? 'text-center' : 'text-right';
    return `  <p class="${alignClass}">${escapeHTML(block.content)}</p>`;
};

const generateImageHTML = (block: ImageBlock): string => {
    const widthStyle = block.width === 'auto' ? '' : ` style="width: ${block.width};"`;
    return `  <div class="flex justify-center">
    <img src="${escapeHTML(block.url)}" alt="${escapeHTML(block.alt)}"${widthStyle} />
  </div>`;
};

const generateButtonHTML = (block: ButtonBlock): string => {
    const justifyClass = block.align === 'left' ? 'justify-start' : block.align === 'center' ? 'justify-center' : 'justify-end';
    const variantClass = `btn-${block.variant}`;
    return `  <div class="flex ${justifyClass}">
    <a href="${escapeHTML(block.url)}" class="btn ${variantClass}">${escapeHTML(block.text)}</a>
  </div>`;
};

const escapeHTML = (text: string): string => {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
};

export const generateReact = (page: Page): string => {
    const blocksJSX = page.blocks
        .sort((a, b) => a.position - b.position)
        .map((block) => generateBlockJSX(block))
        .join('\n\n');

    return `import React from 'react';

export const ${toPascalCase(page.slug)}Page = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">{escapeJSXString(page.title)}</h1>
        
        <div className="space-y-4">
${blocksJSX}
        </div>
      </main>
    </div>
  );
};

export default ${toPascalCase(page.slug)}Page;`;
};

const generateBlockJSX = (block: Block): string => {
    switch (block.type) {
        case 'heading':
            return generateHeadingJSX(block);
        case 'text':
            return generateTextJSX(block);
        case 'image':
            return generateImageJSX(block);
        case 'button':
            return generateButtonJSX(block);
    }
};

const generateHeadingJSX = (block: HeadingBlock): string => {
    const alignClass = block.align === 'left' ? 'text-left' : block.align === 'center' ? 'text-center' : 'text-right';
    const sizeClass = block.level === 1 ? 'text-4xl font-bold' : block.level === 2 ? 'text-3xl font-semibold' : 'text-2xl font-medium';
    const content = escapeJSXString(block.content);
    return `          <h${block.level} className="${sizeClass} ${alignClass}">
            ${content}
          </h${block.level}>`;
};

const generateTextJSX = (block: TextBlock): string => {
    const alignClass = block.align === 'left' ? 'text-left' : block.align === 'center' ? 'text-center' : 'text-right';
    const content = escapeJSXString(block.content);
    return `          <p className="text-base ${alignClass}">
            ${content}
          </p>`;
};

const generateImageJSX = (block: ImageBlock): string => {
    const widthStyle = block.width === 'auto' ? '' : ` style={{ width: '${block.width}' }}`;
    const url = escapeJSXString(block.url);
    const alt = escapeJSXString(block.alt);
    return `          <div className="flex justify-center">
            <img 
              src="${url}" 
              alt="${alt}" 
              className="rounded-md"
              ${widthStyle}
            />
          </div>`;
};

const generateButtonJSX = (block: ButtonBlock): string => {
    const justifyClass = block.align === 'left' ? 'justify-start' : block.align === 'center' ? 'justify-center' : 'justify-end';
    const url = escapeJSXString(block.url);
    const text = escapeJSXString(block.text);
    return `          <div className="flex ${justifyClass}">
            <a 
              href="${url}" 
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              ${text}
            </a>
          </div>`;
};

const escapeJSXString = (text: string): string => {
    if (!text) return '""';
    return `"${text
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t')}"`;
};

const toPascalCase = (str: string): string => {
    return str
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
};

