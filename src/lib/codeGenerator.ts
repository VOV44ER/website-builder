import { Page, Block, HeadingBlock, TextBlock, ImageBlock, ButtonBlock, ContainerBlock, VideoBlock, DividerBlock, ListBlock, CardBlock, SpacerBlock } from '@/types/blocks';

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
    case 'container':
      return generateContainerHTML(block);
    case 'video':
      return generateVideoHTML(block);
    case 'divider':
      return generateDividerHTML(block);
    case 'list':
      return generateListHTML(block);
    case 'card':
      return generateCardHTML(block);
    case 'spacer':
      return generateSpacerHTML(block);
  }
};

const generateHeadingHTML = (block: HeadingBlock): string => {
  const alignClass = block.align === 'left' ? 'text-left' : block.align === 'center' ? 'text-center' : 'text-right';
  const styles = generateStyles(block.styles);
  return `  <h${block.level} class="${alignClass}"${styles ? ` style="${styles}"` : ''}>${escapeHTML(block.content)}</h${block.level}>`;
};

const generateTextHTML = (block: TextBlock): string => {
  const alignClass = block.align === 'left' ? 'text-left' : block.align === 'center' ? 'text-center' : 'text-right';
  const styles = generateStyles(block.styles);
  return `  <p class="${alignClass}"${styles ? ` style="${styles}"` : ''}>${escapeHTML(block.content)}</p>`;
};

const generateImageHTML = (block: ImageBlock): string => {
  const widthStyle = block.width === 'auto' ? '' : `width: ${block.width};`;
  const styles = generateStyles(block.styles);
  const combinedStyles = [widthStyle, styles].filter(Boolean).join('; ');
  return `  <div class="flex justify-center"${styles ? ` style="${styles}"` : ''}>
    <img src="${escapeHTML(block.url)}" alt="${escapeHTML(block.alt)}"${combinedStyles ? ` style="${combinedStyles}"` : ''} />
  </div>`;
};

const generateButtonHTML = (block: ButtonBlock): string => {
  const justifyClass = block.align === 'left' ? 'justify-start' : block.align === 'center' ? 'justify-center' : 'justify-end';
  const variantClass = `btn-${block.variant}`;
  const styles = generateStyles(block.styles);
  return `  <div class="flex ${justifyClass}"${styles ? ` style="${styles}"` : ''}>
    <a href="${escapeHTML(block.url)}" class="btn ${variantClass}">${escapeHTML(block.text)}</a>
  </div>`;
};

const generateContainerHTML = (block: ContainerBlock): string => {
  const layoutClass = block.layout === 'horizontal' ? 'flex flex-row' : 'flex flex-col';
  const gap = block.gap || '1rem';
  const styles = generateStyles(block.styles);
  const childrenHTML = block.blocks.map(b => generateBlockHTML(b)).join('\n');
  return `  <div class="${layoutClass}" style="gap: ${gap};${styles ? ` ${styles}` : ''}">
${childrenHTML.split('\n').map(line => '    ' + line).join('\n')}
  </div>`;
};

const generateVideoHTML = (block: VideoBlock): string => {
  const styles = generateStyles(block.styles);
  const autoplayAttr = block.autoplay ? ' autoplay' : '';
  const controlsAttr = block.controls ? ' controls' : '';
  const loopAttr = block.loop ? ' loop' : '';
  return `  <div class="flex justify-center"${styles ? ` style="${styles}"` : ''}>
    <video src="${escapeHTML(block.url)}" width="${block.width}"${autoplayAttr}${controlsAttr}${loopAttr}>
      Your browser does not support the video tag.
    </video>
  </div>`;
};

const generateDividerHTML = (block: DividerBlock): string => {
  const borderStyle = block.style === 'dashed' ? 'dashed' : block.style === 'dotted' ? 'dotted' : 'solid';
  const styles = `border-top: ${block.thickness} ${borderStyle} ${block.color};${generateStyles(block.styles) ? ` ${generateStyles(block.styles)}` : ''}`;
  return `  <hr style="${styles}" />`;
};

const generateListHTML = (block: ListBlock): string => {
  const tag = block.listType === 'ordered' ? 'ol' : 'ul';
  const styles = generateStyles(block.styles);
  const itemsHTML = block.items.map(item => `    <li>${escapeHTML(item)}</li>`).join('\n');
  return `  <${tag} class="list-inside"${styles ? ` style="${styles}"` : ''}>
${itemsHTML}
  </${tag}>`;
};

