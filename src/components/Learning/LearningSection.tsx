
import React, { useState } from 'react';
import { Play, Clock, MapPin, BookOpen, Filter, Star } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const LearningSection = () => {
  const { courses, filteredCourses, filterCourses } = useStore();
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  // Mock courses data
  React.useEffect(() => {
    const mockCourses = [
      {
        id: '1',
        title: 'Introduction aux appels d\'offres publics',
        description: 'Apprenez les bases des procédures d\'appels d\'offres en Côte d\'Ivoire',
        duration: '2h 30min',
        country: 'Côte d\'Ivoire',
        theme: 'Bases juridiques',
        videoUrl: 'https://vimeo.com/example1',
        thumbnail: '/api/placeholder/300/200',
        level: 'beginner' as const,
      },
      {
        id: '2',
        title: 'Rédaction de propositions techniques',
        description: 'Techniques avancées pour rédiger des propositions gagnantes',
        duration: '3h 15min',
        country: 'Sénégal',
        theme: 'Rédaction',
        videoUrl: 'https://vimeo.com/example2',
        thumbnail: '/api/placeholder/300/200',
        level: 'intermediate' as const,
      },
      {
        id: '3',
        title: 'Aspects juridiques - Droit OHADA',
        description: 'Comprendre le cadre juridique OHADA pour les marchés publics',
        duration: '4h 00min',
        country: 'Multi-pays',
        theme: 'Bases juridiques',
        videoUrl: 'https://vimeo.com/example3',
        thumbnail: '/api/placeholder/300/200',
        level: 'advanced' as const,
      },
      {
        id: '4',
        title: 'Gestion financière des contrats',
        description: 'Optimisez la gestion financière de vos contrats publics',
        duration: '2h 45min',
        country: 'Ghana',
        theme: 'Finance',
        videoUrl: 'https://vimeo.com/example4',
        thumbnail: '/api/placeholder/300/200',
        level: 'intermediate' as const,
      },
      {
        id: '5',
        title: 'Négociation et stratégies',
        description: 'Techniques de négociation pour maximiser vos chances',
        duration: '3h 30min',
        country: 'Nigeria',
        theme: 'Stratégie',
        videoUrl: 'https://vimeo.com/example5',
        thumbnail: '/api/placeholder/300/200',
        level: 'advanced' as const,
      },
      {
        id: '6',
        title: 'Conformité et audit',
        description: 'Assurez-vous de la conformité de vos soumissions',
        duration: '2h 00min',
        country: 'Kenya',
        theme: 'Conformité',
        videoUrl: 'https://vimeo.com/example6',
        thumbnail: '/api/placeholder/300/200',
        level: 'beginner' as const,
      },
    ];

    useStore.getState().setCourses(mockCourses);
  }, []);

  const themes = ['Bases juridiques', 'Rédaction', 'Finance', 'Stratégie', 'Conformité'];
  const countries = ['Côte d\'Ivoire', 'Sénégal', 'Ghana', 'Nigeria', 'Kenya', 'Multi-pays'];

  const handleThemeFilter = (theme: string) => {
    setSelectedTheme(theme);
    filterCourses(theme === 'all' ? undefined : theme, selectedCountry === 'all' ? undefined : selectedCountry);
  };

  const handleCountryFilter = (country: string) => {
    setSelectedCountry(country);
    filterCourses(selectedTheme === 'all' ? undefined : selectedTheme, country === 'all' ? undefined : country);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'Débutant';
      case 'intermediate':
        return 'Intermédiaire';
      case 'advanced':
        return 'Avancé';
      default:
        return level;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Centre de Formation E-learning</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Développez vos compétences avec nos formations spécialisées dans les appels d'offres publics africains
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filtres</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select onValueChange={handleThemeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par thème" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les thèmes</SelectItem>
                {themes.map(theme => (
                  <SelectItem key={theme} value={theme}>
                    {theme}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={handleCountryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par pays" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les pays</SelectItem>
                {countries.map(country => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Courses Grid */}
      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="grid">Vue grille</TabsTrigger>
          <TabsTrigger value="list">Vue liste</TabsTrigger>
        </TabsList>
        
        <TabsContent value="grid" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(filteredCourses.length > 0 ? filteredCourses : courses).map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                  <Badge 
                    className={`absolute top-2 right-2 ${getLevelColor(course.level)}`}
                  >
                    {getLevelLabel(course.level)}
                  </Badge>
                </div>
                
                <CardContent className="p-4 space-y-3">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg line-clamp-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3">{course.description}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{course.duration}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{course.country}</span>
                    </div>

                    <Badge variant="outline" className="text-xs">
                      {course.theme}
                    </Badge>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                      <Play className="h-4 w-4 mr-2" />
                      Commencer
                    </Button>
                    <Button variant="outline" size="sm">
                      <BookOpen className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          {(filteredCourses.length > 0 ? filteredCourses : courses).map((course) => (
            <Card key={course.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-32 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Play className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-lg">{course.title}</h3>
                      <Badge className={getLevelColor(course.level)}>
                        {getLevelLabel(course.level)}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600">{course.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{course.country}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {course.theme}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                      <Play className="h-4 w-4 mr-2" />
                      Commencer
                    </Button>
                    <Button variant="outline" size="sm">
                      Détails
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Empty state */}
      {filteredCourses.length === 0 && courses.length > 0 && (
        <Card className="text-center p-12">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Aucune formation trouvée
          </h3>
          <p className="text-gray-600 mb-4">
            Essayez de modifier vos filtres pour voir plus de résultats.
          </p>
          <Button 
            variant="outline"
            onClick={() => {
              setSelectedTheme('');
              setSelectedCountry('');
              filterCourses();
            }}
          >
            Réinitialiser les filtres
          </Button>
        </Card>
      )}
    </div>
  );
};

export default LearningSection;
