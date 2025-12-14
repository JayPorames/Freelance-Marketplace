export class AuthResponseDto {
  user: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    role: string;
    avatar: string | null;
    isVerified: boolean;
  };
  accessToken: string;
  refreshToken: string;
}
