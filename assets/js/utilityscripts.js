const filterButtons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.filter-item');

  filterButtons.forEach(button => {
  button.addEventListener('click', e => {
    e.preventDefault();
    const filter = button.getAttribute('data-filter');

    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    items.forEach(item => {
      const category = item.getAttribute('data-category');
      item.style.display = (filter === 'All' || category === filter) ? 'block' : 'none';
    });
  });
});
