import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, DollarSign, Wheat, TreePine, Flower } from 'lucide-react';

interface CropData {
  name: string;
  icon: React.ReactNode;
  yield: string;
  profit: string;
  suitability: number;
  growthPeriod: string;
  description: string;
}

interface CropRecommendationsProps {
  formData: {
    soilType: string;
    waterAvailability: string;
    season: string;
  };
}

const CropRecommendations: React.FC<CropRecommendationsProps> = ({ formData }) => {
  // Simulated crop recommendations based on inputs
  const getCropRecommendations = (): CropData[] => {
    const { soilType, waterAvailability, season } = formData;
    
    // This is a simplified recommendation logic
    const allCrops: CropData[] = [
      {
        name: 'Rice',
        icon: <Wheat className="w-8 h-8 text-warning" />,
        yield: '2.5 tons/acre',
        profit: '₹45,000/acre',
        suitability: 95,
        growthPeriod: '120-140 days',
        description: 'High yield variety suitable for your conditions',
      },
      {
        name: 'Wheat',
        icon: <Wheat className="w-8 h-8 text-yellow-600" />,
        yield: '2.0 tons/acre',
        profit: '₹38,000/acre',
        suitability: 88,
        growthPeriod: '110-120 days',
        description: 'Drought-resistant variety with good market demand',
      },
      {
        name: 'Sugarcane',
        icon: <TreePine className="w-8 h-8 text-success" />,
        yield: '35 tons/acre',
        profit: '₹85,000/acre',
        suitability: 82,
        growthPeriod: '10-12 months',
        description: 'Long-term crop with high profit potential',
      },
      {
        name: 'Cotton',
        icon: <Flower className="w-8 h-8 text-info" />,
        yield: '1.5 tons/acre',
        profit: '₹52,000/acre',
        suitability: 75,
        growthPeriod: '160-180 days',
        description: 'Cash crop with export potential',
      },
    ];

    // Filter and sort based on conditions
    let recommendations = [...allCrops];
    
    if (waterAvailability === 'scarce' || waterAvailability === 'limited') {
      recommendations = recommendations.filter(crop => 
        crop.name !== 'Rice' && crop.name !== 'Sugarcane'
      );
    }
    
    if (season === 'winter') {
      recommendations = recommendations.map(crop => ({
        ...crop,
        suitability: crop.name === 'Wheat' ? Math.min(crop.suitability + 10, 100) : crop.suitability - 5
      }));
    }
    
    return recommendations.sort((a, b) => b.suitability - a.suitability).slice(0, 3);
  };

  const recommendations = getCropRecommendations();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary mb-2">Recommended Crops</h2>
        <p className="text-muted-foreground">Based on your farm conditions</p>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {recommendations.map((crop, index) => (
          <Card key={crop.name} className={`relative overflow-hidden ${index === 0 ? 'ring-2 ring-primary' : ''}`}>
            {index === 0 && (
              <div className="absolute top-2 right-2">
                <Badge variant="default" className="bg-gradient-primary">
                  Best Match
                </Badge>
              </div>
            )}
            
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                {crop.icon}
                <div className="text-right">
                  <span className="text-2xl font-bold text-primary">{crop.suitability}%</span>
                  <p className="text-xs text-muted-foreground">Match Score</p>
                </div>
              </div>
              <CardTitle className="text-xl">{crop.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{crop.description}</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Suitability</span>
                  <span className="font-semibold">{crop.suitability}%</span>
                </div>
                <Progress value={crop.suitability} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs">Expected Yield</span>
                  </div>
                  <p className="font-semibold text-sm">{crop.yield}</p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-xs">Est. Profit</span>
                  </div>
                  <p className="font-semibold text-sm text-success">{crop.profit}</p>
                </div>
              </div>

              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">Growth Period</p>
                <p className="font-semibold text-sm">{crop.growthPeriod}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CropRecommendations;