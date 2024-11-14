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
    requestAnimationFrame(animate);
});


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

// PROJECT 

const header = document.querySelector('header');
const homeSection = document.getElementById('home');

if (header && homeSection) {
// Evenement scroll pour afficher le header en dehors de home
window.addEventListener('scroll', () => {
    const homeBottom = homeSection.getBoundingClientRect().bottom;
    console.log('Position du bas de la section home :', homeBottom); // Vérifier la position


    if (homeBottom <= 0) {
        header.classList.add('visible');
        console.log('visible');
    } else {
        header.classList.remove('visible');
        console.log('pas visible');
    }
})
} else {
    console.error('ploplop');
}

