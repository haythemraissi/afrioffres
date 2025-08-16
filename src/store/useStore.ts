import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface CompetitorData {
  id: string;
  name: string;
  type: 'booking' | 'tunisie-booking' | 'traveltodo' | 'other';
  lastUpdated: string;
  metrics: {
    averagePrice: number;
    totalOffers: number;
    priceChange: number; // Percentage change
    marketShare: number;
  };
  recentActivity: {
    priceChanges: Array<{
      product: string;
      oldPrice: number;
      newPrice: number;
      changePercent: number;
      date: string;
    }>;
    promotions: Array<{
      title: string;
      discount: number;
      validUntil: string;
      products: string[];
    }>;
  };
  website: string;
  country: string;
  status: 'active' | 'monitoring' | 'inactive';
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  city: string;
  country: string;
  stars: number;
  pricePerNight: number;
  currency: string;
  images: string[];
  amenities: string[];
  roomTypes: {
    type: string;
    price: number;
    available: boolean;
  }[];
  reviews: {
    rating: number;
    totalReviews: number;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy: string;
  description: string;
  availability: boolean;
  lastUpdated: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'free' | 'premium';
  preferences: {
    countries: string[];
    types: string[];
    notifications: {
      email: boolean;
      whatsapp: boolean;
      realTime: boolean;
    };
  };
  keywords: string[];
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'price-change' | 'promotion' | 'anomaly' | 'system';
  timestamp: string;
  read: boolean;
  severity?: 'low' | 'medium' | 'high';
}

interface StoreState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  
  // Market Intelligence state
  competitors: CompetitorData[];
  filteredCompetitors: CompetitorData[];
  searchQuery: string;
  filters: {
    countries: string[];
    types: string[];
    status: string[];
    dateLimit: string;
  };
  
  // Hotels state
  hotels: Hotel[];
  filteredHotels: Hotel[];
  hotelSearchQuery: string;
  hotelFilters: {
    countries: string[];
    cities: string[];
    stars: number[];
    priceRange: {
      min: number;
      max: number;
    };
    amenities: string[];
  };
  
  // AI Assistant state
  chatMessages: Array<{ id: string; sender: 'user' | 'ai'; message: string; timestamp: string }>;
  isAiProcessing: boolean;
  uploadedDocument: File | null;
  
  // Notifications state
  notifications: Notification[];
  unreadCount: number;
  
  // Analytics state
  analyticsData: {
    priceEvolution: Array<{
      date: string;
      competitors: Record<string, number>;
    }>;
    marketShare: Array<{
      name: string;
      share: number;
      color: string;
    }>;
    anomalies: Array<{
      competitor: string;
      product: string;
      change: number;
      severity: 'low' | 'medium' | 'high';
      date: string;
    }>;
  };
  
  // UI state
  sidebarOpen: boolean;
  chatbotOpen: boolean;
  currentPage: string;
  
  // Actions
  login: (user: User) => void;
  logout: () => void;
  setCompetitors: (competitors: CompetitorData[]) => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<StoreState['filters']>) => void;
  filterCompetitors: () => void;
  setHotels: (hotels: Hotel[]) => void;
  setHotelSearchQuery: (query: string) => void;
  setHotelFilters: (filters: Partial<StoreState['hotelFilters']>) => void;
  filterHotels: () => void;
  addChatMessage: (sender: 'user' | 'ai', message: string) => void;
  setAiProcessing: (processing: boolean) => void;
  setUploadedDocument: (file: File | null) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  setAnalyticsData: (data: Partial<StoreState['analyticsData']>) => void;
  setSidebarOpen: (open: boolean) => void;
  setChatbotOpen: (open: boolean) => void;
  setCurrentPage: (page: string) => void;
}

