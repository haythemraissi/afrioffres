import React from 'react';
import { Search, MapPin, Building2, TrendingUp, Calendar, X } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useStore } from '../../store/useStore';

const SearchFilters = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    filters, 
    setFilters 
  } = useStore();

  const countries = ['Tunisie', 'Maroc', 'Algérie', 'France'];
  const types = ['booking', 'tunisie-booking', 'traveltodo', 'other'];
  const statusOptions = ['active', 'monitoring', 'inactive'];

  const handleCountryChange = (country: string) => {
    const newCountries = filters.countries.includes(country)
      ? filters.countries.filter(c => c !== country)
      : [...filters.countries, country];
    setFilters({ countries: newCountries });
  };

  const handleTypeChange = (type: string) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];
    setFilters({ types: newTypes });
  };

  const handleStatusChange = (status: string) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    setFilters({ status: newStatus });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilters({ 
      countries: [], 
      types: [], 
      status: [], 
      dateLimit: '' 
    });
  };

  const hasActiveFilters = searchQuery || 
    filters.countries.length > 0 || 
    filters.types.length > 0 || 
    filters.status.length > 0 || 
    filters.dateLimit;

  return (
    <Card className="shadow-competitive">
      <CardContent className="p-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Rechercher des concurrents..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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

          {/* Type Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Type de plateforme
            </label>
            <Select onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner..." />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.replace('-', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Statut
            </label>
            <Select onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner..." />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Limit Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Période
            </label>
            <Select onValueChange={(value) => setFilters({ dateLimit: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">7 derniers jours</SelectItem>
                <SelectItem value="30days">30 derniers jours</SelectItem>
                <SelectItem value="90days">3 derniers mois</SelectItem>
                <SelectItem value="365days">12 derniers mois</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
              {filters.countries.map((country) => (
                <Badge key={country} variant="secondary" className="flex items-center gap-1">
                  {country}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleCountryChange(country)}
                  />
                </Badge>
              ))}
              
              {filters.types.map((type) => (
                <Badge key={type} variant="secondary" className="flex items-center gap-1">
                  {type.replace('-', ' ')}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleTypeChange(type)}
                  />
                </Badge>
              ))}
              
              {filters.status.map((status) => (
                <Badge key={status} variant="secondary" className="flex items-center gap-1">
                  {status}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleStatusChange(status)}
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

export default SearchFilters;