import React from 'react';
import { Monitor, Smartphone, Tablet } from 'lucide-react';

export const MobileNotSupported: React.FC = () => {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="space-y-4">
                    <div className="flex justify-center gap-4">
                        <Monitor className="w-12 h-12 text-primary" />
                        <Tablet className="w-12 h-12 text-muted-foreground" />
                        <Smartphone className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <h1 className="text-3xl font-bold text-foreground">
                        Desktop Only
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Unfortunately, the editor is not available on mobile and tablet devices.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Please access the editor from a desktop or laptop computer for the best experience.
                    </p>
                </div>
                <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                        The editor requires a larger screen and precise mouse/trackpad control for optimal use.
                    </p>
                </div>
            </div>
        </div>
    );
};

