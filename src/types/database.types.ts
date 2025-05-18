
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
      posts: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          owner_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description: string
          owner_id: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          owner_id?: string
        }
      }
      questions: {
        Row: {
          id: string
          post_id: string
          content: string
          created_at: string
          answered: boolean
        }
        Insert: {
          id?: string
          post_id: string
          content: string
          created_at?: string
          answered?: boolean
        }
        Update: {
          id?: string
          post_id?: string
          content?: string
          created_at?: string
          answered?: boolean
        }
      }
      answers: {
        Row: {
          id: string
          question_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          question_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          question_id?: string
          content?: string
          created_at?: string
        }
      }
    }
  }
}
