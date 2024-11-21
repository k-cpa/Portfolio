// GESTION DU HEADER

////// Evenement scroll pour afficher le header en dehors de home

const header = document.querySelector('header');
const homeSection = document.getElementById('home');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

function showNavbarScroll () {
    if (window.scrollY > 0) {
        header.classList.add('visible');
    } else {
        header.classList.remove('visible');
    }
}

////// Gestion visuel du link navbar au scroll 

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

    // Mise à jour CSS du navbar a en fonction d'où on est sur le site
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add ('active');
        }
    })
}
// Ecoute even scroll
window.addEventListener('scroll', () => {
    showNavbarScroll();
    updateActiveLink();
});

// GESTION BURGER MENU AU RESPONSIVE
const burgerIcon = document.querySelector('.burger_icon');
const menu = document.querySelector('.navbar ul');


    burgerIcon.addEventListener('click', () => {
        menu.classList.toggle('active');
    });





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



///// Gestion des cards project 
const cardProjects = document.querySelectorAll('.card_project');

cardProjects.forEach(card => {    
    const xmark = card.querySelector('.fa-xmark');

    card.addEventListener('click', function(event) {
        cardProjects.forEach(card => {
            card.classList.remove('cardActive');
            card.classList.remove('disableHover');

        });
        event.stopPropagation();
        card.classList.add ('cardActive')
        document.body.style.overflow = 'hidden';

        setTimeout(function () {
            card.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 100);
        

        cardProjects.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.classList.add('disableHover');
            }
        });
    });

    xmark.addEventListener('click', function (event) { 
        card.classList.remove('cardActive');
        document.body.style.overflow = 'auto';

        cardProjects.forEach(otherCard => {
            if (otherCard !== card && card.classList !== 'disableHover') {
            otherCard.classList.remove('disableHover');
            }
        });
        event.stopPropagation();
    });
});



document.addEventListener('click', function() {
    cardProjects.forEach(card => {
      card.classList.remove('cardActive');
      card.classList.remove('disableHover');
      card.scrollTop = 0;  
    });
    document.body.style.overflow = 'auto';
});




/////////////////////////////////////////////////////////

//  ANIMATION STORY

// Pause de l'animation du slider au hover de chaque content cards
const contentCards = document.querySelectorAll('.content');
const educSlider = document.querySelector('.educ_slider');
const workSlider = document.querySelector('.work_slider');

contentCards.forEach(content => {
    content.addEventListener('mouseenter', () => {
        educSlider.style.animationPlayState = 'paused';
        workSlider.style.animationPlayState = 'paused';
    })

    content.addEventListener('mouseleave', () => {
        educSlider.style.animationPlayState = 'running';
        workSlider.style.animationPlayState = 'running';
    })
})
    
/////////////////////////////////////////////////////////

