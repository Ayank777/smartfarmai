import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield, AlertTriangle, Bug, Leaf } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface DiseaseManagementProps {
  cropName: string;
}

interface Disease {
  name: string;
  risk: 'high' | 'medium' | 'low';
  symptoms: string[];
  prevention: string[];
  treatment: string[];
  pesticide: string;
}

const DiseaseManagement: React.FC<DiseaseManagementProps> = ({ cropName }) => {
  const getDiseaseData = (): Disease[] => {
    const diseases = {
      Rice: [
        {
          name: 'Blast Disease',
          risk: 'high' as const,
          symptoms: ['Brown spots on leaves', 'Neck rot', 'White center lesions'],
          prevention: ['Use resistant varieties', 'Avoid excess nitrogen', 'Maintain field sanitation'],
          treatment: ['Apply Tricyclazole 75% WP', 'Spray at tillering stage', 'Repeat after 10 days'],
          pesticide: 'Tricyclazole 0.6g/L',
        },
        {
          name: 'Bacterial Leaf Blight',
          risk: 'medium' as const,
          symptoms: ['Yellow to white lesions', 'Wavy margins on leaves', 'Leaf drying'],
          prevention: ['Balanced fertilization', 'Avoid field flooding', 'Remove weeds'],
          treatment: ['Copper hydroxide spray', 'Streptocycline application', 'Improve drainage'],
          pesticide: 'Streptocycline 15g + Copper oxychloride 500g/acre',
        },
      ],
      Wheat: [
        {
          name: 'Rust Disease',
          risk: 'high' as const,
          symptoms: ['Orange-brown pustules', 'Yellowing leaves', 'Stunted growth'],
          prevention: ['Grow resistant varieties', 'Timely sowing', 'Destroy volunteer plants'],
          treatment: ['Propiconazole spray', 'Apply at first sign', 'Repeat after 15 days'],
          pesticide: 'Propiconazole 25% EC @ 0.1%',
        },
        {
          name: 'Powdery Mildew',
          risk: 'low' as const,
          symptoms: ['White powdery growth', 'Curled leaves', 'Reduced tillering'],
          prevention: ['Avoid late sowing', 'Proper spacing', 'Balanced nutrition'],
          treatment: ['Sulfur dust application', 'Hexaconazole spray', 'Remove infected parts'],
          pesticide: 'Hexaconazole 5% EC @ 0.05%',
        },
      ],
      Sugarcane: [
        {
          name: 'Red Rot',
          risk: 'high' as const,
          symptoms: ['Red discoloration', 'Alcohol smell', 'Hollow stems'],
          prevention: ['Use disease-free sets', 'Crop rotation', 'Proper drainage'],
          treatment: ['Remove infected plants', 'Fungicide treatment', 'Soil treatment'],
          pesticide: 'Carbendazim 50% WP @ 0.1%',
        },
        {
          name: 'Smut Disease',
          risk: 'medium' as const,
          symptoms: ['Black whip-like structure', 'Stunted growth', 'Thin stems'],
          prevention: ['Hot water treatment', 'Resistant varieties', 'Remove infected clumps'],
          treatment: ['Propiconazole dip', 'Destroy infected plants', 'Soil fumigation'],
          pesticide: 'Propiconazole 25% EC for set treatment',
        },
      ],
      Cotton: [
        {
          name: 'Bollworm',
          risk: 'high' as const,
          symptoms: ['Holes in bolls', 'Flower drop', 'Damaged squares'],
          prevention: ['Install pheromone traps', 'Intercropping', 'Early sowing'],
          treatment: ['Spinosad spray', 'Neem oil application', 'Bt cotton varieties'],
          pesticide: 'Spinosad 45% SC @ 0.5ml/L',
        },
        {
          name: 'Wilt Disease',
          risk: 'medium' as const,
          symptoms: ['Yellowing leaves', 'Wilting plants', 'Root decay'],
          prevention: ['Seed treatment', 'Crop rotation', 'Organic matter addition'],
          treatment: ['Carbendazim drench', 'Trichoderma application', 'Improve drainage'],
          pesticide: 'Carbendazim 50% WP @ 2g/L',
        },
      ],
    };

    return diseases[cropName as keyof typeof diseases] || diseases.Rice;
  };

  const diseases = getDiseaseData();

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'secondary';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'high':
        return <AlertTriangle className="w-4 h-4" />;
      case 'medium':
        return <Bug className="w-4 h-4" />;
      case 'low':
        return <Leaf className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-primary mb-2">Disease & Pest Management</h3>
        <p className="text-muted-foreground">Common issues and solutions for {cropName}</p>
      </div>

      <Alert className="border-warning bg-warning/10">
        <AlertTriangle className="h-4 w-4 text-warning" />
        <AlertTitle>Early Detection is Key!</AlertTitle>
        <AlertDescription>
          Regular field monitoring helps prevent major crop losses. Check your crops every 3-4 days.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        {diseases.map((disease, index) => (
          <Card key={index} className="shadow-md overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  {getRiskIcon(disease.risk)}
                  {disease.name}
                </CardTitle>
                <Badge variant={getRiskBadgeVariant(disease.risk) as any}>
                  {disease.risk.toUpperCase()} RISK
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-destructive">⚠️ Symptoms</h4>
                  <ul className="space-y-1">
                    {disease.symptoms.map((symptom, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-destructive mt-1">•</span>
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2 text-success">🛡️ Prevention</h4>
                  <ul className="space-y-1">
                    {disease.prevention.map((method, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-success mt-1">•</span>
                        {method}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-sm mb-2 text-info">💊 Treatment</h4>
                <ul className="space-y-1 mb-3">
                  {disease.treatment.map((treatment, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-info mt-1">•</span>
                      {treatment}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <Shield className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Recommended Pesticide</p>
                    <p className="font-semibold text-sm">{disease.pesticide}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-success/10 to-primary/10 border-success">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-success mt-1" />
            <div className="space-y-2 flex-1">
              <h4 className="font-semibold text-lg">Integrated Pest Management (IPM)</h4>
              <p className="text-sm text-muted-foreground">
                Combine biological, cultural, and chemical methods for sustainable pest control. 
                Use pesticides only when necessary and rotate different modes of action to prevent resistance.
              </p>
              <Button variant="success" size="sm">
                Learn More About IPM
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiseaseManagement;