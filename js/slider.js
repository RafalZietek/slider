// slider v 2.0
// author panjanek

const showSlider = document.querySelector('section.modal-wrap');
const activeImage = document.querySelector('section.modal-wrap .image');
const imageNext = document.querySelector('section.modal-wrap .imageNext');
const imageDescription = document.querySelector('.description');
const imageTitle = document.querySelector('.imageTitle');
const nextArrow = document.querySelector('.next');
const prevArrow = document.querySelector('.prev');

const currentPicture = document.querySelector('.currentPicture');
const nextPicture = document.querySelector('.nextPicture');

//pobranie wszystkich div'ów o klasie images
const imagesDiv = [...document.querySelectorAll('.images')];
//stworzenie tablicy z obrazami
const images = [];
// wypełnienie galerii obrazami i stworzenie tablicy z obrazkami
for(let i = 0; i < imagesDiv.length; i++) {
    imagesDiv[i].style.backgroundImage = 'url("img/gallery-image-'+(i+1)+'.jpg")';
	images[i] = `img/gallery-image-${i + 1}.jpg`; ;
};

let pictureIndex = 0;

function showGallery() {	

// const activeImage = document.querySelector('section.modal-wrap .image');
// console.log(activeImage);
    //pokazanie slidera
    showSlider.classList.add('showSlider');
    //nadanie klikniętemu obrazkowi klasę active
    this.classList.add('active'); 
    //pobranie indeksu klikniętego obrazka  	
    pictureIndex = imagesDiv.findIndex(image => image.classList.contains('active'));
	 
    
	showPicture();		

    //pokazanie strzałek	    	
    if (pictureIndex == images.length - 1) {
        nextArrow.style.display = 'none';
    } else {
        nextArrow.style.display = 'block';
    }
    if (pictureIndex == 0) {
        prevArrow.style.display = 'none';
    } else {
        prevArrow.style.display = 'block';
    }	    
	
	currentPicture.classList.add('nextComing');	
}
function change (param) {
	
	if(param.classList.contains('next')) {
		nextPicture.src =  images[pictureIndex-1];
	} else if(param.classList.contains('prev')) {
		nextPicture.src = images[pictureIndex+1];		
	}		
}

 function next() {
	pictureIndex++;	
	imageNext.style.display = 'block';
	setTimeout(() => {
		imageNext.style.display = 'none';
	}, 300);
	
	
    if (pictureIndex >= images.length - 1) {
        nextArrow.style.display = 'none';
    }
	
	prevArrow.style.display = 'block';	
	change (this);
	addClassNext();
	
	showPicture();	
	
 }

function prev() {
	pictureIndex--;
	
	imageNext.style.display = 'block';
	setTimeout(() => {
		imageNext.style.display = 'none';
	}, 300);
	
	if (pictureIndex == 0) {
        prevArrow.style.display = 'none';
    }	
	nextArrow.style.display = 'block';	
	change (this);
	addClassPrev();	
	
	showPicture();	
}
function addClassNext() {
	currentPicture.classList.remove('nextComing', 'nextOut', 'prevComing', 'prevOut');
	nextPicture.classList.remove('nextComing','nextOut', 'prevComing', 'prevOut');
	//animacja nie uruchomi się jeszcze raz gdy usuniemy clasę i dodamy następną
	// na tym samym elemencie. Trzeba zastosować triki
	void currentPicture.offsetWidth;
	void nextPicture.offsetWidth;
	
	currentPicture.classList.add('nextComing');	
	nextPicture.classList.add('nextOut');
}
function addClassPrev() {
	nextPicture.classList.remove('nextComing','nextOut', 'prevComing', 'prevOut');
	currentPicture.classList.remove('nextComing', 'nextOut', 'prevComing', 'prevOut');
	void currentPicture.offsetWidth;
	void nextPicture.offsetWidth;
	currentPicture.classList.add('prevComing');	
	nextPicture.classList.add('prevOut');
}

function showPicture() {
	if(pictureIndex == 0) {
		nextPicture.src =  images[pictureIndex+1];  	 
		currentPicture.src =  images[pictureIndex];  	 
		imageDescription.innerHTML = `Zdjęcie ${pictureIndex + 1} z ${images.length}`
		imageTitle.innerHTML = imagesDiv[pictureIndex].getAttribute('title');	
	} else if(pictureIndex == images.length-1){
		nextPicture.src = images[pictureIndex - 1]; 
		currentPicture.src =  images[pictureIndex];  	 
		imageDescription.innerHTML = `Zdjęcie ${pictureIndex + 1} z ${images.length}`
		imageTitle.innerHTML = imagesDiv[pictureIndex].getAttribute('title');
	}
	else {		
		currentPicture.src =  images[pictureIndex];  	 
		imageDescription.innerHTML = `Zdjęcie ${pictureIndex + 1} z ${images.length}`
		imageTitle.innerHTML = imagesDiv[pictureIndex].getAttribute('title');
		// imageNext.style.display = 'none';
	}	
}


// zamkniecie slider'a
document.querySelector('.hidden').addEventListener('click', function () {
    showSlider.classList.remove('showSlider');
	currentPicture.src =  '';
	currentPicture.classList.remove('nextComing','nextOut', 'prevComing', 'prevOut');
	
	nextPicture.src =  '';
	nextPicture.classList.remove('nextComing','nextOut', 'prevComing', 'prevOut');
	
    imagesDiv.forEach(imageDiv => {
        imageDiv.classList.remove('active');
    });
    pictureIndex = 0;
});

// nasłuchiwanie na klik
imagesDiv.forEach(image => {
    image.addEventListener('click', showGallery);
});
nextArrow.addEventListener('click', next);
prevArrow.addEventListener('click', prev);