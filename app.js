// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xcccccc, 0.8);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Exoplanet data
const exoplanetData = {
    
    "51 Pegasi b": { 
        name: "51 Pegasi b", 
        distance: 50, 
        color: 0xffa07a, 
        radius: 1.2, 
        info: `51 Pegasi b, discovered in 1995, is the first confirmed exoplanet orbiting a Sun-like star. This discovery ignited the imagination of astronomers worldwide, showing that planets outside our solar system exist.` 
    },
    "TRAPPIST-1 System": { 
        name: "TRAPPIST-1 System", 
        distance: 39, 
        color: 0x32cd32, 
        radius: 0.9, 
        info: `The TRAPPIST-1 system is a treasure trove of seven rocky planets, some of which reside in the habitable zone. These planets, discovered in 2017, offer exciting possibilities for life beyond Earth.` 
    },
    "Kepler-452b": { 
        name: "Kepler-452b", 
        distance: 1400, 
        color: 0x00bfff, 
        radius: 1.6, 
        info: `Kepler-452b, often called 'Earth’s cousin,' was discovered in 2015. It orbits a star similar to our Sun and may have conditions that could support life. It's a tantalizing glimpse of a potentially habitable world.` 
    },
    "Proxima Centauri b": { 
        name: "Proxima Centauri b", 
        distance: 4.24, 
        color: 0xff6347, 
        radius: 1.1, 
        info: `Proxima Centauri b is the closest known exoplanet to Earth, orbiting the star Proxima Centauri, just over 4 light-years away. Discovered in 2016, it lies in the habitable zone of its star and might have liquid water.` 
    },
    "Gliese 581g": { 
        name: "Gliese 581g", 
        distance: 20.3, 
        color: 0x8a2be2, 
        radius: 1.5, 
        info: `Gliese 581g, discovered in 2010, orbits the red dwarf star Gliese 581. It's located in the habitable zone and is often discussed as a potentially habitable planet.` 
    },
    "HD 209458 b": { 
        name: "HD 209458 b", 
        distance: 159, 
        color: 0xffd700, 
        radius: 1.4, 
        info: `HD 209458 b, also known as Osiris, was one of the first exoplanets found transiting its host star. It's a gas giant, and studies have revealed a faint atmosphere surrounding the planet.` 
    },
    "WASP-12b": { 
        name: "WASP-12b", 
        distance: 870, 
        color: 0x1e90ff, 
        radius: 1.9, 
        info: `WASP-12b is a hot Jupiter orbiting very close to its host star. Discovered in 2008, it's slowly being consumed by the star due to its intense proximity.` 
    },
    "LHS 1140b": { 
        name: "LHS 1140b", 
        distance: 40, 
        color: 0x2f4f4f, 
        radius: 1.3, 
        info: `LHS 1140b is a rocky exoplanet orbiting within the habitable zone of the red dwarf star LHS 1140. It was discovered in 2017 and is a prime candidate for studying planetary atmospheres.` 
    },
    "Kepler-186f": { 
        name: "Kepler-186f", 
        distance: 580, 
        color: 0xff8c00, 
        radius: 1.2, 
        info: `Kepler-186f is an Earth-sized planet discovered in 2014, located in the habitable zone of its host star. It has drawn attention as a potential Earth twin.` 
    },
    "TOI-700d": { 
        name: "TOI-700d", 
        distance: 100, 
        color: 0x4682b4, 
        radius: 1.1, 
        info: `Discovered in 2020, TOI-700d is an Earth-sized planet orbiting in the habitable zone of an M dwarf star, making it a strong candidate for future habitability studies.` 
    },
    "K2-18b": { 
        name: "K2-18b", 
        distance: 124, 
        color: 0x87ceeb, 
        radius: 2.7, 
        info: `K2-18b is a super-Earth discovered in 2015 that orbits within the habitable zone of its red dwarf star. It's known for having water vapor in its atmosphere.` 
    },
    "HD 189733 b": { 
        name: "HD 189733 b", 
        distance: 64.5, 
        color: 0x00ff7f, 
        radius: 1.4, 
        info: `HD 189733 b is a hot Jupiter discovered in 2005. It's known for its deep blue color and extreme weather conditions, including rain made of molten glass.` 
    },
    "GJ 1214 b": { 
        name: "GJ 1214 b", 
        distance: 47, 
        color: 0xa52a2a, 
        radius: 2.7, 
        info: `GJ 1214 b is a super-Earth discovered in 2009. It's a water-world with a thick atmosphere, potentially composed of hydrogen and helium.` 
    },
    "55 Cancri e": { 
        name: "55 Cancri e", 
        distance: 40.7, 
        color: 0xff4500, 
        radius: 2.0, 
        info: `55 Cancri e is a super-Earth discovered in 2004. It orbits very close to its host star, making its surface temperatures extremely high.` 
    },
    "Kepler-22b": { 
        name: "Kepler-22b", 
        distance: 600, 
        color: 0x00fa9a, 
        radius: 2.4, 
        info: `Kepler-22b is a super-Earth discovered in 2011, located in the habitable zone of its star. It is one of the first planets discovered by the Kepler mission.` 
    }
}; 

