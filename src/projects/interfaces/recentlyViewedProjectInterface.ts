export interface RecentlyViewedProjectInterface {
  id: string;
  project_id: string;
  last_viewed_at: string;
  project: {
    owner_id: string;
    name: string;
    description: string;
    created_at: string;
  };
}
