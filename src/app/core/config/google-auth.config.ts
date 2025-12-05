/**
 * Google Authentication Configuration
 * Centralized configuration for Google Sign-In
 */

export const GOOGLE_AUTH_CONFIG = {
  /**
   * Google OAuth 2.0 Client ID
   * This must match the GOOGLE_CLIENT_ID in your backend environment variables
   */
  clientId: '930106307738-da8bio1u9of5o2h4ordqb1c8fahhnb61.apps.googleusercontent.com',
  
  /**
   * Button theme configuration
   */
  buttonTheme: 'outline' as const,
  
  /**
   * Button size configuration
   */
  buttonSize: 'small' as const,
};
