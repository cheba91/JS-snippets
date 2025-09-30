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

// Date MM/DD/YYY, with max 12, 31, and curr year
  document.addEventListener('DOMContentLoaded', () => {
    const dateField = document.querySelector('[form-field="date"]');
    const currentYear = new Date().getFullYear();

    dateField.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      let formatted = '';

      // Handle month (MM) - max 12
      if (value.length >= 1) {
        let month = value.slice(0, 2);
        if (parseInt(month[0]) > 1) {
          month = '0' + month[0];
          value = month + value.slice(1);
        }
        if (value.length >= 2 && parseInt(month) > 12) {
          month = '12';
          value = month + value.slice(2);
        }
        formatted = month.slice(0, 2);
      }

      // Handle day (DD) - max 31
      if (value.length >= 3) {
        let day = value.slice(2, 4);
        if (parseInt(day[0]) > 3) {
          day = '0' + day[0];
          value = value.slice(0, 2) + day + value.slice(3);
        }
        if (value.length >= 4 && parseInt(day) > 31) {
          day = '31';
          value = value.slice(0, 2) + day + value.slice(4);
        }
        formatted += '/' + day;
      }

      // Handle year (YYYY) - max current year
      if (value.length >= 5) {
        let year = value.slice(4, 8);
        if (year.length === 4 && parseInt(year) > currentYear) {
          year = currentYear.toString();
        }
        formatted += '/' + year;
      }

      e.target.value = formatted;
    });

    dateField.addEventListener('keypress', (e) => {
      if (!/[\d]/.test(e.key) && !['Backspace', 'Tab', 'Enter', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
    });
  });
