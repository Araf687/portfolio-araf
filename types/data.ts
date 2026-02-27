export interface ProjectImage {
  id: string;
  url: string;
}

export interface ProjectSkill {
  projectId: string;
  skillId: string;
  skill: {
    id: string;
    name?: string;
    category?: string;
    image_url?: string;
  };
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  github_url?: string;
  live_url?: string;
  is_featured?: boolean;
  thumbnail?: string;
  category?: string;
  images?: ProjectImage[];
  skills?: ProjectSkill[];
  created_at?: string;
}

export interface Skill {
  id: string;
  created_at: string;
  name?: string;
  category?: string;
  image_url?: string;
}


// types/cv.ts
export interface CV {
  cv_url?: string;
  cv_name?: string;
  cv_updated_at?: string;
}
