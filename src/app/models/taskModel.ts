export interface Task {
  id: string;
  userId: string;
  title: string;
  desc: string;
  priority: Priorty;
  date: string;
  category: Category;
  tags: string;
  isDone: boolean;
}

export type Priorty = 'low' | 'medium' | 'high';
export type Category = 'work' | 'personal' | 'study';
