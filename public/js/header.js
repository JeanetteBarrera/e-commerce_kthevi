var menu = document.querySelector('.hamburger_menu');

// method
function toggleMenu (event) {
  this.classList.toggle('is-active');
  document.querySelector( ".menu-hamburger" ).classList.toggle("is_active");
  event.preventDefault();
}

// event
menu.addEventListener('click', toggleMenu, false);