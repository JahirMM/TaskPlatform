export interface RecentlyViewedProjectInterface {
  id: string;
  project_id: string;
  last_viewed_at: string;
  project: {
    name: string;
    description: string;
    created_at: string;
  };
}
