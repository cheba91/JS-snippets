  const validateEmail = (email) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      String(email).toLowerCase()
    );

  const validatePassword = (pass) => {
    // Check for a minimum length of 8 characters
    if (pass.length < 8) return false;

    // Check for any whitespace
    if (/\s/.test(pass)) return false;

    // Variables to check presence of character types
    let hasUpper = /[A-Z]/.test(pass);
    let hasLower = /[a-z]/.test(pass);
    let hasNumber = /[0-9]/.test(pass);
    let hasSpecial = /[!@#$%^&*(){}[\]<>?/,.:;'"\\|_+=~`-]/.test(pass);

    // Count how many of the required categories are present
    let categories = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;

    // Ensure at least 3 of the 4 categories are met
    return categories >= 3;
  };
