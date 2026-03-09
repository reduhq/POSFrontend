import { create } from 'zustand'

interface AuthState {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    avatarUrl?: string;
  } | null;
  tenantId: string | null;
  isSidebarOpen: boolean;
  
  // Actions
  setUser: (user: AuthState['user']) => void;
  setTenantId: (tenantId: string) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  clearAuth: () => void;
}

export const useAppStore = create<AuthState>((set) => ({
  user: null,
  tenantId: null,
  isSidebarOpen: false,

  setUser: (user) => set({ user }),
  setTenantId: (tenantId) => set({ tenantId }),
  
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  
  clearAuth: () => set({ user: null, tenantId: null }),
}));
