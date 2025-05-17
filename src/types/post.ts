
export interface Question {
  id: string;
  content: string;
  timestamp: string;
  answered: boolean;
  answer?: {
    content: string;
    timestamp: string;
  };
}

export interface Post {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  questions: Question[];
}
