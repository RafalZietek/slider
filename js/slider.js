// slider v 1.0
// author panjanek

const showSlider = document.querySelector('section.modal-wrap');
const activeImage = document.querySelector('section.modal-wrap .image');
const nextImage = document.querySelector('.next');
const prevImage = document.querySelector('.prev');
const description = document.querySelector('.description');
const imageTitle = document.querySelector('.imageTitle');

const images = [...document.querySelectorAll('.images')];
// wypełnienie galerii
for(let i = 0; i<images.length; i++) {
    images[i].style.backgroundImage = 'url("img/gallery-image-'+(i+1)+'.jpg")';
};

let imageDescription = '';
let pictureIndex = 0;
let nextActiveImage = ''


function showGallery() {	

    //pokazanie slidera
    showSlider.classList.add('showSlider');
    //nadanie klikniętemu obrazkowi klasę active
    this.classList.add('active');
    
    //pobranie indeksu klikniętego obrazka  	
    pictureIndex = images.findIndex(image => image.classList.contains('active'));
    imageDescription = images[pictureIndex].getAttribute('title');
	imageTitle.innerHTML = imageDescription;

    activeImage.innerHTML = `<image src = 'img/gallery-image-${pictureIndex + 1}.jpg'>`;
	
	nextActiveImage = activeImage.firstChild;
	nextActiveImage.classList.add('nextComing');	

    //pokazanie strzałek	    	
    if (pictureIndex == images.length - 1) {
        nextImage.style.display = 'none';
    } else {
        nextImage.style.display = 'block';
    }
    if (pictureIndex == 0) {
        prevImage.style.display = 'none';
    } else {
        prevImage.style.display = 'block';
    }
    description.innerHTML = `Zdjęcie ${pictureIndex + 1} z ${images.length}`
	
	
	// console.log(activeImage.firstChild);
	// return nextActiveImage;
	
}

function next() {
	
	// nextActiveImage.classList.remove('nextComing');
	// nextActiveImage.classList.add('nextOut');
	// console.log(nextActiveImage);
	
	pictureIndex++;
	
    if (pictureIndex >= images.length - 1) {
        nextImage.style.display = 'none';
    }
    activeImage.innerHTML = `<image src = 'img/gallery-image-${pictureIndex + 1}.jpg'>`;	
    prevImage.style.display = 'block';	
    description.innerHTML = `Zdjęcie ${pictureIndex + 1} z ${images.length}`
    imageDescription = images[pictureIndex].getAttribute('title');
    imageTitle.innerHTML = imageDescription;
	
	nextActiveImage = activeImage.firstChild;
	nextActiveImage.classList.remove('prevComing');
	nextActiveImage.classList.add('nextComing');
	// console.log(nextActiveImage);
	
	// return nextActiveImage;
}

function prev() {
		
    pictureIndex--;
	
    if (pictureIndex == 0) {
        prevImage.style.display = 'none';
    }
    activeImage.innerHTML = `<image src = 'img/gallery-image-${pictureIndex + 1}.jpg'>`;
    nextImage.style.display = 'block';
    description.innerHTML = `Zdjęcie ${pictureIndex + 1} z ${images.length}`
    imageDescription = images[pictureIndex].getAttribute('title');
    imageTitle.innerHTML = imageDescription;
	
	nextActiveImage = activeImage.firstChild;
	nextActiveImage.classList.remove('nextComing');
	nextActiveImage.classList.add('prevComing');
	// console.log(nextActiveImage);
	
}

// zamkniecie slider'a
document.querySelector('.hidden').addEventListener('click', function () {
    showSlider.classList.remove('showSlider');
    images.forEach(image => {
        image.classList.remove('active');
    });
    pictureIndex = 0;
});

// nasłuchiwanie na klik
images.forEach(image => {
    image.addEventListener('click', showGallery);
});
nextImage.addEventListener('click', next);
prevImage.addEventListener('click', prev);