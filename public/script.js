const routes = {
  '/': loginPage,
  '/register': registerPage,
  '/dashboard': dashboardPage
};

function loginPage() {
  document.getElementById('app').innerHTML = `
    <div class="container">
      <h2>Login</h2>
      <input type="email" id="login-email" placeholder="Email" required>
      <input type="password" id="login-password" placeholder="Password" required>
      <label><input type="checkbox" onclick="togglePassword('login-password')"> Show Password</label>

      <div id="login-strength-meter"><div id="login-strength-bar"></div></div>
      <div id="login-strength-text" style="font-size:12px; margin-top:5px;"></div>

      <div id="login-error-msg"></div>
      <button onclick="login()">Login</button>
      <p>Don't have an account? <a href="#/register">Register</a></p>
    </div>
  `;

  setTimeout(() => {
    const loginPwdInput = document.getElementById('login-password');
    if (loginPwdInput) loginPwdInput.addEventListener('input', updateLoginStrengthMeter);
  }, 0);
}

function registerPage() {
  document.getElementById('app').innerHTML = `
    <div class="container">
      <h2>Register</h2>
      <input type="email" id="email" placeholder="Email" required>
      <input type="password" id="password" placeholder="Password" required>
      <label><input type="checkbox" onclick="togglePassword('password')"> Show Password</label>

      <div id="strength-meter"><div id="strength-bar"></div></div>
      <div id="strength-text" style="font-size:12px; margin-top:5px;"></div>

      <input type="password" id="confirm" placeholder="Confirm Password" required>

      <div id="error-msg"></div>
      <button onclick="register()">Register</button>
    </div>
  `;

  setTimeout(() => {
    const pwdInput = document.getElementById('password');
    if (pwdInput) pwdInput.addEventListener('input', updateStrengthMeter);
  }, 0);
}

function dashboardPage() {
  document.getElementById('app').innerHTML = `
    <div class="container">
      <h2>Welcome to Dashboard</h2>
      <button onclick="navigateTo('/')">Logout</button>
    </div>
  `;
}

function updateStrengthMeter() {
  const strengthBar = document.getElementById('strength-bar');
  const password = document.getElementById('password').value;
  const strengthText = document.getElementById('strength-text');
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  const percent = (strength / 4) * 100;
  strengthBar.style.width = percent + '%';
  strengthBar.style.backgroundColor = percent < 50 ? 'red' : percent < 75 ? 'orange' : 'green';

  strengthText.textContent = percent === 100 ? 'Strong' : percent >= 75 ? 'Medium' : 'Weak';
  strengthText.style.color = percent === 100 ? 'green' : percent >= 75 ? 'orange' : 'red';
}

function updateLoginStrengthMeter() {
  const strengthBar = document.getElementById('login-strength-bar');
  const strengthText = document.getElementById('login-strength-text');
  const password = document.getElementById('login-password').value;
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  const percent = (strength / 4) * 100;
  strengthBar.style.width = percent + '%';
  strengthBar.style.backgroundColor = percent < 50 ? 'red' : percent < 75 ? 'orange' : 'green';

  strengthText.textContent = percent === 100 ? 'Strong' : percent >= 75 ? 'Medium' : 'Weak';
  strengthText.style.color = percent === 100 ? 'green' : percent >= 75 ? 'orange' : 'red';
}

function togglePassword(id) {
  const input = document.getElementById(id);
  input.type = input.type === 'password' ? 'text' : 'password';
}

function login() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const errorMsg = document.getElementById('login-error-msg');

  errorMsg.textContent = '';

  if (!email || !password) {
    errorMsg.textContent = 'Please fill in all fields.';
    return;
  }

  if (!/.+@.+\..+/.test(email)) {
    errorMsg.textContent = 'Invalid email format.';
    return;
  }

  fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then(res => {
      if (!res.ok) throw new Error('Invalid login');
      return res.json();
    })
    .then(data => {
      if (data.success) {
        navigateTo('/dashboard');
      } else {
        errorMsg.textContent = data.message || 'Login failed';
      }
    });
   
}

function register() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirm = document.getElementById('confirm').value;
  const errorMsg = document.getElementById('error-msg');

  errorMsg.textContent = '';

  if (!email || !password || !confirm) {
    errorMsg.innerText = 'All fields are required.';
    return;
  }

  if (!/.+@.+\..+/.test(email)) {
    errorMsg.innerText = 'Invalid email format.';
    return;
  }

  if (password !== confirm) {
    errorMsg.innerText = 'Passwords do not match.';
    return;
  }

  if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
    errorMsg.innerText = 'Password must be at least 8 characters long and include uppercase, number, and special character.';
    return;
  }

  fetch('http://localhost:3000/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then(res => {
      if (!res.ok) throw new Error('Registration failed');
      return res.json();
    })
    .then(data => {
      if (data.success) {
        alert('Registration successful! Please login.');
        navigateTo('/');
      } else {
        errorMsg.innerText = data.message || 'Registration failed.';
      }
    })
    .catch(() => {
      errorMsg.innerText = 'Something went wrong. Please try again.';
    });
}

function navigateTo(path) {
  window.location.hash = path;
  renderRoute();
}

function renderRoute() {
  const hashPath = window.location.hash.replace('#', '') || '/';
  const page = routes[hashPath] || loginPage;
  page();
}

window.addEventListener('hashchange', renderRoute);
window.addEventListener('DOMContentLoaded', () => {
  renderRoute();
});
