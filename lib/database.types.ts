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
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          user_id?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          actor_user_id: string | null
          created_at: string
          detail: Json
          entity_id: string
          entity_type: string
          id: number
        }
        Insert: {
          action: string
          actor_user_id?: string | null
          created_at?: string
          detail?: Json
          entity_id: string
          entity_type: string
          id?: never
        }
        Update: {
          action?: string
          actor_user_id?: string | null
          created_at?: string
          detail?: Json
          entity_id?: string
          entity_type?: string
          id?: never
        }
        Relationships: []
      }
      guide_steps: {
        Row: {
          detail: string
          guide_id: string
          id: string
          step_order: number
          title: string
        }
        Insert: {
          detail: string
          guide_id: string
          id?: string
          step_order: number
          title: string
        }
        Update: {
          detail?: string
          guide_id?: string
          id?: string
          step_order?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "guide_steps_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "guides"
            referencedColumns: ["id"]
          },
        ]
      }
      guides: {
        Row: {
          created_at: string
          id: string
          last_verified_at: string
          published_at: string | null
          search_vector: unknown | null
          slug: string
          sort_order: number
          source_domain_id: string
          source_title: string
          source_url: string
          state_code: string | null
          status: Database["public"]["Enums"]["content_status"]
          summary: string
          time_label: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_verified_at: string
          published_at?: string | null
          search_vector?: never
          slug: string
          sort_order?: number
          source_domain_id: string
          source_title: string
          source_url: string
          state_code?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          summary: string
          time_label: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          last_verified_at?: string
          published_at?: string | null
          search_vector?: never
          slug?: string
          sort_order?: number
          source_domain_id?: string
          source_title?: string
          source_url?: string
          state_code?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          summary?: string
          time_label?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "guides_source_domain_id_fkey"
            columns: ["source_domain_id"]
            isOneToOne: false
            referencedRelation: "source_domains"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guides_state_code_fkey"
            columns: ["state_code"]
            isOneToOne: false
            referencedRelation: "states"
            referencedColumns: ["code"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          state_code: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          state_code: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          state_code?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_state_code_fkey"
            columns: ["state_code"]
            isOneToOne: false
            referencedRelation: "states"
            referencedColumns: ["code"]
          },
        ]
      }
      question_responses: {
        Row: {
          body: string
          created_at: string
          created_by: string
          id: string
          question_id: string
          sources: Json
        }
        Insert: {
          body: string
          created_at?: string
          created_by: string
          id?: string
          question_id: string
          sources?: Json
        }
        Update: {
          body?: string
          created_at?: string
          created_by?: string
          id?: string
          question_id?: string
          sources?: Json
        }
        Relationships: [
          {
            foreignKeyName: "question_responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          body: string
          city: string
          created_at: string
          id: string
          state_code: string
          status: Database["public"]["Enums"]["question_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          body: string
          city: string
          created_at?: string
          id?: string
          state_code: string
          status?: Database["public"]["Enums"]["question_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          body?: string
          city?: string
          created_at?: string
          id?: string
          state_code?: string
          status?: Database["public"]["Enums"]["question_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "questions_state_code_fkey"
            columns: ["state_code"]
            isOneToOne: false
            referencedRelation: "states"
            referencedColumns: ["code"]
          },
        ]
      }
      resources: {
        Row: {
          created_at: string
          id: string
          last_verified_at: string
          published_at: string | null
          search_vector: unknown | null
          slug: string
          sort_order: number
          source_domain_id: string
          state_code: string | null
          status: Database["public"]["Enums"]["content_status"]
          summary: string
          title: string
          topic: Database["public"]["Enums"]["resource_topic"]
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_verified_at: string
          published_at?: string | null
          search_vector?: never
          slug: string
          sort_order?: number
          source_domain_id: string
          state_code?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          summary: string
          title: string
          topic: Database["public"]["Enums"]["resource_topic"]
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          last_verified_at?: string
          published_at?: string | null
          search_vector?: never
          slug?: string
          sort_order?: number
          source_domain_id?: string
          state_code?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          summary?: string
          title?: string
          topic?: Database["public"]["Enums"]["resource_topic"]
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "resources_source_domain_id_fkey"
            columns: ["source_domain_id"]
            isOneToOne: false
            referencedRelation: "source_domains"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resources_state_code_fkey"
            columns: ["state_code"]
            isOneToOne: false
            referencedRelation: "states"
            referencedColumns: ["code"]
          },
        ]
      }
      source_domains: {
        Row: {
          created_at: string
          domain: string
          id: string
          is_active: boolean
          publisher_name: string
          publisher_type: Database["public"]["Enums"]["publisher_type"]
        }
        Insert: {
          created_at?: string
          domain: string
          id?: string
          is_active?: boolean
          publisher_name: string
          publisher_type: Database["public"]["Enums"]["publisher_type"]
        }
        Update: {
          created_at?: string
          domain?: string
          id?: string
          is_active?: boolean
          publisher_name?: string
          publisher_type?: Database["public"]["Enums"]["publisher_type"]
        }
        Relationships: []
      }
      states: {
        Row: {
          code: string
          created_at: string
          is_active: boolean
          name: string
        }
        Insert: {
          code: string
          created_at?: string
          is_active?: boolean
          name: string
        }
        Update: {
          code?: string
          created_at?: string
          is_active?: boolean
          name?: string
        }
        Relationships: []
      }
      updates: {
        Row: {
          created_at: string
          id: string
          last_verified_at: string
          published_at: string | null
          search_vector: unknown | null
          slug: string
          source_domain_id: string
          source_published_at: string | null
          state_code: string | null
          status: Database["public"]["Enums"]["content_status"]
          summary: string
          title: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_verified_at: string
          published_at?: string | null
          search_vector?: never
          slug: string
          source_domain_id: string
          source_published_at?: string | null
          state_code?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          summary: string
          title: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          last_verified_at?: string
          published_at?: string | null
          search_vector?: never
          slug?: string
          source_domain_id?: string
          source_published_at?: string | null
          state_code?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          summary?: string
          title?: string
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "updates_source_domain_id_fkey"
            columns: ["source_domain_id"]
            isOneToOne: false
            referencedRelation: "source_domains"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "updates_state_code_fkey"
            columns: ["state_code"]
            isOneToOne: false
            referencedRelation: "states"
            referencedColumns: ["code"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      content_status: "draft" | "reviewed" | "published" | "archived"
      publisher_type: "government" | "regulator" | "private_nonprofit"
      question_status: "submitted" | "researching" | "answered" | "closed"
      resource_topic:
        | "complaints"
        | "utility"
        | "financing"
        | "records"
        | "programs"
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
      content_status: ["draft", "reviewed", "published", "archived"],
      publisher_type: ["government", "regulator", "private_nonprofit"],
      question_status: ["submitted", "researching", "answered", "closed"],
      resource_topic: [
        "complaints",
        "utility",
        "financing",
        "records",
        "programs",
      ],
    },
  },
} as const
