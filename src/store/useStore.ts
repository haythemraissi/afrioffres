
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface Tender {
  id: string;
  title: string;
  organization: string;
  country: string;
  sector: string;
  deadline: string;
  status: 'open' | 'closed' | 'awarded';
  budget: string;
  description: string;
  requirements: string[];
  publishedDate: string;
  category: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'free' | 'premium';
  preferences: {
    countries: string[];
    sectors: string[];
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
  type: 'tender' | 'update' | 'deadline' | 'system';
  timestamp: string;
  read: boolean;
}

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  country: string;
  theme: string;
  videoUrl: string;
  thumbnail: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

interface StoreState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  
  // Tenders state
  tenders: Tender[];
  filteredTenders: Tender[];
  searchQuery: string;
  filters: {
    countries: string[];
    sectors: string[];
    status: string[];
    organizations: string[];
  };
  
  // AI Assistant state
  chatMessages: Array<{ id: string; sender: 'user' | 'ai'; message: string; timestamp: string }>;
  isAiProcessing: boolean;
  uploadedDocument: File | null;
  
  // Notifications state
  notifications: Notification[];
  unreadCount: number;
  
  // E-learning state
  courses: Course[];
  filteredCourses: Course[];
  
  // UI state
  sidebarOpen: boolean;
  chatbotOpen: boolean;
  currentPage: string;
  
  // Actions
  login: (user: User) => void;
  logout: () => void;
  setTenders: (tenders: Tender[]) => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<StoreState['filters']>) => void;
  filterTenders: () => void;
  addChatMessage: (sender: 'user' | 'ai', message: string) => void;
  setAiProcessing: (processing: boolean) => void;
  setUploadedDocument: (file: File | null) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markNotificationRead: (id: string) => void;
  setCourses: (courses: Course[]) => void;
  filterCourses: (theme?: string, country?: string) => void;
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
      tenders: [],
      filteredTenders: [],
      searchQuery: '',
      filters: {
        countries: [],
        sectors: [],
        status: [],
        organizations: [],
      },
      chatMessages: [],
      isAiProcessing: false,
      uploadedDocument: null,
      notifications: [],
      unreadCount: 0,
      courses: [],
      filteredCourses: [],
      sidebarOpen: true,
      chatbotOpen: false,
      currentPage: 'dashboard',
      
      // Actions
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      
      setTenders: (tenders) => {
        set({ tenders, filteredTenders: tenders });
        get().filterTenders();
      },
      
      setSearchQuery: (searchQuery) => {
        set({ searchQuery });
        get().filterTenders();
      },
      
      setFilters: (newFilters) => {
        set({ filters: { ...get().filters, ...newFilters } });
        get().filterTenders();
      },
      
      filterTenders: () => {
        const { tenders, searchQuery, filters } = get();
        let filtered = tenders;
        
        if (searchQuery) {
          filtered = filtered.filter(tender =>
            tender.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tender.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tender.description.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        if (filters.countries.length > 0) {
          filtered = filtered.filter(tender => filters.countries.includes(tender.country));
        }
        
        if (filters.sectors.length > 0) {
          filtered = filtered.filter(tender => filters.sectors.includes(tender.sector));
        }
        
        if (filters.status.length > 0) {
          filtered = filtered.filter(tender => filters.status.includes(tender.status));
        }
        
        if (filters.organizations.length > 0) {
          filtered = filtered.filter(tender => filters.organizations.includes(tender.organization));
        }
        
        set({ filteredTenders: filtered });
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
      
      setCourses: (courses) => set({ courses, filteredCourses: courses }),
      
      filterCourses: (theme, country) => {
        let filtered = get().courses;
        
        if (theme) {
          filtered = filtered.filter(course => course.theme === theme);
        }
        
        if (country) {
          filtered = filtered.filter(course => course.country === country);
        }
        
        set({ filteredCourses: filtered });
      },
      
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      setChatbotOpen: (chatbotOpen) => set({ chatbotOpen }),
      setCurrentPage: (currentPage) => set({ currentPage }),
    }),
    { name: 'afrioffres-store' }
  )
);
