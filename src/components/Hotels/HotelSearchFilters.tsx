import React from 'react';
import { Search, MapPin, Building2, Star, DollarSign, X } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { useStore } from '../../store/useStore';

const HotelSearchFilters = () => {
  const { 
    hotelSearchQuery, 
    setHotelSearchQuery, 
    hotelFilters, 
    setHotelFilters 
  } = useStore();

  const countries = ['Tunisie', 'Maroc', 'Algérie', 'France', 'Espagne'];
  const cities = ['Tunis', 'Sousse', 'Hammamet', 'Monastir', 'Djerba'];
  const starRatings = [1, 2, 3, 4, 5];
  const amenitiesList = ['Wi-Fi', 'Piscine', 'Restaurant', 'Spa', 'Parking', 'Climatisation', 'Bar', 'Salle de sport'];

  const handleCountryChange = (country: string) => {
    const newCountries = hotelFilters.countries.includes(country)
      ? hotelFilters.countries.filter(c => c !== country)
      : [...hotelFilters.countries, country];
    setHotelFilters({ countries: newCountries });
  };

  const handleCityChange = (city: string) => {
    const newCities = hotelFilters.cities.includes(city)
      ? hotelFilters.cities.filter(c => c !== city)
      : [...hotelFilters.cities, city];
    setHotelFilters({ cities: newCities });
  };

  const handleStarChange = (star: number) => {
    const newStars = hotelFilters.stars.includes(star)
      ? hotelFilters.stars.filter(s => s !== star)
      : [...hotelFilters.stars, star];
    setHotelFilters({ stars: newStars });
  };

  const handleAmenityChange = (amenity: string) => {
    const newAmenities = hotelFilters.amenities.includes(amenity)
      ? hotelFilters.amenities.filter(a => a !== amenity)
      : [...hotelFilters.amenities, amenity];
    setHotelFilters({ amenities: newAmenities });
  };

  const handlePriceRangeChange = (values: number[]) => {
    setHotelFilters({ 
      priceRange: { 
        min: values[0], 
        max: values[1] 
      } 
    });
  };

  const clearFilters = () => {
    setHotelSearchQuery('');
    setHotelFilters({ 
      countries: [], 
      cities: [], 
      stars: [], 
      priceRange: { min: 0, max: 1000 },
      amenities: []
    });
  };

  const hasActiveFilters = hotelSearchQuery || 
    hotelFilters.countries.length > 0 || 
    hotelFilters.cities.length > 0 || 
    hotelFilters.stars.length > 0 || 
    hotelFilters.amenities.length > 0 ||
    hotelFilters.priceRange.min > 0 ||
    hotelFilters.priceRange.max < 1000;

  return (
    <Card className="shadow-competitive">
      <CardContent className="p-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Rechercher des hôtels..."
            className="pl-10"
            value={hotelSearchQuery}
            onChange={(e) => setHotelSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Country Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Pays
            </label>
            <Select onValueChange={handleCountryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner..." />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* City Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Ville
            </label>
            <Select onValueChange={handleCityChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner..." />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Stars Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Star className="h-4 w-4" />
              Étoiles
            </label>
            <Select onValueChange={(value) => handleStarChange(parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner..." />
              </SelectTrigger>
              <SelectContent>
                {starRatings.map((star) => (
                  <SelectItem key={star} value={star.toString()}>
                    {star} étoile{star > 1 ? 's' : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amenities Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Équipements
            </label>
            <Select onValueChange={handleAmenityChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner..." />
              </SelectTrigger>
              <SelectContent>
                {amenitiesList.map((amenity) => (
                  <SelectItem key={amenity} value={amenity}>
                    {amenity}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-3">
            <DollarSign className="h-4 w-4" />
            Prix par nuit: {hotelFilters.priceRange.min} - {hotelFilters.priceRange.max} TND
          </label>
          <Slider
            value={[hotelFilters.priceRange.min, hotelFilters.priceRange.max]}
            onValueChange={handlePriceRangeChange}
            max={1000}
            min={0}
            step={10}
            className="w-full"
          />
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Filtres actifs:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-gray-500 hover:text-gray-700"
              >
                Effacer tout
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {hotelFilters.countries.map((country) => (
                <Badge key={country} variant="secondary" className="flex items-center gap-1">
                  {country}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleCountryChange(country)}
                  />
                </Badge>
              ))}
              
              {hotelFilters.cities.map((city) => (
                <Badge key={city} variant="secondary" className="flex items-center gap-1">
                  {city}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleCityChange(city)}
                  />
                </Badge>
              ))}
              
              {hotelFilters.stars.map((star) => (
                <Badge key={star} variant="secondary" className="flex items-center gap-1">
                  {star} étoile{star > 1 ? 's' : ''}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleStarChange(star)}
                  />
                </Badge>
              ))}

              {hotelFilters.amenities.map((amenity) => (
                <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
                  {amenity}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleAmenityChange(amenity)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HotelSearchFilters;