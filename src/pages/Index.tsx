import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, Zap, Palette } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="space-y-4 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">
            Build Pages with
            <span className="block text-primary mt-2">Drag & Drop</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create beautiful landing pages without code. Professional CMS with real-time preview and JSON export.
          </p>
        </div>

        <Button 
          size="lg" 
          onClick={() => navigate('/editor')}
          className="text-lg px-8 py-6 animate-scale-in"
        >
          <Zap className="w-5 h-5 mr-2" />
          Start Building
        </Button>

        <div className="grid md:grid-cols-3 gap-6 pt-12 animate-fade-in">
          <div className="p-6 rounded-lg bg-card border border-border">
            <FileText className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Drag & Drop Editor</h3>
            <p className="text-sm text-muted-foreground">
              Intuitive block-based editor with real-time positioning
            </p>
          </div>
          
          <div className="p-6 rounded-lg bg-card border border-border">
            <Palette className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Multiple Blocks</h3>
            <p className="text-sm text-muted-foreground">
              Text, headings, images, and buttons with full customization
            </p>
          </div>
          
          <div className="p-6 rounded-lg bg-card border border-border">
            <Zap className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">JSON Schema</h3>
            <p className="text-sm text-muted-foreground">
              Export and import pages as JSON for easy data management
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