const generateCardHTML = (block: CardBlock): string => {
  const styles = generateStyles(block.styles);
  const imageHTML = block.imageUrl ? `    <img src="${escapeHTML(block.imageUrl)}" alt="${escapeHTML(block.title)}" style="width: 100%; height: 200px; object-fit: cover;" />` : '';
  const buttonHTML = block.buttonText && block.buttonUrl ? `    <a href="${escapeHTML(block.buttonUrl)}" class="btn btn-outline">${escapeHTML(block.buttonText)}</a>` : '';
  return `  <div class="border rounded-lg overflow-hidden"${styles ? ` style="${styles}"` : ''}>
${imageHTML}
    <div class="p-4">
      <h3>${escapeHTML(block.title)}</h3>
      <p class="text-muted-foreground mb-4">${escapeHTML(block.content)}</p>
${buttonHTML}
    </div>
  </div>`;
};

const generateSpacerHTML = (block: SpacerBlock): string => {
  const styles = `height: ${block.height};${generateStyles(block.styles) ? ` ${generateStyles(block.styles)}` : ''}`;
  return `  <div style="${styles}"></div>`;
};

const generateStyles = (styles?: Block['styles']): string => {
  if (!styles) return '';
  const styleParts: string[] = [];
  if (styles.backgroundColor) styleParts.push(`background-color: ${styles.backgroundColor}`);
  if (styles.textColor) styleParts.push(`color: ${styles.textColor}`);
  if (styles.fontSize) styleParts.push(`font-size: ${styles.fontSize}`);
  if (styles.fontWeight) styleParts.push(`font-weight: ${styles.fontWeight}`);
  if (styles.fontFamily) styleParts.push(`font-family: ${styles.fontFamily}`);
  if (styles.padding) styleParts.push(`padding: ${styles.padding}`);
  if (styles.margin) styleParts.push(`margin: ${styles.margin}`);
  if (styles.borderRadius) styleParts.push(`border-radius: ${styles.borderRadius}`);
  if (styles.borderWidth) styleParts.push(`border-width: ${styles.borderWidth}`);
  if (styles.borderColor) styleParts.push(`border-color: ${styles.borderColor}`);
  if (styles.borderStyle) styleParts.push(`border-style: ${styles.borderStyle}`);
  if (styles.boxShadow) styleParts.push(`box-shadow: ${styles.boxShadow}`);
  return styleParts.join('; ');
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
    case 'container':
      return generateContainerJSX(block);
    case 'video':
      return generateVideoJSX(block);
    case 'divider':
      return generateDividerJSX(block);
    case 'list':
      return generateListJSX(block);
    case 'card':
      return generateCardJSX(block);
    case 'spacer':
      return generateSpacerJSX(block);
  }
};

const generateHeadingJSX = (block: HeadingBlock): string => {
  const alignClass = block.align === 'left' ? 'text-left' : block.align === 'center' ? 'text-center' : 'text-right';
  const sizeClass = block.level === 1 ? 'text-4xl font-bold' : block.level === 2 ? 'text-3xl font-semibold' : 'text-2xl font-medium';
  const content = escapeJSXString(block.content);
  const styles = generateStylesJSX(block.styles);
  return `          <h${block.level} className="${sizeClass} ${alignClass}"${styles ? ` style={${styles}}` : ''}>
            ${content}
          </h${block.level}>`;
};

const generateTextJSX = (block: TextBlock): string => {
  const alignClass = block.align === 'left' ? 'text-left' : block.align === 'center' ? 'text-center' : 'text-right';
  const content = escapeJSXString(block.content);
  const styles = generateStylesJSX(block.styles);
  return `          <p className="text-base ${alignClass}"${styles ? ` style={${styles}}` : ''}>
            ${content}
          </p>`;
};

const generateImageJSX = (block: ImageBlock): string => {
  const url = escapeJSXString(block.url);
  const alt = escapeJSXString(block.alt);
  const styles = generateStylesJSX(block.styles);
  const imageStyles = block.width !== 'auto' ? `{ width: '${block.width}'${styles ? `, ...${styles}` : ''} }` : styles ? `{${styles}}` : '';
  return `          <div className="flex justify-center"${styles ? ` style={${styles}}` : ''}>
            <img 
              src=${url} 
              alt=${alt} 
              className="rounded-md"
              ${imageStyles ? `style=${imageStyles}` : ''}
            />
          </div>`;
};

const generateButtonJSX = (block: ButtonBlock): string => {
  const justifyClass = block.align === 'left' ? 'justify-start' : block.align === 'center' ? 'justify-center' : 'justify-end';
  const url = escapeJSXString(block.url);
  const text = escapeJSXString(block.text);
  const styles = generateStylesJSX(block.styles);
  return `          <div className="flex ${justifyClass}"${styles ? ` style={${styles}}` : ''}>
            <a 
              href="${url}" 
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              ${text}
            </a>
          </div>`;
};

