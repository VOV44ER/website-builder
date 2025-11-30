import React from 'react';
import { VideoBlock } from '@/types/blocks';

interface Props {
    block: VideoBlock;
    isSelected: boolean;
}

export const VideoBlockComponent: React.FC<Props> = ({ block, isSelected }) => {
    const videoStyles: React.CSSProperties = {
        width: block.width,
        ...(block.styles?.borderRadius && { borderRadius: block.styles.borderRadius }),
    };

    return (
        <div
            className={ `p-4 rounded-lg transition-all ${isSelected ? 'ring-2 ring-primary bg-block-hover' : ''
                } cursor-pointer flex justify-center` }
        >
            <video
                src={ block.url }
                controls={ block.controls }
                autoPlay={ block.autoplay }
                loop={ block.loop }
                style={ videoStyles }
                className="rounded-md"
            >
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

