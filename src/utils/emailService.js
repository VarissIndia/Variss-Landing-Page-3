import emailjs from "@emailjs/browser";

export const sendWelcomeEmail = async (userData) => {
  try {
    // Validate required user data
    if (!userData?.name || !userData?.email) {
      throw new Error("Missing required user data: name and email are required");
    }

    // console.log(userData);

    const templateParams = {
      name: userData.name,
      email: userData.email,
      profile:userData.profile,

    };

    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,    // Service ID from EmailJS dashboard
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,   // Template ID from EmailJS dashboard
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY   // Public key from EmailJS dashboard
    );

    console.log("Welcome email sent successfully:", response);
    return {
      success: true,
      response: response,
      message: "Welcome email sent successfully"
    };

  } catch (error) {
    console.error("Error sending welcome email:", error);
    
    // Return structured error response
    return {
      success: false,
      error: error.message || "Failed to send welcome email",
      details: error
    };
  }
};