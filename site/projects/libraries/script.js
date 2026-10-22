// "Copy" buttons on the code blocks. Each button names the <code> element it copies
// in data-copy. If the clipboard is not available (old browser, no HTTPS), the button
// just says so instead of failing silently.
for (const button of document.querySelectorAll("button.copy")) {
  button.addEventListener("click", async () => {
    const code = document.getElementById(button.dataset.copy);
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code.textContent);
      button.textContent = "Copied";
    } catch {
      button.textContent = "Select it";
    }
    setTimeout(() => {
      button.textContent = "Copy";
    }, 1600);
  });
}
