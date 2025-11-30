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
        description: 'Современная лендинг-страница с hero-секцией, функциями и CTA',
        thumbnail: '🎯',
        create: (): Page => {
            const baseId = Date.now();
            const blocks: Block[] = [
                {
                    id: `${baseId}-1`,
                    type: 'heading',
                    content: 'Добро пожаловать',
                    level: 1,
                    align: 'center',
                    position: 0,
                    styles: {
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        margin: '2rem 0',
                    },
                },
                {
                    id: `${baseId}-2`,
                    type: 'text',
                    content: 'Создавайте красивые веб-сайты без программирования. Профессиональный конструктор с drag & drop редактором.',
                    align: 'center',
                    position: 1,
                    styles: {
                        fontSize: '1.25rem',
                        margin: '1rem 0',
                    },
                },
                {
                    id: `${baseId}-3`,
                    type: 'button',
                    text: 'Начать',
                    url: '#',
                    variant: 'primary',
                    align: 'center',
                    position: 2,
                    styles: {
                        margin: '2rem 0',
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
                    content: 'Наши возможности',
                    level: 2,
                    align: 'center',
                    position: 4,
                    styles: {
                        fontSize: '2rem',
                        fontWeight: 'semibold',
                        margin: '2rem 0',
                    },
                },
                {
                    id: `${baseId}-6`,
                    type: 'container',
                    blocks: [
                        {
                            id: `${baseId}-6-1`,
                            type: 'card',
                            title: 'Быстро',
                            content: 'Создавайте страницы за минуты',
                            position: 0,
                        },
                        {
                            id: `${baseId}-6-2`,
                            type: 'card',
                            title: 'Просто',
                            content: 'Интуитивный интерфейс без сложностей',
                            position: 1,
                        },
                        {
                            id: `${baseId}-6-3`,
                            type: 'card',
                            title: 'Гибко',
                            content: 'Полный контроль над дизайном',
                            position: 2,
                        },
                    ],
                    layout: 'horizontal',
                    gap: '1.5rem',
                    position: 5,
                    styles: {
                        margin: '2rem 0',
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
        description: 'Страница о компании с информацией и командой',
        thumbnail: '👥',
        create: (): Page => {
            const baseId = Date.now();
            const blocks: Block[] = [
                {
                    id: `${baseId}-1`,
                    type: 'heading',
                    content: 'О нас',
                    level: 1,
                    align: 'center',
                    position: 0,
                    styles: {
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        margin: '2rem 0',
                    },
                },
                {
                    id: `${baseId}-2`,
                    type: 'image',
                    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
                    alt: 'Team',
                    width: '100%',
                    position: 1,
                    styles: {
                        borderRadius: '0.5rem',
                        margin: '2rem 0',
                    },
                },
                {
                    id: `${baseId}-3`,
                    type: 'heading',
                    content: 'Наша история',
                    level: 2,
                    align: 'left',
                    position: 2,
                    styles: {
                        fontSize: '2rem',
                        fontWeight: 'semibold',
                        margin: '2rem 0 1rem 0',
                    },
                },
                {
                    id: `${baseId}-4`,
                    type: 'text',
                    content: 'Мы команда профессионалов, которая создает инновационные решения для бизнеса. Наша миссия - помочь компаниям достичь успеха с помощью современных технологий.',
                    align: 'left',
                    position: 3,
                    styles: {
                        fontSize: '1.125rem',
                        margin: '1rem 0',
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
                    content: 'Наши ценности',
                    level: 2,
                    align: 'left',
                    position: 5,
                    styles: {
                        fontSize: '2rem',
                        fontWeight: 'semibold',
                        margin: '2rem 0 1rem 0',
                    },
                },
                {
                    id: `${baseId}-7`,
                    type: 'list',
                    items: [
                        'Инновации и креативность',
                        'Качество и надежность',
                        'Клиентоориентированность',
                        'Командная работа',
                    ],
                    listType: 'unordered',
                    position: 6,
                    styles: {
                        fontSize: '1.125rem',
                        margin: '1rem 0',
                    },
                },
            ];

            return {
                id: Date.now().toString(),
                title: 'О нас',
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
        description: 'Страница контактов с информацией и формой',
        thumbnail: '📧',
        create: (): Page => {
            const baseId = Date.now();
            const blocks: Block[] = [
                {
                    id: `${baseId}-1`,
                    type: 'heading',
                    content: 'Свяжитесь с нами',
                    level: 1,
                    align: 'center',
                    position: 0,
                    styles: {
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        margin: '2rem 0',
                    },
                },
                {
                    id: `${baseId}-2`,
                    type: 'text',
                    content: 'Мы всегда рады ответить на ваши вопросы. Свяжитесь с нами любым удобным способом.',
                    align: 'center',
                    position: 1,
                    styles: {
                        fontSize: '1.25rem',
                        margin: '1rem 0',
                    },
                },
                {
                    id: `${baseId}-3`,
                    type: 'spacer',
                    height: '2rem',
                    position: 2,
                },
                {
                    id: `${baseId}-4`,
                    type: 'container',
                    blocks: [
                        {
                            id: `${baseId}-4-1`,
                            type: 'card',
                            title: 'Email',
                            content: 'info@example.com',
                            buttonText: 'Написать',
                            buttonUrl: 'mailto:info@example.com',
                            position: 0,
                        },
                        {
                            id: `${baseId}-4-2`,
                            type: 'card',
                            title: 'Телефон',
                            content: '+7 (999) 123-45-67',
                            buttonText: 'Позвонить',
                            buttonUrl: 'tel:+79991234567',
                            position: 1,
                        },
                        {
                            id: `${baseId}-4-3`,
                            type: 'card',
                            title: 'Адрес',
                            content: 'Москва, ул. Примерная, д. 1',
                            position: 2,
                        },
                    ],
                    layout: 'horizontal',
                    gap: '1.5rem',
                    position: 3,
                    styles: {
                        margin: '2rem 0',
                    },
                },
                {
                    id: `${baseId}-5`,
                    type: 'spacer',
                    height: '3rem',
                    position: 4,
                },
                {
                    id: `${baseId}-6`,
                    type: 'heading',
                    content: 'Рабочее время',
                    level: 2,
                    align: 'center',
                    position: 5,
                    styles: {
                        fontSize: '2rem',
                        fontWeight: 'semibold',
                        margin: '2rem 0',
                    },
                },
                {
                    id: `${baseId}-7`,
                    type: 'list',
                    items: [
                        'Понедельник - Пятница: 9:00 - 18:00',
                        'Суббота: 10:00 - 16:00',
                        'Воскресенье: Выходной',
                    ],
                    listType: 'ordered',
                    position: 6,
                    styles: {
                        fontSize: '1.125rem',
                        margin: '1rem 0',
                    },
                },
            ];

            return {
                id: Date.now().toString(),
                title: 'Контакты',
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
        description: 'Шаблон для блог-поста с заголовком, текстом и изображениями',
        thumbnail: '📝',
        create: (): Page => {
            const baseId = Date.now();
            const blocks: Block[] = [
                {
                    id: `${baseId}-1`,
                    type: 'heading',
                    content: 'Заголовок статьи',
                    level: 1,
                    align: 'left',
                    position: 0,
                    styles: {
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        margin: '2rem 0 1rem 0',
                    },
                },
                {
                    id: `${baseId}-2`,
                    type: 'text',
                    content: 'Дата публикации: ' + new Date().toLocaleDateString('ru-RU'),
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
                    url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
                    alt: 'Blog image',
                    width: '100%',
                    position: 2,
                    styles: {
                        borderRadius: '0.5rem',
                        margin: '2rem 0',
                    },
                },
                {
                    id: `${baseId}-4`,
                    type: 'text',
                    content: 'Это введение к вашей статье. Здесь вы можете кратко описать тему и заинтересовать читателя.',
                    align: 'left',
                    position: 3,
                    styles: {
                        fontSize: '1.25rem',
                        fontWeight: 'medium',
                        margin: '2rem 0',
                    },
                },
                {
                    id: `${baseId}-5`,
                    type: 'heading',
                    content: 'Подзаголовок',
                    level: 2,
                    align: 'left',
                    position: 4,
                    styles: {
                        fontSize: '2rem',
                        fontWeight: 'semibold',
                        margin: '2rem 0 1rem 0',
                    },
                },
                {
                    id: `${baseId}-6`,
                    type: 'text',
                    content: 'Основной текст статьи. Здесь вы можете подробно раскрыть тему, поделиться опытом или дать советы читателям.',
                    align: 'left',
                    position: 5,
                    styles: {
                        fontSize: '1.125rem',
                        margin: '1rem 0',
                    },
                },
                {
                    id: `${baseId}-7`,
                    type: 'text',
                    content: 'Продолжение статьи с дополнительной информацией и примерами.',
                    align: 'left',
                    position: 6,
                    styles: {
                        fontSize: '1.125rem',
                        margin: '1rem 0',
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
                    content: 'Заключение',
                    level: 2,
                    align: 'left',
                    position: 8,
                    styles: {
                        fontSize: '2rem',
                        fontWeight: 'semibold',
                        margin: '2rem 0 1rem 0',
                    },
                },
                {
                    id: `${baseId}-10`,
                    type: 'text',
                    content: 'Подведите итоги статьи и дайте читателям полезные выводы или призыв к действию.',
                    align: 'left',
                    position: 9,
                    styles: {
                        fontSize: '1.125rem',
                        margin: '1rem 0',
                    },
                },
            ];

            return {
                id: Date.now().toString(),
                title: 'Заголовок статьи',
                slug: 'blog-post',
                blocks,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
        },
    },
    {
        id: 'blank',
        name: 'Пустая страница',
        description: 'Начните с чистого листа',
        thumbnail: '📄',
        create: (): Page => {
            return {
                id: Date.now().toString(),
                title: 'Новая страница',
                slug: 'new-page',
                blocks: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
        },
    },
];

