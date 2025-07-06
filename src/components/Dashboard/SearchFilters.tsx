
import React from 'react';
import { Search, Filter, X, Calendar, MapPin, Building2, TrendingUp } from 'lucide-react';
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
import { Card, CardContent } from '../ui/card';

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
    <Card className="mb-8 border-0 shadow-xl bg-white overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-1">
        <div className="bg-white rounded-lg">
          <CardContent className="p-6">
            {/* Search bar */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl blur opacity-20"></div>
              <div className="relative bg-white rounded-xl border-2 border-gray-100 focus-within:border-orange-300 transition-colors">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Rechercher des appels d'offres..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg border-0 focus:ring-0 bg-transparent"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Filter section title */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Filter className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Filtres avancés</h3>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  Pays
                </label>
                <Select onValueChange={handleCountryChange}>
                  <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-orange-300 focus:ring-orange-300">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map(country => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-green-500" />
                  Secteur
                </label>
                <Select onValueChange={handleSectorChange}>
                  <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-orange-300 focus:ring-orange-300">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectors.map(sector => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-purple-500" />
                  Statut
                </label>
                <Select onValueChange={handleStatusChange}>
                  <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-orange-300 focus:ring-orange-300">
                    <SelectValue placeholder="Tous" />
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

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-orange-500" />
                  Date limite
                </label>
                <Select>
                  <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-orange-300 focus:ring-orange-300">
                    <SelectValue placeholder="Toutes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">7 prochains jours</SelectItem>
                    <SelectItem value="30days">30 prochains jours</SelectItem>
                    <SelectItem value="90days">3 prochains mois</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active filters */}
            {hasActiveFilters && (
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Filter className="h-4 w-4" />
                    Filtres actifs:
                  </span>
                  
                  {filters.countries.map(country => (
                    <Badge key={country} className="bg-blue-100 text-blue-800 border-blue-200 flex items-center gap-1 hover:bg-blue-200 transition-colors">
                      <MapPin className="h-3 w-3" />
                      {country}
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-blue-900" 
                        onClick={() => handleCountryChange(country)}
                      />
                    </Badge>
                  ))}
                  
                  {filters.sectors.map(sector => (
                    <Badge key={sector} className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1 hover:bg-green-200 transition-colors">
                      <Building2 className="h-3 w-3" />
                      {sector}
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-green-900" 
                        onClick={() => handleSectorChange(sector)}
                      />
                    </Badge>
                  ))}
                  
                  {filters.status.map(status => (
                    <Badge key={status} className="bg-purple-100 text-purple-800 border-purple-200 flex items-center gap-1 hover:bg-purple-200 transition-colors">
                      <TrendingUp className="h-3 w-3" />
                      {statusOptions.find(s => s.value === status)?.label}
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-purple-900" 
                        onClick={() => handleStatusChange(status)}
                      />
                    </Badge>
                  ))}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-2"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Tout effacer
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default SearchFilters;
