export interface User {
  id?: string;        
  sub?: string;          
  email?: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
  phone?: string;
  city?: string;
  district?: string;
  address?: string;
}

export interface ProfileFormProps {
  user: User | null;
}