import jwt from 'jsonwebtoken' 
export function generateTokenjwt(userId: string): string {
    // Generate JWT token
    const token = jwt.sign({ userId }, "1qaz2wsx3edc", {
      expiresIn: "1h",
    });
    return token;
  }