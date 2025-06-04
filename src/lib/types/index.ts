/**
 * Shared TypeScript types used across the application
 */

export interface RawCsvRow {
  job_title: string;
  company: string;
  job_location: string;
  job_link: string;
  first_seen: string;
  search_city: string;
  search_country: string;
  job_level: string;
  job_type: string;
  job_summary: string;
  job_skills: string;
}

export interface SynthesizedJobPosting {
  title_metadata: string;
  skills_list: string[];
  role_summary: string[];
}

export interface BragbookSummary {
  achievement_summary: string[];
} 