export interface Call {
  id: number;
  code: string;
  title: string;
  location: string;
  status: string;
  priority: number;
  created_at: string;
  call_units: {
    unit_id: number;
    units: {
      id: number;
      callsign: string;
      department: string;
    };
  }[];
}

export interface Unit {
  id: number;
  callsign: string;
  name: string;
  department: string;
  status: string;
  created_at: string;
  user_id: string | null;
  role: string | null;
}

export interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  licenses: string[];
  dob: string;
  created_at: string;
}
