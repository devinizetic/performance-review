export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
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
          }
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
        Relationships: [
          {
            foreignKeyName: "app_users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
          }
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
          }
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
          }
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
          }
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
          }
        ]
      }
      reviews: {
        Row: {
          created_at: string
          end_date: string | null
          id: string
          is_active: boolean
          start_date: string | null
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: string
          is_active: boolean
          start_date?: string | null
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: string
          is_active?: boolean
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
          }
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
          }
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
            referencedRelation: "user_review"
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
          }
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
          }
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
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