const generateContainerJSX = (block: ContainerBlock): string => {
  const layoutClass = block.layout === 'horizontal' ? 'flex flex-row' : 'flex flex-col';
  const gap = block.gap || '1rem';
  const styles = generateStylesJSX(block.styles);
  const childrenJSX = block.blocks.map(b => generateBlockJSX(b)).join('\n');
  return `          <div className="${layoutClass}" style={{ gap: '${gap}'${styles ? `, ...${styles}` : ''}}}>
${childrenJSX.split('\n').map(line => '            ' + line).join('\n')}
          </div>`;
};

const generateVideoJSX = (block: VideoBlock): string => {
  const url = escapeJSXString(block.url);
  const styles = generateStylesJSX(block.styles);
  const videoProps = [
    `src=${url}`,
    `width=${escapeJSXString(block.width)}`,
    block.autoplay ? 'autoPlay' : '',
    block.controls ? 'controls' : '',
    block.loop ? 'loop' : '',
  ].filter(Boolean).join('\n              ');
  return `          <div className="flex justify-center"${styles ? ` style={${styles}}` : ''}>
            <video 
              ${videoProps}
            >
              Your browser does not support the video tag.
            </video>
          </div>`;
};

const generateDividerJSX = (block: DividerBlock): string => {
  const borderStyle = block.style === 'dashed' ? 'dashed' : block.style === 'dotted' ? 'dotted' : 'solid';
  const styles = `{ borderTop: '${block.thickness} ${borderStyle} ${block.color}'${generateStylesJSX(block.styles) ? `, ...${generateStylesJSX(block.styles)}` : ''} }`;
  return `          <hr style=${styles} className="border-0" />`;
};

const generateListJSX = (block: ListBlock): string => {
  const tag = block.listType === 'ordered' ? 'ol' : 'ul';
  const styles = generateStylesJSX(block.styles);
  const itemsJSX = block.items.map(item => `            <li>${escapeJSXString(item)}</li>`).join('\n');
  return `          <${tag} className="list-inside space-y-2"${styles ? ` style={${styles}}` : ''}>
${itemsJSX}
          </${tag}>`;
};

const generateCardJSX = (block: CardBlock): string => {
  const styles = generateStylesJSX(block.styles);
  const imageJSX = block.imageUrl ? `            <img src={${escapeJSXString(block.imageUrl)}} alt={${escapeJSXString(block.title)}} className="w-full h-48 object-cover" />` : '';
  const buttonJSX = block.buttonText && block.buttonUrl ? `            <a href={${escapeJSXString(block.buttonUrl)}} className="px-4 py-2 rounded-md border border-input hover:bg-accent">
              ${escapeJSXString(block.buttonText)}
            </a>` : '';
  return `          <div className="border rounded-lg overflow-hidden"${styles ? ` style={${styles}}` : ''}>
${imageJSX}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">${escapeJSXString(block.title)}</h3>
              <p className="text-muted-foreground mb-4">${escapeJSXString(block.content)}</p>
${buttonJSX}
            </div>
          </div>`;
};

const generateSpacerJSX = (block: SpacerBlock): string => {
  const styles = `{ height: '${block.height}'${generateStylesJSX(block.styles) ? `, ...${generateStylesJSX(block.styles)}` : ''} }`;
  return `          <div style=${styles}></div>`;
};

const generateStylesJSX = (styles?: Block['styles']): string => {
  if (!styles) return '';
  const styleObj: Record<string, string> = {};
  if (styles.backgroundColor) styleObj.backgroundColor = styles.backgroundColor;
  if (styles.textColor) styleObj.color = styles.textColor;
  if (styles.fontSize) styleObj.fontSize = styles.fontSize;
  if (styles.fontWeight) styleObj.fontWeight = styles.fontWeight;
  if (styles.fontFamily) styleObj.fontFamily = styles.fontFamily;
  if (styles.padding) styleObj.padding = styles.padding;
  if (styles.margin) styleObj.margin = styles.margin;
  if (styles.borderRadius) styleObj.borderRadius = styles.borderRadius;
  if (styles.borderWidth) styleObj.borderWidth = styles.borderWidth;
  if (styles.borderColor) styleObj.borderColor = styles.borderColor;
  if (styles.borderStyle) styleObj.borderStyle = styles.borderStyle;
  if (styles.boxShadow) styleObj.boxShadow = styles.boxShadow;
  return JSON.stringify(styleObj);
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

