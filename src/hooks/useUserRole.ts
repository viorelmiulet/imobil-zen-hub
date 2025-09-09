import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'admin' | 'manager' | 'agent' | 'user';

export interface UserPermissions {
  canDeleteAny: boolean;
  canEditAny: boolean;
  canDeleteOwn: boolean;
  canEditOwn: boolean;
  role: UserRole | null;
  userId: string | null;
}

export function useUserRole(): UserPermissions {
  const [permissions, setPermissions] = useState<UserPermissions>({
    canDeleteAny: false,
    canEditAny: false,
    canDeleteOwn: false,
    canEditOwn: false,
    role: null,
    userId: null,
  });

  useEffect(() => {
    async function getUserRole() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setPermissions({
            canDeleteAny: false,
            canEditAny: false,
            canDeleteOwn: false,
            canEditOwn: false,
            role: null,
            userId: null,
          });
          return;
        }

        // Get user role from database
        const { data: roleData } = await supabase
          .rpc('get_user_role', { _user_id: user.id });

        const role = roleData as UserRole;

        const newPermissions: UserPermissions = {
          userId: user.id,
          role,
          canDeleteAny: role === 'admin',
          canEditAny: role === 'admin',
          canDeleteOwn: role === 'admin' || role === 'agent',
          canEditOwn: role === 'admin' || role === 'agent',
        };

        setPermissions(newPermissions);
      } catch (error) {
        console.error('Error fetching user role:', error);
        setPermissions({
          canDeleteAny: false,
          canEditAny: false,
          canDeleteOwn: false,
          canEditOwn: false,
          role: null,
          userId: null,
        });
      }
    }

    getUserRole();
  }, []);

  return permissions;
}