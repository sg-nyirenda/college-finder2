export type CollegeType =
  | "National Technical College"
  | "Community Technical College"
  | "Community Skills Development Centre";

export type College = {
  id: string;
  name: string;
  type: CollegeType;
  location: string;
  description: string | null;
  fees: string | null;
  deadline: string | null;
  requirements: string | null;
  phone: string | null;
  email: string | null;
  programs: string[];
  form_link?: string | null;
  level?: string | null; // <-- Added Level (e.g. Certificate, Diploma)
};

export type ApplicationStatus =
  | "Submitted"
  | "Under review"
  | "Accepted"
  | "Rejected";

export type Application = {
  id: string;
  reference_no: string;
  college_id: string;
  program: string;
  full_name: string;
  phone: string;
  email: string;
  message: string | null;
  document_path: string | null;
  status: ApplicationStatus;
  created_at: string;
  colleges: { name: string } | null;
};
