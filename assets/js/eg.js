function openGallery(id) {
    closeAll();
    const gallery = document.getElementById('gallery-' + id);
    const eventHide = document.getElementById('event-show');
    gallery.classList.add('Gallery--active');
    eventHide.style.display = "none";
  }
   
  function closeAll() {
    const galleryActv = document.querySelector('.Gallery--active');
    if (galleryActv) {
      galleryActv.classList.remove('Gallery--active');
    }
    const eventShow = document.getElementById('event-show');

    eventShow.style.display = "block";
    
  }