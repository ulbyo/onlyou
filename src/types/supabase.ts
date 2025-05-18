
export interface DbPost {
  id: string;
  title: string;
  description: string;
  created_at: string;
  owner_id: string;
}

export interface DbQuestion {
  id: string;
  post_id: string;
  content: string;
  created_at: string;
  answered: boolean;
}

export interface DbAnswer {
  id: string;
  question_id: string;
  content: string;
  created_at: string;
}
