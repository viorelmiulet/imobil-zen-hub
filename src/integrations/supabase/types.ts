export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      availability_calendar: {
        Row: {
          created_at: string
          date: string
          id: string
          is_available: boolean
          min_nights_override: number | null
          notes: string | null
          price_override: number | null
          property_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          is_available?: boolean
          min_nights_override?: number | null
          notes?: string | null
          price_override?: number | null
          property_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          is_available?: boolean
          min_nights_override?: number | null
          notes?: string | null
          price_override?: number | null
          property_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "availability_calendar_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          booking_source: string
          booking_status: string
          check_in_date: string
          check_out_date: string
          cleaning_fee: number | null
          created_at: string
          external_booking_id: string | null
          guest_email: string
          guest_name: string
          guest_phone: string | null
          id: string
          num_guests: number
          payment_status: string
          property_id: string
          security_deposit: number | null
          special_requests: string | null
          total_price: number
          updated_at: string
        }
        Insert: {
          booking_source?: string
          booking_status?: string
          check_in_date: string
          check_out_date: string
          cleaning_fee?: number | null
          created_at?: string
          external_booking_id?: string | null
          guest_email: string
          guest_name: string
          guest_phone?: string | null
          id?: string
          num_guests?: number
          payment_status?: string
          property_id: string
          security_deposit?: number | null
          special_requests?: string | null
          total_price: number
          updated_at?: string
        }
        Update: {
          booking_source?: string
          booking_status?: string
          check_in_date?: string
          check_out_date?: string
          cleaning_fee?: number | null
          created_at?: string
          external_booking_id?: string | null
          guest_email?: string
          guest_name?: string
          guest_phone?: string | null
          id?: string
          num_guests?: number
          payment_status?: string
          property_id?: string
          security_deposit?: number | null
          special_requests?: string | null
          total_price?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_requests: {
        Row: {
          created_at: string | null
          id: string
          ip_address: unknown | null
          listing_id: string | null
          requested_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          listing_id?: string | null
          requested_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          listing_id?: string | null
          requested_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_requests_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "property_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      email_logs: {
        Row: {
          created_at: string
          id: string
          message_content: string | null
          provider: string
          sent_at: string
          status: string
          subject: string
          to_email: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          message_content?: string | null
          provider?: string
          sent_at?: string
          status?: string
          subject: string
          to_email: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          message_content?: string | null
          provider?: string
          sent_at?: string
          status?: string
          subject?: string
          to_email?: string
          user_id?: string | null
        }
        Relationships: []
      }
      integration_settings: {
        Row: {
          api_credentials: Json | null
          created_at: string
          external_property_id: string | null
          id: string
          last_sync_at: string | null
          platform: string
          property_id: string
          sync_enabled: boolean
          sync_status: string | null
          updated_at: string
        }
        Insert: {
          api_credentials?: Json | null
          created_at?: string
          external_property_id?: string | null
          id?: string
          last_sync_at?: string | null
          platform: string
          property_id: string
          sync_enabled?: boolean
          sync_status?: string | null
          updated_at?: string
        }
        Update: {
          api_credentials?: Json | null
          created_at?: string
          external_property_id?: string | null
          id?: string
          last_sync_at?: string | null
          platform?: string
          property_id?: string
          sync_enabled?: boolean
          sync_status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "integration_settings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      logos: {
        Row: {
          category: string
          color_palette: string[] | null
          created_at: string
          description: string | null
          downloads: number | null
          id: string
          image_base64: string | null
          image_url: string
          is_premium: boolean | null
          name: string
          prompt_used: string
          rating: number | null
          style: string
          subcategory: string | null
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          category: string
          color_palette?: string[] | null
          created_at?: string
          description?: string | null
          downloads?: number | null
          id?: string
          image_base64?: string | null
          image_url: string
          is_premium?: boolean | null
          name: string
          prompt_used: string
          rating?: number | null
          style: string
          subcategory?: string | null
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          category?: string
          color_palette?: string[] | null
          created_at?: string
          description?: string | null
          downloads?: number | null
          id?: string
          image_base64?: string | null
          image_url?: string
          is_premium?: boolean | null
          name?: string
          prompt_used?: string
          rating?: number | null
          style?: string
          subcategory?: string | null
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      property_listings: {
        Row: {
          address: string | null
          amenities: string[] | null
          area_sqm: number | null
          bathrooms: number | null
          bedrooms: number | null
          cancellation_policy: string | null
          check_in_time: string | null
          check_out_time: string | null
          city: string | null
          cleaning_fee: number | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          county: string | null
          created_at: string
          currency: string | null
          description: string | null
          external_id: string | null
          feed_source: string | null
          house_rules: string | null
          id: string
          image_urls: string[] | null
          instant_book: boolean | null
          last_updated: string | null
          latitude: number | null
          listing_url: string | null
          location: string | null
          longitude: number | null
          max_nights: number | null
          min_nights: number | null
          postal_code: string | null
          price: number | null
          property_type: Database["public"]["Enums"]["property_type"]
          security_deposit: number | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          amenities?: string[] | null
          area_sqm?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          cancellation_policy?: string | null
          check_in_time?: string | null
          check_out_time?: string | null
          city?: string | null
          cleaning_fee?: number | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          county?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          external_id?: string | null
          feed_source?: string | null
          house_rules?: string | null
          id?: string
          image_urls?: string[] | null
          instant_book?: boolean | null
          last_updated?: string | null
          latitude?: number | null
          listing_url?: string | null
          location?: string | null
          longitude?: number | null
          max_nights?: number | null
          min_nights?: number | null
          postal_code?: string | null
          price?: number | null
          property_type?: Database["public"]["Enums"]["property_type"]
          security_deposit?: number | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          amenities?: string[] | null
          area_sqm?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          cancellation_policy?: string | null
          check_in_time?: string | null
          check_out_time?: string | null
          city?: string | null
          cleaning_fee?: number | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          county?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          external_id?: string | null
          feed_source?: string | null
          house_rules?: string | null
          id?: string
          image_urls?: string[] | null
          instant_book?: boolean | null
          last_updated?: string | null
          latitude?: number | null
          listing_url?: string | null
          location?: string | null
          longitude?: number | null
          max_nights?: number | null
          min_nights?: number | null
          postal_code?: string | null
          price?: number | null
          property_type?: Database["public"]["Enums"]["property_type"]
          security_deposit?: number | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_availability: {
        Args: { check_in: string; check_out: string; property_id: string }
        Returns: boolean
      }
      delete_user_account: {
        Args: { user_id: string }
        Returns: boolean
      }
      get_all_users_with_roles: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at: string
          email: string
          full_name: string
          id: string
          last_sign_in_at: string
          role: Database["public"]["Enums"]["app_role"]
          status: string
          updated_at: string
        }[]
      }
      get_public_property_listings: {
        Args: Record<PropertyKey, never>
        Returns: {
          address: string
          area_sqm: number
          bathrooms: number
          bedrooms: number
          city: string
          county: string
          created_at: string
          currency: string
          description: string
          external_id: string
          feed_source: string
          id: string
          image_urls: string[]
          last_updated: string
          latitude: number
          listing_url: string
          location: string
          longitude: number
          postal_code: string
          price: number
          property_type: string
          status: string
          title: string
          updated_at: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      request_contact_info: {
        Args: { listing_id: string }
        Returns: Json
      }
      update_user_role: {
        Args: {
          new_role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Returns: boolean
      }
      update_user_status: {
        Args: { new_status: string; user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      property_type: "apartament" | "garsoniera" | "casa" | "vila"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      property_type: ["apartament", "garsoniera", "casa", "vila"],
    },
  },
} as const
