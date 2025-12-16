// Mermaid.js Diagram Rendering and Interaction
(function() {
    let mermaidInitialized = false;

    // Initialize Mermaid
    function initMermaid() {
        if (typeof mermaid === 'undefined') {
            console.warn('Mermaid.js not loaded');
            return;
        }

        if (mermaidInitialized) return;

        mermaid.initialize({
            startOnLoad: false,
            theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
            securityLevel: 'loose',
            flowchart: {
                useMaxWidth: true,
                htmlLabels: true
            }
        });

        mermaidInitialized = true;
    }

    // Load projects from JSON
    async function loadProjects() {
        try {
            // Determine the correct path based on current location
            const isInSubdirectory = window.location.pathname.split('/').filter(p => p).length > 1;
            const jsonPath = isInSubdirectory ? '../data/projects.json' : 'data/projects.json';
            const response = await fetch(jsonPath);
            if (!response.ok) throw new Error('Failed to load projects');
            const data = await response.json();
            return data.projects || [];
        } catch (error) {
            console.error('Error loading projects:', error);
            return [];
        }
    }

    // Render project cards
    async function renderProjects() {
        const container = document.getElementById('projects-container');
        if (!container) return;

        initMermaid();
        const projects = await loadProjects();

        if (projects.length === 0) {
            container.innerHTML = '<p class="text-center text-gray-500">No projects available.</p>';
            return;
        }

        container.innerHTML = projects.map((project, index) => {
            const diagramId = `diagram-${index}`;
            return `
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 fade-in stagger-item">
                    <div class="flex flex-col md:flex-row justify-between items-start mb-4">
                        <div class="flex-1">
                            <h3 class="text-2xl font-bold mb-2">${project.title}</h3>
                            <p class="text-gray-600 dark:text-gray-400 mb-4">${project.description}</p>
                            ${project.details ? `<p class="text-gray-700 dark:text-gray-300 mb-4">${project.details}</p>` : ''}
                            <div class="flex flex-wrap gap-2 mb-4">
                                ${project.technologies.map(tech => 
                                    `<span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">${tech}</span>`
                                ).join('')}
                            </div>
                        </div>
                    </div>
                    ${project.diagram ? `
                        <button onclick="toggleDiagram(${index})" 
                                class="btn-primary mb-4" 
                                id="toggle-btn-${index}">
                            View Architecture
                        </button>
                        <div id="diagram-container-${index}" class="project-details">
                            <div class="diagram-container">
                                <div class="mermaid" id="${diagramId}">
                                    ${project.diagram.definition}
                                </div>
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');

        // Make toggleDiagram available globally
        window.toggleDiagram = function(index) {
            const container = document.getElementById(`diagram-container-${index}`);
            const button = document.getElementById(`toggle-btn-${index}`);
            const diagramId = `diagram-${index}`;
            const diagramElement = document.getElementById(diagramId);

            if (!container || !button) return;

            const isExpanded = container.classList.contains('expanded');
            
            if (isExpanded) {
                container.classList.remove('expanded');
                button.textContent = 'View Architecture';
            } else {
                container.classList.add('expanded');
                button.textContent = 'Hide Architecture';
                
                // Render diagram if not already rendered
                if (diagramElement && !diagramElement.hasAttribute('data-rendered')) {
                    renderDiagram(diagramId, diagramElement.textContent.trim());
                }
            }
        };

        // Trigger fade-in animations
        setTimeout(() => {
            document.querySelectorAll('.stagger-item').forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 100);
            });
        }, 100);
    }

    // Render individual diagram
    function renderDiagram(id, definition) {
        const element = document.getElementById(id);
        if (!element || !mermaidInitialized) return;

        element.setAttribute('data-rendered', 'true');
        
        mermaid.render(id + '-svg', definition, (svgCode) => {
            element.innerHTML = svgCode;
        });
    }

    // Update Mermaid theme on dark mode change
    function updateMermaidTheme() {
        if (!mermaidInitialized) return;
        
        const isDark = document.documentElement.classList.contains('dark');
        mermaid.initialize({
            startOnLoad: false,
            theme: isDark ? 'dark' : 'default',
            securityLevel: 'loose',
            flowchart: {
                useMaxWidth: true,
                htmlLabels: true
            }
        });

        // Re-render all visible diagrams
        document.querySelectorAll('.mermaid[data-rendered]').forEach(el => {
            const definition = el.getAttribute('data-definition') || el.textContent.trim();
            if (definition) {
                const id = el.id;
                mermaid.render(id + '-svg', definition, (svgCode) => {
                    el.innerHTML = svgCode;
                });
            }
        });
    }

    // Watch for theme changes
    const observer = new MutationObserver(() => {
        updateMermaidTheme();
    });
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    });

    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderProjects);
    } else {
        renderProjects();
    }
})();