// Create planets
const planets = [];
Object.keys(exoplanetData).forEach((key) => {
    const { radius, color, distance } = exoplanetData[key];
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color });
    const planet = new THREE.Mesh(geometry, material);
    
    // Centering on X-axis and moving up
    planet.position.set(distance / 5, 5, 0); // Adjust distance factor and height
    planet.userData = { name: key, info: exoplanetData[key].info }; 
    planets.push(planet);
    scene.add(planet);
});

// Create sun
const sunGeometry = new THREE.SphereGeometry(4, 64, 64); // Adjusted size
const sunMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);

// Move the sun upwards
sun.position.set(0, 5, 0); // Adjusted position
scene.add(sun);

// Animation function
function animate() {
    requestAnimationFrame(animate);
    planets.forEach((planet, index) => {
        planet.rotation.y += 0.002; // Slowed down rotation
        planet.position.x = Math.cos(Date.now() * 0.00005 * (index + 1)) * (index + 5); // Adjusted orbit
        planet.position.z = Math.sin(Date.now() * 0.00005 * (index + 1)) * (index + 5);
    });
    renderer.render(scene, camera);
}
animate();

// Camera positioning
camera.position.set(0, 10, 50); // Adjusted for better visibility

// Handle window resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Zoom In/Out functionality
document.getElementById('zoom-in').addEventListener('click', () => {
    camera.position.z -= 5; // Increased zoom speed
});

document.getElementById('zoom-out').addEventListener('click', () => {
    camera.position.z += 5; // Increased zoom speed
});

// Modal functionality
const modal = document.getElementById('exoplanet-info');
const exoplanetName = document.getElementById('exoplanet-name');
const exoplanetDescription = document.getElementById('exoplanet-description');
const closeModalBtn = document.querySelector('.close-btn');

// Adding callback for planets
planets.forEach(planet => {
    planet.callback = function () {
        exoplanetName.innerText = planet.userData.name;
        exoplanetDescription.innerText = planet.userData.info;
        modal.style.display = 'block';
    };
});

// Raycaster for detecting planet clicks
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Handle mouse movement
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planets);
    planets.forEach(planet => {
        planet.material.emissive.set(0x000000); // Reset emissive color
    });
    if (intersects.length > 0) {
        document.body.style.cursor = 'pointer';
        intersects[0].object.material.emissive.set(0xffffff); // Glow effect on hover
    } else {
        document.body.style.cursor = 'auto';
    }
});

// Handle clicks on planets
window.addEventListener('click', () => {
    const intersects = raycaster.intersectObjects(planets);
    if (intersects.length > 0) {
        intersects[0].object.callback();
    }
});

// Close modal functionality
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Exoplanet facts functionality
const facts = [
    "The nearest known exoplanet, Proxima Centauri b, is about 4.24 light-years away.",
    "There are more planets than stars in our Milky Way galaxy.",
    "The largest known exoplanet, HD 100546 b, is about 6.9 times larger than Jupiter.",
    "Some exoplanets are made entirely of diamonds.",
    "The exoplanet WASP-17b is one of the largest known gas giants.",
    "Kepler-186f is the first Earth-sized exoplanet found in the habitable zone of another star.",
];


window.onload = () => {
    const factsContainer = document.querySelector('.facts-container');
    factsContainer.style.right = '20px'; // Start animation
}
let currentIndex = 0;

function changeFact() {
    const factElement = document.getElementById('exoplanet-fact');
    factElement.style.animation = ''; // Reset animation
    factElement.style.opacity = 0; // Fade out

    setTimeout(() => {
        // Update the text content
        factElement.textContent = facts[currentIndex];

        // Alternate animations
        if (currentIndex % 2 === 0) {
            factElement.style.animation = 'slideInLeft 0.5s forwards';
        } else {
            factElement.style.animation = 'slideInRight 0.5s forwards';
        }

        currentIndex = (currentIndex + 1) % facts.length; // Move to the next fact
        factElement.style.opacity = 1; // Fade in
    }, 500); // Wait for half a second before changing the text
}
window.onload = () => {
    const factsContainer = document.querySelector('.facts-container');
    factsContainer.style.right = '20px'; // Start animation
}
setInterval(changeFact, 4000); // Change fact every 3 seconds
changeFact(); // Initial call to set the first fact

