export const saveUserToDatabase = async (userData) => {
  try {
    // Your database implementation
    console.log('User saved:', userData);
    localStorage.setItem('trialUser', JSON.stringify(userData));
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
};