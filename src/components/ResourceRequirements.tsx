import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Droplets, Sprout, Sparkles, CloudRain } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ResourceRequirementsProps {
  cropName: string;
}

const ResourceRequirements: React.FC<ResourceRequirementsProps> = ({ cropName }) => {
  // Simulated resource data based on crop
  const getResourceData = () => {
    const resources = {
      Rice: {
        water: '1200-1500 mm',
        waterFrequency: 'Daily during initial growth',
        fertilizers: [
          { name: 'NPK (12:32:16)', amount: '100 kg/acre', timing: 'At sowing' },
          { name: 'Urea', amount: '50 kg/acre', timing: 'After 30 days' },
          { name: 'Zinc Sulphate', amount: '10 kg/acre', timing: 'At tillering' },
        ],
        irrigation: 'Flood irrigation or Drip system',
        soilPrep: 'Puddling required, maintain 5-10cm water level',
      },
      Wheat: {
        water: '400-650 mm',
        waterFrequency: 'Every 10-15 days',
        fertilizers: [
          { name: 'DAP', amount: '50 kg/acre', timing: 'At sowing' },
          { name: 'Urea', amount: '40 kg/acre', timing: 'First irrigation' },
          { name: 'Potash', amount: '20 kg/acre', timing: 'Before flowering' },
        ],
        irrigation: 'Sprinkler or Furrow irrigation',
        soilPrep: 'Well-drained soil, avoid waterlogging',
      },
      Sugarcane: {
        water: '1500-2500 mm',
        waterFrequency: 'Weekly in summer, bi-weekly in winter',
        fertilizers: [
          { name: 'FYM', amount: '10 tons/acre', timing: 'Before planting' },
          { name: 'NPK (19:19:19)', amount: '150 kg/acre', timing: 'At planting' },
          { name: 'Urea', amount: '100 kg/acre', timing: 'After 90 days' },
        ],
        irrigation: 'Drip irrigation recommended',
        soilPrep: 'Deep plowing, ridge and furrow method',
      },
      Cotton: {
        water: '550-950 mm',
        waterFrequency: 'Every 15-20 days',
        fertilizers: [
          { name: 'NPK (10:26:26)', amount: '80 kg/acre', timing: 'At sowing' },
          { name: 'Urea', amount: '60 kg/acre', timing: 'First square formation' },
          { name: 'MOP', amount: '25 kg/acre', timing: 'At flowering' },
        ],
        irrigation: 'Drip or Furrow irrigation',
        soilPrep: 'Deep plowing, raised bed cultivation',
      },
    };

    return resources[cropName as keyof typeof resources] || resources.Rice;
  };

  const data = getResourceData();

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-primary text-center">Resource Requirements for {cropName}</h3>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Droplets className="w-5 h-5 text-info" />
              Water Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Total Water Needed</p>
              <p className="text-xl font-bold text-info">{data.water}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Irrigation Frequency</p>
              <p className="font-semibold">{data.waterFrequency}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <CloudRain className="w-5 h-5 text-accent" />
              Irrigation Method
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Recommended System</p>
              <p className="font-semibold">{data.irrigation}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Soil Preparation</p>
              <p className="text-sm">{data.soilPrep}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sprout className="w-5 h-5 text-success" />
            Fertilizer Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.fertilizers.map((fertilizer, index) => (
              <div key={index} className="flex items-start justify-between p-3 rounded-lg bg-muted/50">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-warning" />
                    <span className="font-semibold">{fertilizer.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{fertilizer.amount}</p>
                </div>
                <Badge variant="secondary" className="ml-2">
                  {fertilizer.timing}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceRequirements;