import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Droplets, Mountain, Sun } from 'lucide-react';

interface CropFormData {
  soilType: string;
  waterAvailability: string;
  season: string;
}

interface CropFormProps {
  onSubmit: (data: CropFormData) => void;
}

const CropForm: React.FC<CropFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<CropFormData>({
    soilType: '',
    waterAvailability: '',
    season: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.soilType && formData.waterAvailability && formData.season) {
      onSubmit(formData);
    }
  };

  const soilTypes = [
    { value: 'clay', label: 'Clay Soil', icon: '🏺' },
    { value: 'sandy', label: 'Sandy Soil', icon: '🏖️' },
    { value: 'loamy', label: 'Loamy Soil', icon: '🌱' },
    { value: 'silt', label: 'Silt Soil', icon: '🌾' },
    { value: 'peaty', label: 'Peaty Soil', icon: '🍄' },
    { value: 'chalky', label: 'Chalky Soil', icon: '⚪' },
  ];

  const waterLevels = [
    { value: 'abundant', label: 'Abundant (Daily irrigation)', icon: '💧💧💧' },
    { value: 'moderate', label: 'Moderate (Weekly irrigation)', icon: '💧💧' },
    { value: 'limited', label: 'Limited (Bi-weekly)', icon: '💧' },
    { value: 'scarce', label: 'Scarce (Rain-fed only)', icon: '☔' },
  ];

  const seasons = [
    { value: 'summer', label: 'Summer (Apr-Jun)', icon: '☀️' },
    { value: 'monsoon', label: 'Monsoon (Jul-Sep)', icon: '🌧️' },
    { value: 'winter', label: 'Winter (Oct-Jan)', icon: '❄️' },
    { value: 'spring', label: 'Spring (Feb-Mar)', icon: '🌸' },
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Enter Your Farm Details</CardTitle>
        <CardDescription>Tell us about your farm conditions to get personalized crop recommendations</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="soil" className="text-lg font-semibold flex items-center gap-2">
              <Mountain className="w-5 h-5 text-earth" />
              Soil Type
            </Label>
            <Select value={formData.soilType} onValueChange={(value) => setFormData({ ...formData, soilType: value })}>
              <SelectTrigger id="soil" className="h-14 text-base">
                <SelectValue placeholder="Select your soil type" />
              </SelectTrigger>
              <SelectContent>
                {soilTypes.map((soil) => (
                  <SelectItem key={soil.value} value={soil.value} className="text-base py-3">
                    <span className="flex items-center gap-2">
                      <span className="text-xl">{soil.icon}</span>
                      {soil.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="water" className="text-lg font-semibold flex items-center gap-2">
              <Droplets className="w-5 h-5 text-info" />
              Water Availability
            </Label>
            <Select value={formData.waterAvailability} onValueChange={(value) => setFormData({ ...formData, waterAvailability: value })}>
              <SelectTrigger id="water" className="h-14 text-base">
                <SelectValue placeholder="Select water availability" />
              </SelectTrigger>
              <SelectContent>
                {waterLevels.map((water) => (
                  <SelectItem key={water.value} value={water.value} className="text-base py-3">
                    <span className="flex items-center gap-2">
                      <span className="text-xl">{water.icon}</span>
                      {water.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="season" className="text-lg font-semibold flex items-center gap-2">
              <Sun className="w-5 h-5 text-warning" />
              Growing Season
            </Label>
            <Select value={formData.season} onValueChange={(value) => setFormData({ ...formData, season: value })}>
              <SelectTrigger id="season" className="h-14 text-base">
                <SelectValue placeholder="Select the season" />
              </SelectTrigger>
              <SelectContent>
                {seasons.map((season) => (
                  <SelectItem key={season.value} value={season.value} className="text-base py-3">
                    <span className="flex items-center gap-2">
                      <span className="text-xl">{season.icon}</span>
                      {season.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full"
            disabled={!formData.soilType || !formData.waterAvailability || !formData.season}
          >
            Get Crop Recommendation
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CropForm;