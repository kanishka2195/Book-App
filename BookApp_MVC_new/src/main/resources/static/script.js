// Smooth scrolling for anchor links
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
  });
});

// Toggle password visibility (login page)
function togglePassword() {
  const pwd = document.getElementById('password');
  if (pwd.type === 'password') {
    pwd.type = 'text';
  } else {
    pwd.type = 'password';
  }
}

// Form validation (login)
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();
      if (username === '' || password === '') {
        alert('Please enter both username and password.');
        return;
      }
      // Simple admin check (demo only)
      if (username === 'admin' && password === 'admin123') {
        window.location.href = 'admin-home.html';
      } else {
        alert('Invalid credentials!');
      }
    });
  }
});

// Hero Search Form functionality
document.addEventListener('DOMContentLoaded', () => {
  const heroSearchForm = document.getElementById('heroSearchForm');
  const heroSearchInput = document.getElementById('heroSearchInput');
  const heroSearchResults = document.getElementById('heroSearchResults');
  
  if (heroSearchForm) {
    heroSearchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const searchTerm = heroSearchInput.value.trim();
      const filterType = document.getElementById('heroFilterType').value;
      const sortBy = document.getElementById('heroSortBy').value;
      
      if (searchTerm === '') {
        // Show popular books if no search term
        showPopularBooks();
        return;
      }
      
      // Simulate search functionality
      performHeroSearch(searchTerm, filterType, sortBy);
    });
    
    // Real-time search suggestions
    heroSearchInput.addEventListener('input', function() {
      const searchTerm = this.value.trim();
      if (searchTerm.length > 2) {
        showSearchSuggestions(searchTerm);
      } else {
        showPopularBooks();
      }
    });
  }
});

// Simulate search functionality
function performHeroSearch(searchTerm, filterType, sortBy) {
  const resultsHeader = document.querySelector('.results-header h3');
  const resultsCount = document.querySelector('.results-count');
  
  // Simulate search results
  const mockResults = [
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publisher: 'Scribner',
      price: '$12.99',
      image: 'https://via.placeholder.com/300x400/4f46e5/ffffff?text=The+Great+Gatsby'
    },
    {
      title: '1984',
      author: 'George Orwell',
      publisher: 'Penguin Books',
      price: '$9.99',
      image: 'https://via.placeholder.com/300x400/f97316/ffffff?text=1984'
    }
  ];
  
  // Update results header
  resultsHeader.textContent = `Search Results for "${searchTerm}"`;
  resultsCount.textContent = `${mockResults.length} books found`;
  
  // Update results grid (in a real app, this would render the actual results)
  console.log(`Searching for: ${searchTerm} with filter: ${filterType} and sort: ${sortBy}`);
  
  // Show success message
  showSearchSuccess(searchTerm);
}

// Show popular books
function showPopularBooks() {
  const resultsHeader = document.querySelector('.results-header h3');
  const resultsCount = document.querySelector('.results-count');
  
  resultsHeader.textContent = 'Popular Books';
  resultsCount.textContent = '3 books found';
}

// Show search suggestions
function showSearchSuggestions(searchTerm) {
  console.log(`Showing suggestions for: ${searchTerm}`);
  // In a real app, this would show autocomplete suggestions
}

// Show search success message
function showSearchSuccess(searchTerm) {
  // Create a temporary success message
  const successMsg = document.createElement('div');
  successMsg.className = 'search-success';
  successMsg.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(45deg, var(--accent), var(--accent-alt));
      color: white;
      padding: 1rem 2rem;
      border-radius: 1rem;
      box-shadow: 0 8px 32px rgba(244,63,94,0.3);
      z-index: 1000;
      animation: slideInRight 0.5s ease-out;
    ">
      🔍 Search completed for "${searchTerm}"
    </div>
  `;
  
  document.body.appendChild(successMsg);
  
  // Remove after 3 seconds
  setTimeout(() => {
    successMsg.remove();
  }, 3000);
}

// Book management logic (localStorage)
// Placeholder: Add, Edit, Delete, Search, Render Books, etc.
// Implement logic for each page as needed. 

function isLoggedIn() {
  // Replace with backend check in future
  return localStorage.getItem('isLoggedIn') === 'true';
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.auth-only').forEach(el => {
    el.style.display = isLoggedIn() ? '' : 'none';
  });
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      localStorage.removeItem('isLoggedIn');
      window.location.reload();
    });
  }
  const forgotForm = document.getElementById('forgotPasswordForm');
  if (forgotForm) {
    forgotForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('forgotEmail').value;
      // TODO: Replace with backend API call
      fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      .then(res => res.json())
      .then(data => {
        document.getElementById('forgotMsg').textContent = data.message || 'If this email is registered, a reset link has been sent.';
      })
      .catch(() => {
        document.getElementById('forgotMsg').textContent = 'If this email is registered, a reset link has been sent.';
      });
    });
  }
  // Delete Book handler for edit-book page
  const deleteBtn = document.getElementById('deleteBookBtn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', function() {
      if (confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
        // TODO: Replace with backend API call to delete the book
        // Example: fetch('/api/books/:id', { method: 'DELETE' })
        alert('Book deleted (placeholder). Implement backend call.');
        // Optionally redirect after delete
        window.location.href = 'view-books.html';
      }
    });
  }
}); 