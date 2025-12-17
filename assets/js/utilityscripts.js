// Images Lazy Loading (skip gallery images)
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img:not([data-gallery-img])");

  images.forEach(img => {
    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy");
    }
  });
});


document.addEventListener("DOMContentLoaded", function () {

  function initMasonry(gallerySelector) {
    const gallery = document.querySelector(gallerySelector);
    if (!gallery) return;

    const items = Array.from(gallery.querySelectorAll('.col-md-6'));

    // Ensure images load before layout
    const images = gallery.querySelectorAll('img');
    let loadedCount = 0;

    images.forEach(img => {
      if (img.complete) {
        loadedCount++;
        if (loadedCount === images.length) layout();
      } else {
        img.addEventListener('load', () => {
          loadedCount++;
          if (loadedCount === images.length) layout();
        });
      }
    });

    function layout() {
      // Reset inline styles
      items.forEach(item => {
        item.style.position = '';
        item.style.top = '';
        item.style.left = '';
      });

      const columnCount = window.innerWidth >= 768 ? 2 : 1; // Bootstrap md breakpoint
      const columnHeights = new Array(columnCount).fill(0);
      const columnWidth = gallery.clientWidth / columnCount;

      items.forEach((item, index) => {
        const col = columnHeights.indexOf(Math.min(...columnHeights));

        item.style.position = 'absolute';
        item.style.width = columnWidth + 'px';
        item.style.left = (col * columnWidth) + 'px';
        item.style.top = columnHeights[col] + 'px';

        columnHeights[col] += item.offsetHeight;
      });

      // Set container height
      gallery.style.position = 'relative';
      gallery.style.height = Math.max(...columnHeights) + 'px';
    }

    // Re-layout on resize
    window.addEventListener('resize', () => {
      layout();
    });
  }

  // ✅ Initialize for ALL galleries on the page
  document.querySelectorAll('section[id$="-gallery"] .row').forEach(row => {
    initMasonry('#' + row.closest('section').id + ' .row');
  });

});