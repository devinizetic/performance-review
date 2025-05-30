export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      answers: {
        Row: {
          created_at: string
          feedback_choice_id: string | null
          feedback_text: string | null
          id: string
          question_id: string
          reviewee_answer_choice_id: string | null
          reviewee_answer_text: string | null
          reviewer_answer_choice_id: string | null
          reviewer_answer_text: string | null
          user_review_id: string
        }
        Insert: {
          created_at?: string
          feedback_choice_id?: string | null
          feedback_text?: string | null
          id?: string
          question_id: string
          reviewee_answer_choice_id?: string | null
          reviewee_answer_text?: string | null
          reviewer_answer_choice_id?: string | null
          reviewer_answer_text?: string | null
          user_review_id: string
        }
        Update: {
          created_at?: string
          feedback_choice_id?: string | null
          feedback_text?: string | null
          id?: string
          question_id?: string
          reviewee_answer_choice_id?: string | null
          reviewee_answer_text?: string | null
          reviewer_answer_choice_id?: string | null
          reviewer_answer_text?: string | null
          user_review_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "answers_feedback_choice_id_fkey"
            columns: ["feedback_choice_id"]
            isOneToOne: false
            referencedRelation: "choices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_reviewee_answer_choice_id_fkey"
            columns: ["reviewee_answer_choice_id"]
            isOneToOne: false
            referencedRelation: "choices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_reviewer_answer_choice_id_fkey"
            columns: ["reviewer_answer_choice_id"]
            isOneToOne: false
            referencedRelation: "choices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_user_review_id_fkey"
            columns: ["user_review_id"]
            isOneToOne: false
            referencedRelation: "feedback_scores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_user_review_id_fkey"
            columns: ["user_review_id"]
            isOneToOne: false
            referencedRelation: "reviewerreviewee"
            referencedColumns: ["user_review_id"]
          },
          {
            foreignKeyName: "answers_user_review_id_fkey"
            columns: ["user_review_id"]
            isOneToOne: false
            referencedRelation: "user_review"
            referencedColumns: ["id"]
          },
        ]
      }
      app_users: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          is_active: boolean
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          is_active?: boolean
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          is_active?: boolean
          username?: string
        }
        Relationships: []
      }
      choices: {
        Row: {
          choice_text_reviewee: string
          choice_text_reviewer: string
          choice_value: number | null
          id: string
        }
        Insert: {
          choice_text_reviewee: string
          choice_text_reviewer: string
          choice_value?: number | null
          id?: string
        }
        Update: {
          choice_text_reviewee?: string
          choice_text_reviewer?: string
          choice_value?: number | null
          id?: string
        }
        Relationships: []
      }
      external_review_answers: {
        Row: {
          answer: Json | null
          external_review_id: string
          external_review_question_id: string
          id: string
          submitted_at: string
        }
        Insert: {
          answer?: Json | null
          external_review_id: string
          external_review_question_id: string
          id?: string
          submitted_at?: string
        }
        Update: {
          answer?: Json | null
          external_review_id?: string
          external_review_question_id?: string
          id?: string
          submitted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "external_review_answers_external_review_id_fkey"
            columns: ["external_review_id"]
            isOneToOne: false
            referencedRelation: "external_reviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "external_review_answers_external_review_question_id_fkey"
            columns: ["external_review_question_id"]
            isOneToOne: false
            referencedRelation: "external_review_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      external_review_questions: {
        Row: {
          created_at: string
          external_review_id: string
          id: string
          options: Json | null
          order: number
          text: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          external_review_id: string
          id?: string
          options?: Json | null
          order: number
          text: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          external_review_id?: string
          id?: string
          options?: Json | null
          order?: number
          text?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "external_review_questions_external_review_id_fkey"
            columns: ["external_review_id"]
            isOneToOne: false
            referencedRelation: "external_reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      external_reviews: {
        Row: {
          company_name: string | null
          completed_at: string | null
          created_at: string
          id: string
          language: string
          review_id: string
          reviewee_id: string
          reviewer_name: string | null
          status: string
          token: string
        }
        Insert: {
          company_name?: string | null
          completed_at?: string | null
          created_at?: string
          id?: string
          language?: string
          review_id: string
          reviewee_id: string
          reviewer_name?: string | null
          status: string
          token?: string
        }
        Update: {
          company_name?: string | null
          completed_at?: string | null
          created_at?: string
          id?: string
          language?: string
          review_id?: string
          reviewee_id?: string
          reviewer_name?: string | null
          status?: string
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "external_reviews_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "external_reviews_reviewee_id_fkey"
            columns: ["reviewee_id"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
        ]
      }
      question_choice: {
        Row: {
          choice_id: string
          choice_sequence: number
          question_id: string
        }
        Insert: {
          choice_id: string
          choice_sequence?: number
          question_id: string
        }
        Update: {
          choice_id?: string
          choice_sequence?: number
          question_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "question_choice_choice_id_fkey"
            columns: ["choice_id"]
            isOneToOne: false
            referencedRelation: "choices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_choice_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      question_hints: {
        Row: {
          hint_sequence: number
          hint_text_reviewee: string
          hint_text_reviewer: string
          id: string
          question_id: string
        }
        Insert: {
          hint_sequence: number
          hint_text_reviewee: string
          hint_text_reviewer: string
          id?: string
          question_id: string
        }
        Update: {
          hint_sequence?: number
          hint_text_reviewee?: string
          hint_text_reviewer?: string
          id?: string
          question_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "question_hints_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          id: string
          question_answer_type: Database["public"]["Enums"]["answer_type"]
          question_description: string | null
          question_text_reviewee: string
          question_text_reviewer: string
          question_title: string | null
          role_id: string | null
        }
        Insert: {
          id?: string
          question_answer_type: Database["public"]["Enums"]["answer_type"]
          question_description?: string | null
          question_text_reviewee: string
          question_text_reviewer: string
          question_title?: string | null
          role_id?: string | null
        }
        Update: {
          id?: string
          question_answer_type?: Database["public"]["Enums"]["answer_type"]
          question_description?: string | null
          question_text_reviewee?: string
          question_text_reviewer?: string
          question_title?: string | null
          role_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      review_question: {
        Row: {
          question_id: string
          question_sequence: number
          review_id: string
        }
        Insert: {
          question_id: string
          question_sequence?: number
          review_id: string
        }
        Update: {
          question_id?: string
          question_sequence?: number
          review_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_question_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_question_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      reviewer_reviewee: {
        Row: {
          reviewee_id: string
          reviewer_id: string
        }
        Insert: {
          reviewee_id: string
          reviewer_id: string
        }
        Update: {
          reviewee_id?: string
          reviewer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviewer_reviewee_reviewee_id_fkey"
            columns: ["reviewee_id"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviewer_reviewee_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          created_at: string
          end_date: string | null
          id: string
          is_active: boolean
          is_deleted: boolean
          name: string
          start_date: string | null
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: string
          is_active: boolean
          is_deleted?: boolean
          name: string
          start_date?: string | null
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: string
          is_active?: boolean
          is_deleted?: boolean
          name?: string
          start_date?: string | null
        }
        Relationships: []
      }
      roles: {
        Row: {
          id: string
          role_name: string
        }
        Insert: {
          id?: string
          role_name: string
        }
        Update: {
          id?: string
          role_name?: string
        }
        Relationships: []
      }
      user_review: {
        Row: {
          created_at: string
          feedback_completed_timestamp: string | null
          id: string
          initial_email_sent: boolean
          review_id: string
          reviewee_completed_timestamp: string | null
          reviewee_id: string
          reviewee_started_timestamp: string | null
          reviewer_completed_timestamp: string | null
          reviewer_id: string
          reviewer_started_timestamp: string | null
        }
        Insert: {
          created_at?: string
          feedback_completed_timestamp?: string | null
          id?: string
          initial_email_sent?: boolean
          review_id: string
          reviewee_completed_timestamp?: string | null
          reviewee_id: string
          reviewee_started_timestamp?: string | null
          reviewer_completed_timestamp?: string | null
          reviewer_id: string
          reviewer_started_timestamp?: string | null
        }
        Update: {
          created_at?: string
          feedback_completed_timestamp?: string | null
          id?: string
          initial_email_sent?: boolean
          review_id?: string
          reviewee_completed_timestamp?: string | null
          reviewee_id?: string
          reviewee_started_timestamp?: string | null
          reviewer_completed_timestamp?: string | null
          reviewer_id?: string
          reviewer_started_timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_review_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_review_reviewee_id_fkey"
            columns: ["reviewee_id"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_review_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_role: {
        Row: {
          role_id: string
          user_id: string
        }
        Insert: {
          role_id: string
          user_id: string
        }
        Update: {
          role_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_role_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_role_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      answers_sorted: {
        Row: {
          feedback_answer_id: string | null
          feedback_choice_id: string | null
          feedback_text: string | null
          id: string | null
          question_sequence: number | null
          reviewee_answer_choice_id: string | null
          reviewee_answer_text: string | null
          reviewer_answer_choice_id: string | null
          reviewer_answer_text: string | null
          user_review_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "answers_feedback_choice_id_fkey"
            columns: ["feedback_choice_id"]
            isOneToOne: false
            referencedRelation: "choices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_question_id_fkey"
            columns: ["id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_reviewee_answer_choice_id_fkey"
            columns: ["reviewee_answer_choice_id"]
            isOneToOne: false
            referencedRelation: "choices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_reviewer_answer_choice_id_fkey"
            columns: ["reviewer_answer_choice_id"]
            isOneToOne: false
            referencedRelation: "choices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_user_review_id_fkey"
            columns: ["user_review_id"]
            isOneToOne: false
            referencedRelation: "feedback_scores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_user_review_id_fkey"
            columns: ["user_review_id"]
            isOneToOne: false
            referencedRelation: "reviewerreviewee"
            referencedColumns: ["user_review_id"]
          },
          {
            foreignKeyName: "answers_user_review_id_fkey"
            columns: ["user_review_id"]
            isOneToOne: false
            referencedRelation: "user_review"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback_scores: {
        Row: {
          id: string | null
          reviewee_name: string | null
          reviewer_name: string | null
          score: number | null
        }
        Relationships: []
      }
      reviewerreviewee: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          reviewee_completed: boolean | null
          reviewee_id: string | null
          reviewer_completed: boolean | null
          reviewer_id: string | null
          user_review_id: string | null
          username: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviewer_reviewee_reviewee_id_fkey"
            columns: ["reviewee_id"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviewer_reviewee_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      create_user: {
        Args: {
          email: string
          password: string
        }
        Returns: undefined
      }
    }
    Enums: {
      answer_type: "text" | "multiple_choice" | "multiple_choice_with_text"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

