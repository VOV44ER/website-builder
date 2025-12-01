import { Page, Block } from '@/types/blocks';

export interface PageTemplate {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
    create: () => Page;
}

export const pageTemplates: PageTemplate[] = [
    {
        id: 'landing',
        name: 'Landing Page',
        description: 'Modern landing page with hero section, features, and call-to-action',
        thumbnail: '🎯',
        create: (): Page => {
            const baseId = Date.now();
            const blocks: Block[] = [
                {
                    id: `${baseId}-1`,
                    type: 'heading',
                    content: 'Welcome to Our Platform',
                    level: 1,
                    align: 'center',
                    position: 0,
                    styles: {
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontWeight: 'bold',
                        margin: '3rem 0 1.5rem 0',
                        textColor: '#1a1a1a',
                    },
                },
                {
                    id: `${baseId}-2`,
                    type: 'text',
                    content: 'Build beautiful websites without coding. Professional drag & drop editor with real-time preview and export capabilities.',
                    align: 'center',
                    position: 1,
                    styles: {
                        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                        margin: '0 0 2.5rem 0',
                        textColor: '#4b5563',
                    },
                },
                {
                    id: `${baseId}-3`,
                    type: 'button',
                    text: 'Get Started',
                    url: '#',
                    variant: 'primary',
                    align: 'center',
                    position: 2,
                    styles: {
                        margin: '0 0 4rem 0',
                        fontSize: '1.125rem',
                        padding: '0.75rem 2rem',
                    },
                },
                {
                    id: `${baseId}-4`,
                    type: 'spacer',
                    height: '4rem',
                    position: 3,
                },
                {
                    id: `${baseId}-5`,
                    type: 'heading',
                    content: 'Why Choose Us',
                    level: 2,
                    align: 'center',
                    position: 4,
                    styles: {
                        fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                        fontWeight: 'semibold',
                        margin: '0 0 3rem 0',
                        textColor: '#1a1a1a',
                    },
                },
                {
                    id: `${baseId}-6`,
                    type: 'container',
                    blocks: [
                        {
                            id: `${baseId}-6-1`,
                            type: 'card',
                            title: 'Lightning Fast',
                            content: 'Create stunning pages in minutes with our intuitive drag & drop interface',
                            imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400',
                            position: 0,
                            styles: {
                                backgroundColor: '#ffffff',
                                borderRadius: '1rem',
                                padding: '1rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                minWidth: '280px',
                                flex: '1 1 300px',
                            },
                        },
                        {
                            id: `${baseId}-6-2`,
                            type: 'card',
                            title: 'Fully Customizable',
                            content: 'Complete control over design with advanced styling options and responsive layouts',
                            imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
                            position: 1,
                            styles: {
                                backgroundColor: '#ffffff',
                                borderRadius: '1rem',
                                padding: '1rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                minWidth: '280px',
                                flex: '1 1 300px',
                            },
                        },
                        {
                            id: `${baseId}-6-3`,
                            type: 'card',
                            title: 'Export Ready',
                            content: 'Export your pages as HTML or React components for seamless integration',
                            imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
                            position: 2,
                            styles: {
                                backgroundColor: '#ffffff',
                                borderRadius: '1rem',
                                padding: '1rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                minWidth: '280px',
                                flex: '1 1 300px',
                            },
                        },
                    ],
                    layout: 'horizontal',
                    gap: '1.5rem',
                    position: 5,
                    styles: {
                        margin: '0 0 4rem 0',
                        padding: '0.5rem',
                    },
                },
            ];

            return {
                id: Date.now().toString(),
                title: 'Landing Page',
                slug: 'landing-page',
                blocks,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
        },
    },
    {
        id: 'about',
        name: 'About Page',
        description: 'Company information page with team details and values',
        thumbnail: '👥',
        create: (): Page => {
            const baseId = Date.now();
            const blocks: Block[] = [
                {
                    id: `${baseId}-1`,
                    type: 'heading',
                    content: 'About Us',
                    level: 1,
                    align: 'center',
                    position: 0,
                    styles: {
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontWeight: 'bold',
                        margin: '3rem 0 2rem 0',
                        textColor: '#1a1a1a',
                    },
                },
                {
                    id: `${baseId}-2`,
                    type: 'image',
                    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200',
                    alt: 'Our Team',
                    width: '100%',
                    position: 1,
                    styles: {
                        borderRadius: '1rem',
                        margin: '0 0 3rem 0',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    },
                },
                {
                    id: `${baseId}-3`,
                    type: 'heading',
                    content: 'Our Story',
                    level: 2,
                    align: 'left',
                    position: 2,
                    styles: {
                        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                        fontWeight: 'semibold',
                        margin: '0 0 1rem 0',
                        textColor: '#1a1a1a',
                    },
                },
                {
                    id: `${baseId}-4`,
                    type: 'text',
                    content: 'We are a team of professionals dedicated to creating innovative solutions for businesses. Our mission is to help companies achieve success through modern technology and creative thinking. With years of experience in web development and design, we bring expertise and passion to every project.',
                    align: 'left',
                    position: 3,
                    styles: {
                        fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                        margin: '0 0 2rem 0',
                        textColor: '#4b5563',
                        lineHeight: '1.75',
                    },
                },
                {
                    id: `${baseId}-5`,
                    type: 'divider',
                    style: 'solid',
                    thickness: '2px',
                    color: '#e5e7eb',
                    position: 4,
                    styles: {
                        margin: '3rem 0',
                    },
                },
                {
                    id: `${baseId}-6`,
                    type: 'heading',
                    content: 'Our Values',
                    level: 2,
                    align: 'left',
                    position: 5,
                    styles: {
                        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                        fontWeight: 'semibold',
                        margin: '0 0 1.5rem 0',
                        textColor: '#1a1a1a',
                    },
                },
                {
                    id: `${baseId}-7`,
                    type: 'list',
                    items: [
                        'Innovation and Creativity - We push boundaries and explore new possibilities',
                        'Quality and Reliability - Excellence in every project we deliver',
                        'Client-Focused - Your success is our priority',
                        'Team Collaboration - Together we achieve more',
                    ],
                    listType: 'unordered',
                    position: 6,
                    styles: {
                        fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                        margin: '0 0 2rem 0',
                        textColor: '#4b5563',
                        lineHeight: '1.75',
                    },
                },
            ];

            return {
                id: Date.now().toString(),
                title: 'About Us',
                slug: 'about',
                blocks,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
        },
    },
    {
        id: 'contact',
        name: 'Contact Page',
        description: 'Contact information page with multiple ways to reach out',
        thumbnail: '📧',
        create: (): Page => {
            const baseId = Date.now();
            const blocks: Block[] = [
                {
                    id: `${baseId}-1`,
                    type: 'heading',
                    content: 'Get in Touch',
                    level: 1,
                    align: 'center',
                    position: 0,
                    styles: {
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontWeight: 'bold',
                        margin: '3rem 0 1.5rem 0',
                        textColor: '#1a1a1a',
                    },
                },
                {
                    id: `${baseId}-2`,
                    type: 'text',
                    content: 'We\'re always happy to answer your questions. Reach out to us through any of the following channels.',
                    align: 'center',
                    position: 1,
                    styles: {
                        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                        margin: '0 0 3rem 0',
                        textColor: '#4b5563',
                    },
                },
                {
                    id: `${baseId}-3`,
                    type: 'container',
                    blocks: [
                        {
                            id: `${baseId}-3-1`,
                            type: 'card',
                            title: 'Email Us',
                            content: 'Send us an email and we\'ll respond within 24 hours',
                            buttonText: 'Send Email',
                            buttonUrl: 'mailto:info@example.com',
                            position: 0,
                            styles: {
                                backgroundColor: '#ffffff',
                                borderRadius: '1rem',
                                padding: '1.5rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                minWidth: '280px',
                                flex: '1 1 300px',
                            },
                        },
                        {
                            id: `${baseId}-3-2`,
                            type: 'card',
                            title: 'Call Us',
                            content: 'Speak directly with our team during business hours',
                            buttonText: 'Call Now',
                            buttonUrl: 'tel:+1234567890',
                            position: 1,
                            styles: {
                                backgroundColor: '#ffffff',
                                borderRadius: '1rem',
                                padding: '1.5rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                minWidth: '280px',
                                flex: '1 1 300px',
                            },
                        },
                        {
                            id: `${baseId}-3-3`,
                            type: 'card',
                            title: 'Visit Us',
                            content: '123 Business Street, Suite 100, City, State 12345',
                            position: 2,
                            styles: {
                                backgroundColor: '#ffffff',
                                borderRadius: '1rem',
                                padding: '1.5rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                minWidth: '280px',
                                flex: '1 1 300px',
                            },
                        },
                    ],
                    layout: 'horizontal',
                    gap: '1.5rem',
                    position: 2,
                    styles: {
                        margin: '0 0 4rem 0',
                        padding: '0.5rem',
                    },
                },
                {
                    id: `${baseId}-4`,
                    type: 'spacer',
                    height: '3rem',
                    position: 3,
                },
                {
                    id: `${baseId}-5`,
                    type: 'heading',
                    content: 'Business Hours',
                    level: 2,
                    align: 'center',
                    position: 4,
                    styles: {
                        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                        fontWeight: 'semibold',
                        margin: '0 0 2rem 0',
                        textColor: '#1a1a1a',
                    },
                },
                {
                    id: `${baseId}-6`,
                    type: 'list',
                    items: [
                        'Monday - Friday: 9:00 AM - 6:00 PM',
                        'Saturday: 10:00 AM - 4:00 PM',
                        'Sunday: Closed',
                    ],
                    listType: 'ordered',
                    position: 5,
                    styles: {
                        fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                        margin: '0 auto 2rem auto',
                        textColor: '#4b5563',
                        maxWidth: '600px',
                    },
                },
            ];

            return {
                id: Date.now().toString(),
                title: 'Contact Us',
                slug: 'contact',
                blocks,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
        },
    },
    {
        id: 'blog',
        name: 'Blog Post',
        description: 'Blog post template with title, content, and images',
        thumbnail: '📝',
        create: (): Page => {
            const baseId = Date.now();
            const blocks: Block[] = [
                {
                    id: `${baseId}-1`,
                    type: 'heading',
                    content: 'The Future of Web Development',
                    level: 1,
                    align: 'left',
                    position: 0,
                    styles: {
                        fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                        fontWeight: 'bold',
                        margin: '2rem 0 0.5rem 0',
                        textColor: '#1a1a1a',
                    },
                },
                {
                    id: `${baseId}-2`,
                    type: 'text',
                    content: 'Published on ' + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                    align: 'left',
                    position: 1,
                    styles: {
                        fontSize: '0.875rem',
                        textColor: '#6b7280',
                        margin: '0 0 2rem 0',
                    },
                },
                {
                    id: `${baseId}-3`,
                    type: 'image',
                    url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200',
                    alt: 'Blog featured image',
                    width: '100%',
                    position: 2,
                    styles: {
                        borderRadius: '0.75rem',
                        margin: '0 0 2.5rem 0',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    },
                },
                {
                    id: `${baseId}-4`,
                    type: 'text',
                    content: 'This is the introduction to your article. Here you can briefly describe the topic and engage your readers with compelling content that draws them into the rest of your post.',
                    align: 'left',
                    position: 3,
                    styles: {
                        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                        fontWeight: 'medium',
                        margin: '0 0 2rem 0',
                        textColor: '#1a1a1a',
                        lineHeight: '1.75',
                    },
                },
                {
                    id: `${baseId}-5`,
                    type: 'heading',
                    content: 'Main Content Section',
                    level: 2,
                    align: 'left',
                    position: 4,
                    styles: {
                        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                        fontWeight: 'semibold',
                        margin: '2.5rem 0 1rem 0',
                        textColor: '#1a1a1a',
                    },
                },
                {
                    id: `${baseId}-6`,
                    type: 'text',
                    content: 'This is the main body of your article. Here you can elaborate on your topic, share insights, provide examples, and offer valuable information to your readers. Make sure to structure your content in a way that is easy to read and understand.',
                    align: 'left',
                    position: 5,
                    styles: {
                        fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                        margin: '0 0 1.5rem 0',
                        textColor: '#4b5563',
                        lineHeight: '1.75',
                    },
                },
                {
                    id: `${baseId}-7`,
                    type: 'text',
                    content: 'Continue with additional paragraphs that expand on your main points. Use clear transitions between ideas and maintain a consistent tone throughout your article.',
                    align: 'left',
                    position: 6,
                    styles: {
                        fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                        margin: '0 0 1.5rem 0',
                        textColor: '#4b5563',
                        lineHeight: '1.75',
                    },
                },
                {
                    id: `${baseId}-8`,
                    type: 'divider',
                    style: 'dashed',
                    thickness: '1px',
                    color: '#e5e7eb',
                    position: 7,
                    styles: {
                        margin: '3rem 0',
                    },
                },
                {
                    id: `${baseId}-9`,
                    type: 'heading',
                    content: 'Conclusion',
                    level: 2,
                    align: 'left',
                    position: 8,
                    styles: {
                        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                        fontWeight: 'semibold',
                        margin: '2.5rem 0 1rem 0',
                        textColor: '#1a1a1a',
                    },
                },
                {
                    id: `${baseId}-10`,
                    type: 'text',
                    content: 'Wrap up your article with a strong conclusion that summarizes your main points and provides readers with actionable takeaways or a clear call to action.',
                    align: 'left',
                    position: 9,
                    styles: {
                        fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                        margin: '0 0 2rem 0',
                        textColor: '#4b5563',
                        lineHeight: '1.75',
                    },
                },
            ];

            return {
                id: Date.now().toString(),
                title: 'The Future of Web Development',
                slug: 'blog-post',
                blocks,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
        },
    },
    {
        id: 'blank',
        name: 'Blank Page',
        description: 'Start with a clean slate',
        thumbnail: '📄',
        create: (): Page => {
            return {
                id: Date.now().toString(),
                title: 'New Page',
                slug: 'new-page',
                blocks: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
        },
    },
];
