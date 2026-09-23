export interface AuthUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  picture?: string;
  sub?: string;

}

export interface UserProfileData {
  phone?: string;
  city?: string;
  district?: string;
  address?: string;
}

export interface UserSettingFormProps {
  user: AuthUser;
  initialData?: UserProfileData;
} 