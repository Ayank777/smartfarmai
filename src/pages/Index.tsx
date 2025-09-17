import React, { useState, useRef } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CropForm from '@/components/CropForm';
import CropRecommendations from '@/components/CropRecommendations';
import ResourceRequirements from '@/components/ResourceRequirements';
import DiseaseManagement from '@/components/DiseaseManagement';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Wheat, 
  Droplets, 
  Bug, 
  BarChart3, 
  RefreshCw,
  CheckCircle,
  Users,
  Globe
} from 'lucide-react';

const Index = () => {
  const [formData, setFormData] = useState<any>(null);
  const [selectedCrop, setSelectedCrop] = useState<string>('Rice');
  const formRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = (data: any) => {
    setFormData(data);
    // Set default crop based on conditions
    if (data.waterAvailability === 'abundant' && data.season === 'monsoon') {
      setSelectedCrop('Rice');
    } else if (data.season === 'winter') {
      setSelectedCrop('Wheat');
    } else if (data.waterAvailability === 'moderate') {
      setSelectedCrop('Cotton');
    } else {
      setSelectedCrop('Rice');
    }
    
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setFormData(null);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <Hero onGetStarted={handleGetStarted} />

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              How CropAI Helps Farmers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform analyzes your farm conditions to provide personalized recommendations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Wheat className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold">Crop Selection</h3>
                  <p className="text-sm text-muted-foreground">
                    AI-driven recommendations based on soil, water, and season
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 rounded-full bg-info/10">
                    <Droplets className="w-8 h-8 text-info" />
                  </div>
                  <h3 className="font-semibold">Resource Planning</h3>
                  <p className="text-sm text-muted-foreground">
                    Optimize water, fertilizer, and irrigation methods
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 rounded-full bg-destructive/10">
                    <Bug className="w-8 h-8 text-destructive" />
                  </div>
                  <h3 className="font-semibold">Disease Prevention</h3>
                  <p className="text-sm text-muted-foreground">
                    Early detection and treatment recommendations
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 rounded-full bg-success/10">
                    <BarChart3 className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="font-semibold">Profit Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Compare yields and maximize profitability
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section ref={formRef} className="py-16 bg-muted/30" id="predict">
        <div className="container mx-auto px-4">
          <CropForm onSubmit={handleFormSubmit} />
        </div>
      </section>

      {/* Results Section */}
      {formData && (
        <section ref={resultsRef} className="py-16 bg-background" id="resources">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-primary">Your Personalized Recommendations</h2>
                <Button variant="outline" onClick={handleReset}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  New Analysis
                </Button>
              </div>

              <CropRecommendations formData={formData} />

              <Tabs defaultValue="resources" className="mt-8">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                  <TabsTrigger value="diseases">Disease Management</TabsTrigger>
                  <TabsTrigger value="comparison">Crop Comparison</TabsTrigger>
                </TabsList>

                <TabsContent value="resources" className="mt-6">
                  <ResourceRequirements cropName={selectedCrop} />
                </TabsContent>

                <TabsContent value="diseases" className="mt-6">
                  <DiseaseManagement cropName={selectedCrop} />
                </TabsContent>

                <TabsContent value="comparison" className="mt-6">
                  <Card className="p-6">
                    <div className="text-center space-y-4">
                      <BarChart3 className="w-16 h-16 mx-auto text-primary" />
                      <h3 className="text-xl font-semibold">Crop Comparison Tool</h3>
                      <p className="text-muted-foreground">
                        Compare multiple crops side-by-side to make the best decision for your farm
                      </p>
                      <Button variant="hero">
                        Coming Soon
                      </Button>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-16 bg-gradient-earth text-earth-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-sm opacity-90">Farmers Helped</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">40%</div>
              <div className="text-sm opacity-90">Avg. Yield Increase</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-sm opacity-90">Crop Varieties</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-sm opacity-90">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-background border-t" id="about">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-3">About CropAI</h4>
              <p className="text-sm text-muted-foreground">
                Empowering farmers with AI-driven insights for sustainable and profitable agriculture.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  Personalized Recommendations
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  Disease Prevention
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  Resource Optimization
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Support: 1800-CROP-AI
                </p>
                <p className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  www.cropai.com
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2024 CropAI. Helping farmers grow smarter.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;