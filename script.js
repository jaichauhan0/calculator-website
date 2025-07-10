// 📌 Arithmetic Calculator
function calculateArithmetic() {
  const n1 = parseFloat(document.getElementById('num1').value);
  const n2 = parseFloat(document.getElementById('num2').value);
  const op = document.getElementById('operation').value;
  let result;

  if (isNaN(n1) || isNaN(n2)) {
    result = "Enter valid numbers!";
  } else {
    switch (op) {
      case "+": result = n1 + n2; break;
      case "-": result = n1 - n2; break;
      case "*": result = n1 * n2; break;
      case "/": result = n2 !== 0 ? n1 / n2 : "Divide by zero!"; break;
    }
  }

  document.getElementById('arithmeticResult').innerText = `Result: ${result}`;
}

// 📏 Area of Circle
function calculateArea() {
  const r = parseFloat(document.getElementById('radius').value);
  const area = isNaN(r) ? "Invalid radius" : (Math.PI * r * r).toFixed(2);
  document.getElementById('areaResult').innerText = `Area: ${area}`;
}

// 🌡️ Temperature Converter
function convertTemperature() {
  const temp = parseFloat(document.getElementById('tempInput').value);
  const unit = document.getElementById('tempUnit').value;
  let result = "Invalid input";

  if (!isNaN(temp)) {
    result = unit === "CtoF"
      ? `${(temp * 9 / 5 + 32).toFixed(2)} °F`
      : `${((temp - 32) * 5 / 9).toFixed(2)} °C`;
  }

  document.getElementById('tempResult').innerText = `Converted: ${result}`;
}

// 📆 Age Calculator
function calculateAge() {
  const birth = new Date(document.getElementById('birthDate').value);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  document.getElementById('ageResult').innerText = isNaN(age) ? "Invalid date" : `Age: ${age} years`;
}

// ⚖️ BMI Calculator
function calculateBMI() {
  const w = parseFloat(document.getElementById('weight').value);
  const h = parseFloat(document.getElementById('height').value) / 100;
  if (!w || !h) {
    document.getElementById('bmiResult').innerText = 'Enter valid inputs';
    return;
  }
  const bmi = (w / (h * h)).toFixed(2);
  let status = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese';
  document.getElementById('bmiResult').innerText = `BMI: ${bmi} (${status})`;
}

// 💸 Loan EMI
function calculateEMI() {
  const P = parseFloat(document.getElementById('loanAmount').value);
  const R = parseFloat(document.getElementById('annualInterest').value) / 12 / 100;
  const N = parseFloat(document.getElementById('loanTenure').value) * 12;
  if (!P || !R || !N) {
    document.getElementById('emiResult').innerText = "Fill all fields!";
    return;
  }
  const EMI = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
  document.getElementById('emiResult').innerText = `EMI: ₹${EMI.toFixed(2)}`;
}

// 🌍 Currency Converter
async function convertCurrency() {
  const amt = parseFloat(document.getElementById('currencyAmount').value);
  const from = document.getElementById('currencyFrom').value.toLowerCase();
  const to = document.getElementById('currencyTo').value.toLowerCase();
  const resultEl = document.getElementById('currencyResult');

  if (!amt || !from || !to) {
    resultEl.innerText = 'Check all fields';
    return;
  }

  try {
    const res = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`);
    const data = await res.json();
    const rate = data[from][to];
    if (!rate) throw new Error('Rate missing');
    resultEl.innerText = `Converted: ${(amt * rate).toFixed(2)} ${to.toUpperCase()}`;
  } catch {
    resultEl.innerText = 'Conversion error.';
  }
}

// 🌓 Theme Toggle
function toggleTheme() {
  const isDark = document.body.classList.toggle('dark');
  document.getElementById('modeLabel').innerText = isDark ? 'Dark' : 'Light';
}

// 📍 ScrollSpy Navigation Highlight
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);

      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove("active"));
        navLink?.classList.add("active");
      }
    });
  },
  { threshold: 0.6 }
);

sections.forEach((section) => {
  if (section.id) observer.observe(section);
});

// 🔽 Auto-Hide Navbar on Scroll
let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop && currentScroll > 100) {
    navbar.classList.add("hidden"); // Scrolling down
  } else {
    navbar.classList.remove("hidden"); // Scrolling up
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});
