export interface Task {
  _id?: string;
  title: string;
  description: string;
  priority: Priorty;
  date: string;
  category: Category;
  tags: string[];
  isDone: boolean;
}

export type Priorty = 'low' | 'medium' | 'high';
export type Category = 'work' | 'personal' | 'study';

export interface TaskResponse {
  success: boolean;
  message?: string;
  task?: Task;
  tasks?: Task[];
}
