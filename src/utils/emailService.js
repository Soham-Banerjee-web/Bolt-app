export class EmailService {
  static generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  static sendVerificationEmail(email, code) {
    // In a real application, this would send an actual email
    // For demo purposes, we'll log it to the console
    console.log(`
      📧 Email Verification
      To: ${email}
      Subject: Verify your MindWell account
      
      Your verification code is: ${code}
      
      This code will expire in 10 minutes.
      
      If you didn't request this verification, please ignore this email.
    `);
    
    // Simulate email sending delay
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }

  static sendPasswordResetEmail(email, resetToken) {
    console.log(`
      📧 Password Reset
      To: ${email}
      Subject: Reset your MindWell password
      
      Click the link below to reset your password:
      https://mindwell.app/reset-password?token=${resetToken}
      
      This link will expire in 1 hour.
      
      If you didn't request this reset, please ignore this email.
    `);
    
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }
}