export const useStore = create<StoreState>()(
  devtools(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      competitors: [],
      filteredCompetitors: [],
      searchQuery: '',
      filters: {
        countries: [],
        types: [],
        status: [],
        dateLimit: '',
      },
      hotels: [],
      filteredHotels: [],
      hotelSearchQuery: '',
      hotelFilters: {
        countries: [],
        cities: [],
        stars: [],
        priceRange: { min: 0, max: 1000 },
        amenities: [],
      },
      chatMessages: [],
      isAiProcessing: false,
      uploadedDocument: null,
      notifications: [],
      unreadCount: 0,
      analyticsData: {
        priceEvolution: [],
        marketShare: [],
        anomalies: [],
      },
      sidebarOpen: true,
      chatbotOpen: false,
      currentPage: 'dashboard',
      
      // Actions
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      
      setCompetitors: (competitors) => {
        set({ competitors, filteredCompetitors: competitors });
        get().filterCompetitors();
      },
      
      setSearchQuery: (searchQuery) => {
        set({ searchQuery });
        get().filterCompetitors();
      },
      
      setFilters: (newFilters) => {
        set({ filters: { ...get().filters, ...newFilters } });
        get().filterCompetitors();
      },
      
      filterCompetitors: () => {
        const { competitors, searchQuery, filters } = get();
        let filtered = competitors;
        
        if (searchQuery) {
          filtered = filtered.filter(competitor =>
            competitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            competitor.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            competitor.website.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        if (filters.countries.length > 0) {
          filtered = filtered.filter(competitor => filters.countries.includes(competitor.country));
        }
        
        if (filters.types.length > 0) {
          filtered = filtered.filter(competitor => filters.types.includes(competitor.type));
        }
        
        if (filters.status.length > 0) {
          filtered = filtered.filter(competitor => filters.status.includes(competitor.status));
        }
        
        set({ filteredCompetitors: filtered });
      },
      
      setHotels: (hotels) => {
        set({ hotels, filteredHotels: hotels });
        get().filterHotels();
      },
      
      setHotelSearchQuery: (hotelSearchQuery) => {
        set({ hotelSearchQuery });
        get().filterHotels();
      },
      
      setHotelFilters: (newFilters) => {
        set({ hotelFilters: { ...get().hotelFilters, ...newFilters } });
        get().filterHotels();
      },
      
      filterHotels: () => {
        const { hotels, hotelSearchQuery, hotelFilters } = get();
        let filtered = hotels;
        
        if (hotelSearchQuery) {
          filtered = filtered.filter(hotel =>
            hotel.name.toLowerCase().includes(hotelSearchQuery.toLowerCase()) ||
            hotel.location.toLowerCase().includes(hotelSearchQuery.toLowerCase()) ||
            hotel.city.toLowerCase().includes(hotelSearchQuery.toLowerCase())
          );
        }
        
        if (hotelFilters.countries.length > 0) {
          filtered = filtered.filter(hotel => hotelFilters.countries.includes(hotel.country));
        }
        
        if (hotelFilters.cities.length > 0) {
          filtered = filtered.filter(hotel => hotelFilters.cities.includes(hotel.city));
        }
        
        if (hotelFilters.stars.length > 0) {
          filtered = filtered.filter(hotel => hotelFilters.stars.includes(hotel.stars));
        }
        
        if (hotelFilters.priceRange.min > 0 || hotelFilters.priceRange.max < 1000) {
          filtered = filtered.filter(hotel => 
            hotel.pricePerNight >= hotelFilters.priceRange.min && 
            hotel.pricePerNight <= hotelFilters.priceRange.max
          );
        }
        
        if (hotelFilters.amenities.length > 0) {
          filtered = filtered.filter(hotel => 
            hotelFilters.amenities.some(amenity => hotel.amenities.includes(amenity))
          );
        }
        
        set({ filteredHotels: filtered });
      },
      
      addChatMessage: (sender, message) => {
        const newMessage = {
          id: Date.now().toString(),
          sender,
          message,
          timestamp: new Date().toISOString(),
        };
        set({ chatMessages: [...get().chatMessages, newMessage] });
      },
      
      setAiProcessing: (isAiProcessing) => set({ isAiProcessing }),
      setUploadedDocument: (uploadedDocument) => set({ uploadedDocument }),
      
      addNotification: (notification) => {
        const newNotification = {
          ...notification,
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          read: false,
        };
        set({
          notifications: [newNotification, ...get().notifications],
          unreadCount: get().unreadCount + 1,
        });
      },
      
      markNotificationRead: (id) => {
        const notifications = get().notifications.map(n =>
          n.id === id ? { ...n, read: true } : n
        );
        const unreadCount = notifications.filter(n => !n.read).length;
        set({ notifications, unreadCount });
      },
      
      setAnalyticsData: (data) => {
        set({ analyticsData: { ...get().analyticsData, ...data } });
      },
      
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      setChatbotOpen: (chatbotOpen) => set({ chatbotOpen }),
      setCurrentPage: (currentPage) => set({ currentPage }),
    }),
    { name: 'medina-store' }
  )
);