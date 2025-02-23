// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const spans = mobileMenuBtn.querySelectorAll('span');
    spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(7px, -7px)' : '';
});

// Profile menu functionality
const profileBtn = document.querySelector('.profile-btn');
const profileMenu = document.querySelector('.profile-menu');

profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    profileMenu.classList.toggle('active');
});

// Close profile menu when clicking outside
document.addEventListener('click', () => {
    if (profileMenu.classList.contains('active')) {
        profileMenu.classList.remove('active');
    }
});

// Main favorite button functionality
const favoriteBtn = document.getElementById('favorite-btn');
let isFavorite = false;

favoriteBtn.addEventListener('click', () => {
    isFavorite = !isFavorite;
    favoriteBtn.classList.toggle('active');
    favoriteBtn.querySelector('span').textContent = isFavorite ? 'Added to Favorites' : 'Add to Favorites';
});

// Episode data
const episodeData = [
    {
        title: "Stepping Stone",
        season: 1,
        episode: 1,
        description: "The Intelligence Unit investigates a drug-related murder following a shooting at a local block party. As the team digs deeper into the case, they uncover a complex web of drug trafficking that threatens to expose corruption within the department. Voight must navigate carefully to protect his team while bringing the true perpetrators to justice."
    },
    {
        title: "Start Digging",
        season: 3,
        episode: 23,
        description: "Voight's son becomes involved in a murder investigation, testing his loyalty between family and the law. As the evidence mounts against his son, Voight faces an impossible choice between protecting his family and upholding justice. The case forces him to confront his past decisions and their consequences, while the team grapples with their loyalty to their sergeant."
    },
    {
        title: "Reform",
        season: 4,
        episode: 8,
        description: "The team investigates a series of brutal home invasions targeting Chicago's elite. As they work to protect high-profile citizens, they must also deal with increased scrutiny from reform advocates and the media. The case becomes more complex when they discover that the perpetrators may have connections to law enforcement, forcing the unit to examine their own methods and principles."
    },
    {
        title: "Reckoning",
        season: 6,
        episode: 22,
        description: "The team works to solve the murder of a fellow officer while dealing with departmental politics. The investigation reveals deep-rooted corruption within the force, and the team must decide how far they're willing to go to expose the truth. The case puts strain on relationships within the unit as loyalties are tested and personal vendettas threaten to derail the investigation."
    },
    {
        title: "Lines",
        season: 8,
        episode: 16,
        description: "Voight and the team must navigate a delicate situation involving police reform and community relations. When a controversial case threatens to spark civil unrest, the Intelligence Unit must find a way to maintain peace while pursuing justice. The episode explores themes of accountability, trust, and the changing landscape of modern policing."
    }
];

// Modal functionality
const modal = document.getElementById('episode-modal');
const episodeCards = document.querySelectorAll('.episode-card');
const closeModal = document.querySelector('.close-modal');

function openModal(episode) {
    const episodeDetails = episodeData[episode - 1];
    
    modal.querySelector('.modal-title').textContent = episodeDetails.title;
    modal.querySelector('.modal-episode-info').innerHTML = `
        <span class="season">Season ${episodeDetails.season}</span>
        <span class="episode-number">Episode ${episodeDetails.episode}</span>
    `;
    modal.querySelector('.modal-description').textContent = episodeDetails.description;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModalHandler() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Episode favorite functionality
function toggleEpisodeFavorite(event) {
    event.stopPropagation(); // Prevent modal from opening when clicking favorite button
    const button = event.currentTarget;
    const isFavorite = button.classList.toggle('active');
    const starIcon = button.querySelector('.star-icon');
    
    if (isFavorite) {
        starIcon.classList.add('filled');
        button.setAttribute('title', 'Remove from Favorites');
    } else {
        starIcon.classList.remove('filled');
        button.setAttribute('title', 'Add to Favorites');
    }
}

// Add favorite buttons to episode cards
episodeCards.forEach(card => {
    // Add favorite button
    const favoriteBtn = document.createElement('button');
    favoriteBtn.className = 'episode-favorite-btn';
    favoriteBtn.setAttribute('title', 'Add to Favorites');
    favoriteBtn.innerHTML = `
        <svg class="star-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
    `;
    favoriteBtn.addEventListener('click', toggleEpisodeFavorite);
    card.querySelector('h3').after(favoriteBtn);

    // Card click event for modal
    card.addEventListener('click', () => {
        const episodeNumber = card.dataset.episode;
        openModal(episodeNumber);
    });
});

closeModal.addEventListener('click', closeModalHandler);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalHandler();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModalHandler();
    }
});