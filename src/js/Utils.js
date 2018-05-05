var file = document.querySelector("input[type=file]");

file.addEventListener('change', () => {
  if (file.files.length > 0) {
    file.nextElementSibling.nextElementSibling.innerHTML = file.files[0].name
  }
})
