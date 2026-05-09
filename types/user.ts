export const USER_ROLES = [
  "user",
  "seller",
  "employer",
  "premium_user",
  "moderator",
  "admin",
] as const;

export type UserRole = (typeof USER_ROLES)[number];

export interface AuthUser {
  uid: string; // Firebase UID
  email: string | null;
  emailVerified: boolean;
  phoneNumber: string | null;
  displayName: string | null;
  photoURL: string | null;
  providerId: string;
}

export interface AppUser extends AuthUser {
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  isBanned: boolean;
  preferredLocale: string;
}

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  user: 1,
  seller: 2,
  employer: 2,
  premium_user: 3,
  moderator: 4,
  admin: 5,
};

export function hasRoleAtLeast(actual: UserRole, required: UserRole): boolean {
  return ROLE_HIERARCHY[actual] >= ROLE_HIERARCHY[required];
}
