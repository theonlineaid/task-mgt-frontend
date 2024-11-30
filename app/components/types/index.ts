export interface Task {
    _id: string;
    title: string;
    date: string;
    priority: string;
    stage: string;
    isTrashed: boolean;
    activities: any[];
    assets: any[];
    team: any[];
    dependencies: any[];
    subTasks: any[];
    createdAt: string;
    updatedAt: string;
  }