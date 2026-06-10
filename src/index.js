let selectedStyle = "romantic";

function showPoem(response) {
  let poemElement = document.querySelector("#poem");

  poemElement.innerHTML = response.data.answer;
}

function generatePoem(event) {
  event.preventDefault();

  let instructionInput = document.querySelector("#user-instruction");

  let topic = instructionInput.value.trim();

  if (!topic) return;

  let apiKey = "8714aed335fo8d04bt89a4b5c1266e26";

  let prompt = `Write a ${selectedStyle} poem about ${topic}`;

  let context =
  "You are a talented poet. Generate exactly 4 lines of poetry. Separate every line with a <br /> tag. Do not include html tags, code blocks, markdown, quotes, titles, or explanations.";

  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
    prompt,
  )}&context=${encodeURIComponent(context)}&key=${apiKey}`;

  let poemContainer = document.querySelector("#poem-container");
  let poemElement = document.querySelector("#poem");

  poemContainer.classList.remove("hidden");

  poemElement.innerHTML = `
    <div class="generating">
      ✨ Crafting your poem...
    </div>
  `;

  axios
    .get(apiUrl)
    .then(showPoem)
    .catch(() => {
      poemElement.innerHTML = "Something went wrong. Please try again.";
    });
}

// Form Submit
const poemForm = document.querySelector("#poem-generator-form");

poemForm.addEventListener("submit", generatePoem);

// Theme Toggle
const themeToggle = document.querySelector("#theme-toggle");

function setTheme(theme) {
  if (theme === "light") {
    document.body.classList.add("light");
    themeToggle.textContent = "☀️";
  } else {
    document.body.classList.remove("light");
    themeToggle.textContent = "🌙";
  }
}

const savedTheme = localStorage.getItem("theme");

setTheme(savedTheme || "dark");

themeToggle.addEventListener("click", () => {
  const isLight = document.body.classList.contains("light");

  if (isLight) {
    setTheme("dark");
    localStorage.setItem("theme", "dark");
  } else {
    setTheme("light");
    localStorage.setItem("theme", "light");
  }
});

// Style Chips
const styleChips = document.querySelectorAll(".style-chip");

styleChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    styleChips.forEach((c) => c.classList.remove("active"));

    chip.classList.add("active");

    selectedStyle = chip.dataset.style;
  });
});

// Copy Button
const copyBtn = document.querySelector("#copy-btn");

copyBtn.addEventListener("click", () => {
  const poemText = document.querySelector("#poem").innerText;

  if (!poemText.trim()) return;

  navigator.clipboard.writeText(poemText);

  copyBtn.textContent = "✅ Copied!";

  setTimeout(() => {
    copyBtn.textContent = "📋 Copy";
  }, 2000);
});

// Prompt Chips
const chips = document.querySelectorAll(".chip");

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const input = document.querySelector("#user-instruction");

    input.value = chip.textContent.trim();

    input.focus();
  });
});

// Enter Key Support
document
  .querySelector("#user-instruction")
  .addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      poemForm.requestSubmit();
    }
  });
