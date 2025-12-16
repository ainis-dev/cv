# Personal CV Website

## Running Locally

To view the website locally, you have several options:

### Option 1: Python HTTP Server (Recommended)
If you have Python installed:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Then open `http://localhost:8000` in your browser.

### Option 2: Node.js http-server
If you have Node.js installed:
```bash
npx http-server -p 8000
```
Then open `http://localhost:8000` in your browser.

### Option 3: VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 4: Direct File Opening
Simply open `index.html` in your browser, though some features may not work perfectly due to CORS restrictions with local files.

## URL Structure
The website uses clean URLs without `.html` extensions:
- `/` - Home page
- `/experience/` - Experience and Education
- `/projects/` - Blog and System Architecture
- `/contact/` - Contact information

## Deployment

# Personal CV Website

A modern, responsive CV website built with vanilla HTML/CSS/JavaScript, featuring:

- **Tailwind CSS** for modern, utility-first styling
- **Three.js** particle system background
- **Mermaid.js** for backend system architecture diagrams
- **Dark mode** support with smooth transitions
- **Responsive design** for all devices
- **PDF export** functionality
- **Smooth animations** and scroll effects

## Features

### Pages
- **Home**: Landing page with about section
- **Experience**: Work experience timeline
- **Education**: Educational background
- **Skills**: Technical skills and technologies
- **Projects**: Portfolio with expandable system architecture diagrams
- **Contact**: Contact form and LinkedIn integration

### Key Features
- Dark/Light mode toggle with localStorage persistence
- Three.js animated particle background
- Interactive Mermaid.js diagrams for backend architecture visualization
- Smooth scroll animations using Intersection Observer
- Responsive design for mobile, tablet, and desktop
- LinkedIn integration in footer and contact page

## Project Structure

```
cv/
├── index.html          # Home page
├── experience/
│   └── index.html      # Work experience & education (timeline)
├── projects/
│   └── index.html      # Blog & system architecture with diagrams
├── contact/
│   └── index.html      # Contact page
├── css/
│   ├── main.css        # Main styles
│   └── animations.css  # Animation styles
├── js/
│   ├── main.js         # Navigation and utilities
│   ├── diagrams.js     # Mermaid.js diagram rendering
│   └── animations.js   # Scroll animations and interactions
├── data/
│   └── projects.json   # Project data with diagram definitions
└── README.md           # This file
```

## Setup

1. Clone or download this repository
2. Open `index.html` in a web browser
3. No build process required - all files are static

## Customization

### Update Personal Information
- Edit the HTML files to update your personal information
- Update LinkedIn URL in all pages (search for `yourprofile` and replace)
- Modify experience, education, and skills sections

### Add Projects
Edit `data/projects.json` to add or modify projects:

```json
{
  "projects": [
    {
      "title": "Project Name",
      "description": "Project description",
      "technologies": ["Tech1", "Tech2"],
      "diagram": {
        "type": "graph|flowchart|sequenceDiagram",
        "definition": "Mermaid diagram syntax"
      },
      "details": "Additional details"
    }
  ]
}
```

### Mermaid Diagram Types
- **graph**: Component diagrams, system topology
- **flowchart**: Request flows, data flows
- **sequenceDiagram**: Inter-service communication

Learn more about Mermaid syntax: https://mermaid.js.org/

## Deployment to GitHub Pages

### Method 1: Direct Deployment
1. Push all files to a GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main` or `master`)
4. Select `/ (root)` as the folder
5. Click Save

### Method 2: Using gh-pages Branch
1. Create a `gh-pages` branch
2. Push all files to the `gh-pages` branch
3. GitHub Pages will automatically serve from this branch

### Method 3: Using GitHub Actions (Optional)
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom styles and animations
- **JavaScript (ES6+)**: Vanilla JavaScript, no frameworks
- **Tailwind CSS**: Utility-first CSS framework (via CDN)
- **Three.js**: 3D graphics library for particle system
- **Mermaid.js**: Diagram and flowchart rendering
- **html2pdf.js**: PDF export functionality (optional)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for personal use.

## Notes

- The LinkedIn URL needs to be updated in all HTML files
- Replace placeholder content with your actual information
- The PDF export feature requires html2pdf.js library (can be added via CDN)
- All external libraries are loaded via CDN for simplicity

## Contributing

Feel free to fork this project and customize it for your own CV website!

