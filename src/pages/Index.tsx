
import React, { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import SearchFilters from '../components/Dashboard/SearchFilters';
import TenderCard from '../components/Dashboard/TenderCard';
import RecommendationsSection from '../components/Dashboard/RecommendationsSection';
import AIAssistant from '../components/AIAssistant/AIAssistant';
import LearningSection from '../components/Learning/LearningSection';
import Chatbot from '../components/Chatbot/Chatbot';
import AuthModal from '../components/Auth/AuthModal';
import { Tender } from '../store/useStore';

const Index = () => {
  const { 
    currentPage, 
    filteredTenders, 
    setTenders, 
    isAuthenticated,
    addNotification 
  } = useStore();
  
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Mock data initialization
  useEffect(() => {
    const mockTenders: Tender[] = [
      {
        id: '1',
        title: 'Construction d\'une école primaire - Région d\'Abidjan',
        organization: 'Ministère de l\'Éducation Nationale',
        country: 'Côte d\'Ivoire',
        sector: 'Infrastructure',
        deadline: '2024-08-15',
        status: 'open',
        budget: '2.5M CFA',
        description: 'Construction d\'une école primaire de 12 classes avec bloc administratif, cantine scolaire et aire de jeux dans la commune de Cocody, Abidjan.',
        requirements: ['Licence BTP', 'Expérience 5 ans', 'Certification qualité'],
        publishedDate: '2024-07-01',
        category: 'Construction'
      },
      {
        id: '2',
        title: 'Fourniture d\'équipements informatiques pour hôpitaux',
        organization: 'Ministère de la Santé',
        country: 'Sénégal',
        sector: 'Technologie',
        deadline: '2024-07-25',
        status: 'open',
        budget: '800K CFA',
        description: 'Appel d\'offres pour la fourniture et installation d\'équipements informatiques (ordinateurs, serveurs, logiciels) pour 5 hôpitaux de la région de Dakar.',
        requirements: ['Agrément IT', 'Garantie 3 ans', 'Formation incluse'],
        publishedDate: '2024-06-15',
        category: 'Fourniture'
      },
      {
        id: '3',
        title: 'Réhabilitation réseau routier - Route Accra-Kumasi',
        organization: 'Ghana Highway Authority',
        country: 'Ghana',
        sector: 'Transport',
        deadline: '2024-09-10',
        status: 'open',
        budget: '15M USD',
        description: 'Projet de réhabilitation et modernisation de 120km de route entre Accra et Kumasi, incluant signalisation et éclairage.',
        requirements: ['Expérience internationale', 'Équipement lourd', 'Certification ISO'],
        publishedDate: '2024-06-30',
        category: 'Infrastructure'
      },
      {
        id: '4',
        title: 'Audit financier des institutions publiques',
        organization: 'Cour des Comptes',
        country: 'Mali',
        sector: 'Finance',
        deadline: '2024-08-30',
        status: 'open',
        budget: '500K CFA',
        description: 'Mission d\'audit financier et comptable de 12 institutions publiques maliennes pour l\'exercice budgétaire 2023-2024.',
        requirements: ['Cabinet agréé', 'Expert-comptable', 'Références audit public'],
        publishedDate: '2024-07-05',
        category: 'Services'
      },
      {
        id: '5',
        title: 'Développement plateforme e-gouvernance',
        organization: 'Ministère de la Modernisation',
        country: 'Nigeria',
        sector: 'Technologie',
        deadline: '2024-07-20',
        status: 'closed',
        budget: '2.2M USD',
        description: 'Développement d\'une plateforme digitale pour les services administratifs en ligne destinée aux citoyens nigérians.',
        requirements: ['Développement web', 'Sécurité cyber', 'Support 24/7'],
        publishedDate: '2024-05-20',
        category: 'Développement'
      },
      {
        id: '6',
        title: 'Formation professionnelle en agriculture',
        organization: 'Ministère de l\'Agriculture',
        country: 'Burkina Faso',
        sector: 'Agriculture',
        deadline: '2024-08-05',
        status: 'open',
        budget: '300K CFA',
        description: 'Programme de formation de 200 agriculteurs aux techniques modernes d\'agriculture et d\'élevage dans 5 provinces.',
        requirements: ['Formateurs certifiés', 'Matériel pédagogique', 'Suivi terrain'],
        publishedDate: '2024-06-25',
        category: 'Formation'
      }
    ];

    setTenders(mockTenders);

    // Add sample notifications
    addNotification({
      title: 'Nouveau appel d\'offres',
      message: 'Un nouvel appel d\'offres en Infrastructure a été publié en Côte d\'Ivoire',
      type: 'tender',
      read: false
    });

    addNotification({
      title: 'Échéance proche',
      message: 'L\'appel d\'offres "Développement plateforme e-gouvernance" expire dans 2 jours',
      type: 'deadline',
      read: false
    });
  }, [setTenders, addNotification]);

  // Show auth modal for non-authenticated users after 3 seconds
  useEffect(() => {
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        setShowAuthModal(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
              <div className="text-sm text-gray-500">
                {filteredTenders.length} appel{filteredTenders.length !== 1 ? 's' : ''} d'offres trouvé{filteredTenders.length !== 1 ? 's' : ''}
              </div>
            </div>
            
            <RecommendationsSection />
            <SearchFilters />
            
            {filteredTenders.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTenders.map(tender => (
                  <TenderCard key={tender.id} tender={tender} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Aucun appel d'offres trouvé</p>
                <p className="text-gray-400">Essayez de modifier vos critères de recherche</p>
              </div>
            )}
          </div>
        );
      
      case 'tenders':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Tous les appels d'offres</h1>
            <SearchFilters />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTenders.map(tender => (
                <TenderCard key={tender.id} tender={tender} />
              ))}
            </div>
          </div>
        );
      
      case 'ai-assistant':
        return <AIAssistant />;
      
      case 'notifications':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-500">Section des notifications en développement...</p>
            </div>
          </div>
        );
      
      case 'learning':
        return <LearningSection />;
      
      case 'settings':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-500">Section des paramètres en développement...</p>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-6">
            <RecommendationsSection />
            <SearchFilters />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTenders.map(tender => (
                <TenderCard key={tender.id} tender={tender} />
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 lg:ml-64">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderCurrentPage()}
          </div>
        </main>
      </div>

      <Chatbot />
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

export default Index;
