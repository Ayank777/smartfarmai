import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, TrendingUp, Shield } from 'lucide-react';
import heroField from '@/assets/hero-field.jpg';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroField})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background/90" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/20 border border-warning/30">
            <Sparkles className="w-4 h-4 text-warning" />
            <span className="text-sm font-medium">AI-Powered Agricultural Intelligence</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="text-primary">Maximize Your</span>{' '}
              <span className="bg-gradient-secondary bg-clip-text text-transparent">
                Crop Yield
              </span>{' '}
              <span className="text-primary">with AI</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Get personalized crop recommendations, optimize resources, and increase profitability with our intelligent farming assistant
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="hero"
              size="xl"
              onClick={onGetStarted}
              className="group"
            >
              Get Crop Recommendation
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl">
              Learn How It Works
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/80 backdrop-blur">
              <TrendingUp className="w-8 h-8 text-success" />
              <span className="font-semibold">Increase Yield</span>
              <span className="text-sm text-muted-foreground">Up to 40% higher production</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/80 backdrop-blur">
              <Shield className="w-8 h-8 text-info" />
              <span className="font-semibold">Prevent Diseases</span>
              <span className="text-sm text-muted-foreground">Early detection & treatment</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/80 backdrop-blur">
              <Sparkles className="w-8 h-8 text-warning" />
              <span className="font-semibold">Smart Resources</span>
              <span className="text-sm text-muted-foreground">Optimize water & fertilizers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;