// Smooth scroll to a section by id
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Menu filtering logic
const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');

    const category = button.getAttribute('data-category');

    menuItems.forEach(item => {
      if (category === 'all') {
        item.style.display = 'flex';
      } else {
        if (item.classList.contains(category)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      }
    });
  });
});

// Reservation form validation & submission handling
const reservationForm = document.getElementById('reservation-form');
const confirmationMsg = document.getElementById('reservation-confirmation');

// Set minimum date to today for date input
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

reservationForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Clear previous confirmation message
  confirmationMsg.textContent = '';

  const name = reservationForm.name.value.trim();
  const email = reservationForm.email.value.trim();
  const phone = reservationForm.phone.value.trim();
  const date = reservationForm.date.value;
  const time = reservationForm.time.value;
  const guests = reservationForm.guests.value;

  // Simple validation
  if (!name || !email || !phone || !date || !time || !guests) {
    alert('Please fill in all required fields.');
    return;
  }

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Phone validation (basic)
  const phoneRegex = /^\+?\d{7,15}$/;
  if (!phoneRegex.test(phone)) {
    alert('Please enter a valid phone number.');
    return;
  }

  // Date should not be in the past (extra check)
  const selectedDate = new Date(date);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  if (selectedDate < now) {
    alert('Please select a valid reservation date.');
    return;
  }

  // If all is valid, show confirmation message
  confirmationMsg.textContent = `Thank you, ${name}! Your table for ${guests} has been reserved on ${date} at ${time}. We will contact you shortly at ${email}.`;

  // Optionally reset form
  reservationForm.reset();
});
