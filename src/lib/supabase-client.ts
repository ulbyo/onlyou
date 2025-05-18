
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

// Using values from the Supabase integration
const supabaseUrl = 'https://ubbqfkuqomemfhktobjh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViYnFma3Vxb21lbWZoa3RvYmpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0NDkwNzEsImV4cCI6MjA2MzAyNTA3MX0.vdw_fHytoL3hvZhVxR6Li5o9_scJf5_5_HR9G4T8vfM';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Helper functions for database operations
export async function getPosts(userId: string | null = null) {
  let query = supabase.from('posts').select('*');
  
  if (userId) {
    query = query.eq('owner_id', userId);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getPostById(postId: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', postId)
    .single();
  
  if (error) throw error;
  return data;
}

export async function getQuestionsForPost(postId: string) {
  const { data, error } = await supabase
    .from('questions')
    .select('*, answers(*)')
    .eq('post_id', postId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function createPost(title: string, description: string, userId: string) {
  const { data, error } = await supabase
    .from('posts')
    .insert([{ title, description, owner_id: userId }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function createQuestion(postId: string, content: string) {
  const { data, error } = await supabase
    .from('questions')
    .insert([{ post_id: postId, content, answered: false }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function createAnswer(questionId: string, content: string) {
  const { data: answerData, error: answerError } = await supabase
    .from('answers')
    .insert([{ question_id: questionId, content }])
    .select()
    .single();
  
  if (answerError) throw answerError;
  
  // Update the question to mark it as answered
  const { error: questionError } = await supabase
    .from('questions')
    .update({ answered: true })
    .eq('id', questionId);
  
  if (questionError) throw questionError;
  
  return answerData;
}
