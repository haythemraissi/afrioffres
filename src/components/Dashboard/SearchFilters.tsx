
import React from 'react';
import { Search, Filter, X, Calendar } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const SearchFilters = () => {
  const { searchQuery, setSearchQuery, filters, setFilters } = useStore();

  const countries = [
    'Côte d\'Ivoire', 'Sénégal', 'Ghana', 'Nigeria', 'Kenya', 'Maroc', 
    'Tunisie', 'Égypte', 'Afrique du Sud', 'Cameroun', 'Mali', 'Burkina Faso'
  ];

  const sectors = [
    'Infrastructure', 'Santé', 'Éducation', 'Agriculture', 'Énergie',
    'Transport', 'Technologie', 'Construction', 'Environnement', 'Finance'
  ];

  const statusOptions = [
    { value: 'open', label: 'Ouvert' },
    { value: 'closed', label: 'Fermé' },
    { value: 'awarded', label: 'Attribué' }
  ];

  const handleCountryChange = (country: string) => {
    const newCountries = filters.countries.includes(country)
      ? filters.countries.filter(c => c !== country)
      : [...filters.countries, country];
    setFilters({ countries: newCountries });
  };

  const handleSectorChange = (sector: string) => {
    const newSectors = filters.sectors.includes(sector)
      ? filters.sectors.filter(s => s !== sector)
      : [...filters.sectors, sector];
    setFilters({ sectors: newSectors });
  };

  const handleStatusChange = (status: string) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    setFilters({ status: newStatus });
  };

  const clearFilters = () => {
    setFilters({ countries: [], sectors: [], status: [], organizations: [] });
    setSearchQuery('');
  };

  const hasActiveFilters = 
    filters.countries.length > 0 || 
    filters.sectors.length > 0 || 
    filters.status.length > 0 || 
    searchQuery.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      {/* Search bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          placeholder="Rechercher des appels d'offres..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Select onValueChange={handleCountryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un pays" />
          </SelectTrigger>
          <SelectContent>
            {countries.map(country => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={handleSectorChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un secteur" />
          </SelectTrigger>
          <SelectContent>
            {sectors.map(sector => (
              <SelectItem key={sector} value={sector}>
                {sector}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={handleStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map(status => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-600">Filtres actifs:</span>
          
          {filters.countries.map(country => (
            <Badge key={country} variant="secondary" className="flex items-center gap-1">
              {country}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleCountryChange(country)}
              />
            </Badge>
          ))}
          
          {filters.sectors.map(sector => (
            <Badge key={sector} variant="secondary" className="flex items-center gap-1">
              {sector}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleSectorChange(sector)}
              />
            </Badge>
          ))}
          
          {filters.status.map(status => (
            <Badge key={status} variant="secondary" className="flex items-center gap-1">
              {statusOptions.find(s => s.value === status)?.label}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleStatusChange(status)}
              />
            </Badge>
          ))}

          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-red-600 hover:text-red-700"
          >
            Effacer tout
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
