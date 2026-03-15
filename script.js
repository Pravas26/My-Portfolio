// ===================================
// PARTICLE BACKGROUND ANIMATION
// ===================================
class ParticleNetwork {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 100;
        this.maxDistance = 150;
        this.mouse = { x: null, y: null, radius: 150 };
        
        this.init();
        this.animate();
        this.setupEventListeners();
    }
    
    init() {
        this.resize();
        this.createParticles();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(0, 217, 255, 0.6)';
            this.ctx.fill();
        });
    }
    
    drawLines() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.maxDistance) {
                    const opacity = (1 - distance / this.maxDistance) * 0.3;
                    this.ctx.strokeStyle = `rgba(0, 217, 255, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Mouse interaction
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouse.radius) {
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    particle.vx -= (dx / distance) * force * 0.2;
                    particle.vy -= (dy / distance) * force * 0.2;
                }
            }
            
            // Boundary check
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Speed limit
            const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
            if (speed > 2) {
                particle.vx = (particle.vx / speed) * 2;
                particle.vy = (particle.vy / speed) * 2;
            }
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.updateParticles();
        this.drawLines();
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });
        
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        window.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }
}

// ===================================
// NEURAL NETWORK CANVAS
// ===================================
class NeuralNetwork {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        
        this.init();
        this.animate();
    }
    
    init() {
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.createNetwork();
    }
    
    createNetwork() {
        const layers = [4, 6, 6, 4];
        const spacing = 100;
        const startX = 50;
        
        layers.forEach((nodeCount, layerIndex) => {
            const layerY = (this.canvas.height - (nodeCount - 1) * spacing) / 2;
            for (let i = 0; i < nodeCount; i++) {
                this.nodes.push({
                    x: startX + layerIndex * 120,
                    y: layerY + i * spacing,
                    layer: layerIndex,
                    activation: Math.random()
                });
            }
        });
        
        // Create connections
        this.nodes.forEach((node, i) => {
            this.nodes.forEach((targetNode, j) => {
                if (targetNode.layer === node.layer + 1) {
                    this.connections.push({
                        from: i,
                        to: j,
                        weight: Math.random()
                    });
                }
            });
        });
    }
    
    drawConnections() {
        this.connections.forEach(conn => {
            const from = this.nodes[conn.from];
            const to = this.nodes[conn.to];
            
            const opacity = from.activation * to.activation * conn.weight * 0.5;
            this.ctx.strokeStyle = `rgba(0, 217, 255, ${opacity})`;
            this.ctx.lineWidth = 1.5;
            this.ctx.beginPath();
            this.ctx.moveTo(from.x, from.y);
            this.ctx.lineTo(to.x, to.y);
            this.ctx.stroke();
        });
    }
    
    drawNodes() {
        this.nodes.forEach(node => {
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
            
            const gradient = this.ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 8);
            gradient.addColorStop(0, `rgba(0, 217, 255, ${node.activation})`);
            gradient.addColorStop(1, `rgba(0, 217, 255, 0.2)`);
            
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            
            this.ctx.strokeStyle = `rgba(0, 217, 255, ${node.activation})`;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        });
    }
    
    updateActivations() {
        this.nodes.forEach(node => {
            node.activation = Math.abs(Math.sin(Date.now() * 0.001 + node.x + node.y));
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.updateActivations();
        this.drawConnections();
        this.drawNodes();
        requestAnimationFrame(() => this.animate());
    }
}

// ===================================
// NAVIGATION
// ===================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu if open
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Animate metrics
            if (entry.target.classList.contains('metric-item')) {
                const valueElement = entry.target.querySelector('.metric-value');
                const target = parseInt(valueElement.getAttribute('data-target'));
                animateCounter(valueElement, target);
            }
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .skill-category, .project-card, .repo-card, .metric-item').forEach(el => {
    observer.observe(el);
});

// ===================================
// COUNTER ANIMATION
// ===================================
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target === 95 ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target === 95 ? '%' : '+');
        }
    }, 30);
}

// ===================================
// 3D CARD TILT EFFECT
// ===================================
const tiltCards = document.querySelectorAll('[data-tilt]');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// ===================================
// GITHUB API INTEGRATION
// ===================================
const githubUsername = '{{GITHUB_USERNAME}}';
const reposContainer = document.getElementById('github-repos');
const filterButtons = document.querySelectorAll('.filter-btn');

let allRepos = [];

async function fetchGitHubRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=12`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }
        
        const repos = await response.json();
        allRepos = repos;
        displayRepos(repos);
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        reposContainer.innerHTML = `
            <div class="loading-repos">
                <p style="color: var(--color-text-muted);">
                    Unable to load repositories. Please check the username in the code.
                </p>
            </div>
        `;
    }
}

function displayRepos(repos) {
    if (repos.length === 0) {
        reposContainer.innerHTML = `
            <div class="loading-repos">
                <p style="color: var(--color-text-muted);">No repositories found.</p>
            </div>
        `;
        return;
    }
    
    reposContainer.innerHTML = repos.map(repo => `
        <div class="repo-card" data-language="${repo.language || 'Other'}">
            <h3 class="repo-name">
                <svg viewBox="0 0 16 16" fill="currentColor">
                    <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
                </svg>
                ${repo.name}
            </h3>
            <p class="repo-description">${repo.description || 'No description available'}</p>
            <div class="repo-stats">
                <div class="repo-stat">
                    <svg viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"/>
                    </svg>
                    ${repo.stargazers_count}
                </div>
                ${repo.language ? `
                    <div class="repo-stat">
                        <span class="language-dot" style="background: ${getLanguageColor(repo.language)}"></span>
                        ${repo.language}
                    </div>
                ` : ''}
            </div>
            <a href="${repo.html_url}" target="_blank" class="repo-link">
                View Repository
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor">
                    <path d="M3.75 3.75v8.5h8.5M12.25 12.25L3.75 3.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </a>
        </div>
    `).join('');
    
    // Re-observe new cards
    document.querySelectorAll('.repo-card').forEach(card => {
        observer.observe(card);
    });
}

function getLanguageColor(language) {
    const colors = {
        'JavaScript': '#f1e05a',
        'Python': '#3572A5',
        'Java': '#b07219',
        'TypeScript': '#2b7489',
        'C++': '#f34b7d',
        'C': '#555555',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'Ruby': '#701516',
        'Go': '#00ADD8',
        'Rust': '#dea584',
        'PHP': '#4F5D95',
        'Swift': '#ffac45',
        'Kotlin': '#F18E33',
        'Jupyter Notebook': '#DA5B0B'
    };
    return colors[language] || '#00d9ff';
}

// Filter functionality
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        if (filter === 'all') {
            displayRepos(allRepos);
        } else {
            const filteredRepos = allRepos.filter(repo => repo.language === filter);
            displayRepos(filteredRepos);
        }
    });
});

// ===================================
// INITIALIZE ON PAGE LOAD
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle background
    const particleCanvas = document.getElementById('particle-canvas');
    if (particleCanvas) {
        new ParticleNetwork(particleCanvas);
    }
    
    // Initialize neural network
    const neuralCanvas = document.getElementById('neural-canvas');
    if (neuralCanvas) {
        new NeuralNetwork(neuralCanvas);
    }
    
    // Fetch GitHub repos
    fetchGitHubRepos();
    
    // Add scroll reveal to hero elements
    const heroElements = document.querySelectorAll('.hero-label, .hero-title, .hero-subtitle, .hero-description, .hero-buttons');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });
});

// ===================================
// SMOOTH SCROLL TO TOP
// ===================================
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ===================================
// PREVENT FLASH OF UNSTYLED CONTENT
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});
