// GESTION DU HEADER

////// Evenement scroll pour afficher le header en dehors de home

const header = document.querySelector('header');
const homeSection = document.getElementById('home');

window.addEventListener('scroll', () => {
    const homeBottom = homeSection.getBoundingClientRect().bottom;
    
    if (homeBottom <= 0) {
        header.classList.add('visible');
    } else {
        header.classList.remove('visible');
    }
})

////// Gestion visuel du link navbar au scroll 

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

// MàJ link active
function updateActiveLink() {
    let currentSectionId = "";

    // Parcours les sections et trouve celle visible
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            currentSectionId = section.getAttribute('id');
        }
    });

    // Mise à jour  classe du link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add ('active');
        }
    })
}
// Ecoute even scroll
window.addEventListener('scroll', updateActiveLink);

const cardProjects = document.querySelectorAll('.card_project');

cardProjects.forEach(card => {
    card.addEventListener('click', function(event) {
        cardProjects.forEach(card => {
            card.classList.remove('cardActive');
            card.classList.remove('disableHover');
        });
        event.stopPropagation();
        card.classList.add ('cardActive')
    });
});

document.addEventListener('click', function() {
    cardProjects.forEach(card => {
      card.classList.remove('cardActive');
      card.scrollTop = 0;  
    })
})
////////////////////////////////////////////////////////////////


// GESTION WAVES BACKGROUND HOME

document.addEventListener('DOMContentLoaded', function() {
    const wavesGroup = document.getElementById('wavesGroup');
    const waves = [...wavesGroup.querySelectorAll('path')];
    const speed = 0.01;
    const amplitudeRange = [5, 15];
    const frequencyRange = [1, 3];

    
    let amplitudes = waves.map(() => Math.random() * (amplitudeRange[1] - amplitudeRange[0]) + amplitudeRange[0]);
    let frequencies = waves.map(() => Math.random() * (frequencyRange[1] - frequencyRange[0]) + frequencyRange[0]);
    let initialPaths = waves.map(wave => wave.getAttribute('d'));
    let time = 0;

    function animate() {
        time += speed;

        waves.forEach((wave, index) => {
            let amplitude = amplitudes[index];
            let frequency = frequencies[index];
            let initialPath = initialPaths[index];

            let modifiedPath = initialPath.replace(/Q[\s]*([\d.]+),([\d.]+)/g, (match, x, y) => {
                let newY = parseFloat(y) + Math.sin(time * frequency) * amplitude;
                return `Q${x},${newY}`;
        });
        wave.setAttribute('d', modifiedPath);
    });
        requestAnimationFrame(animate);
    }
    animate();
});

/////////////////////////////////////////////////////////



// GESTION MOUVEMENT "GUM" CONTAINER HOME 

const cards = document.querySelectorAll('.card3D');

cards.forEach(card => {
    let boundingRef = null;

    // Entrée de la souris
    card.addEventListener('mouseenter', function (ev) {
        boundingRef = ev.currentTarget.getBoundingClientRect();
    });

    // Sortie de la souris
    card.addEventListener('mouseleave', function () {
        boundingRef = null;
        card.style.transform = 'scale(1)';
    });

    // Mouvement de la souris 
    card.addEventListener('mousemove', function (ev) {
        if (boundingRef) {
            const x = ev.clientX - boundingRef.left;
            const y = ev.clientY - boundingRef.top;
            const xPercentage = x / boundingRef.width;
            const yPercentage = y / boundingRef.height;
            
            
            //  déformation en fonction de la position de la souris
            const scaleX = 1 + (xPercentage - 0.5) * 0.1; 
            const scaleY = 1 + (yPercentage - 0.5) * 0.1; 
            ev.currentTarget.style.transform = `scale(${scaleX}, ${scaleY}) `;
        }
    });
});

/////////////////////////////////////////////////////////

// Click sur card projects



/////////////////////////////////////////////////////////



// document.addEventListener('DOMContentLoaded', () => {
//     const carouselTrack = document.querySelector('.logo_wrapper');
//     const images = Array.from(carouselTrack.querySelectorAll('.techImg'));

//     let offset = 0;
//     const imageWidth = images[0].getBoundingClientRect().width + 500; // Largeur + espacement
//     const totalWidth = imageWidth * images.length; // Largeur totale de toutes les images

//     function scrollCarousel() {
//         offset -= 2; // Ajustez la vitesse (en pixels)
//         if (Math.abs(offset) >= totalWidth) {
//             offset = 0; // Réinitialise la position
//         }
//         carouselTrack.style.transform = `translateX(${offset}px)`;
//         requestAnimationFrame(scrollCarousel);
//     }

//     // Dupliquez les images pour une boucle infinie fluide
//     function duplicateImages() {
//         const clonedImages = images.map(img => img.cloneNode(true));
//         clonedImages.forEach(clone => carouselTrack.appendChild(clone));
//     }

//     duplicateImages();
//     scrollCarousel();
// });

