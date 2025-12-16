# Personal CV Website

A modern, responsive CV website built with vanilla HTML/CSS/JavaScript, featuring expandable experience sections, interactive system architecture diagrams, and smooth animations.

## Features

### Pages
- **Home**: Landing page with introduction and navigation
- **Experience**: Work experience and education timeline with expandable details
- **Projects**: Blog showcasing backend system architecture with interactive Mermaid.js diagrams
- **Contact**: Contact information with LinkedIn and email links

### Key Features
- **Expandable Experience Cards**: Progressive disclosure design for displaying detailed work experience information
- **Interactive Architecture Diagrams**: Mermaid.js diagrams for visualizing backend system designs
- **Smooth Animations**: Scroll-triggered animations using Intersection Observer
- **Responsive Design**: Mobile-first design that works on all devices
- **Clean URL Structure**: Directory-based routing without `.html` extensions
- **SEO Optimized**: Meta tags, Open Graph, and structured data for better search visibility

## Project Structure

```
cv/
├── index.html          # Home page
├── experience/
│   └── index.html      # Work experience & education (timeline with expandable cards)
├── projects/
│   └── index.html      # Blog & system architecture with diagrams
├── contact/
│   └── index.html      # Contact page
├── css/
│   ├── main.css        # Main styles and layout
│   └── animations.css  # Animation styles and transitions
├── js/
│   ├── main.js         # Navigation and utilities
│   ├── diagrams.js     # Mermaid.js diagram rendering
│   └── animations.js   # Scroll animations and expandable card interactions
├── data/
│   └── projects.json   # Project data with diagram definitions
└── README.md           # This file
```

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

## Customization

### Update Personal Information
- Edit the HTML files to update your personal information
- Update LinkedIn URL in all pages (search for `yourprofile` and replace)
- Update email addresses (search for `your.email@example.com` and replace)
- Modify experience, education, and project sections

### Add Work Experience
Edit `experience/index.html` to add or modify work experience entries. Each entry supports:
- Summary information (always visible)
- Expandable sections for:
  - Key Responsibilities
  - Major Achievements
  - Technologies & Tools
  - Key Projects

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

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom styles and animations
- **JavaScript (ES6+)**: Vanilla JavaScript, no frameworks
- **Tailwind CSS**: Utility-first CSS framework (via CDN)
- **Mermaid.js**: Diagram and flowchart rendering
- **Google Fonts**: Caveat font for handwritten logo

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment to GitHub Pages

### How Routing Works on GitHub Pages

GitHub Pages automatically serves `index.html` files from directories, which means:
- `/` → serves `index.html`
- `/experience/` → serves `experience/index.html`
- `/projects/` → serves `projects/index.html`
- `/contact/` → serves `contact/index.html`

**Important:** The `404.html` file in this repository handles routing for:
- Direct URL access (e.g., `/experience` without trailing slash)
- Page refreshes on subdirectories
- Invalid routes (redirects to home)

This ensures all routes work correctly on GitHub Pages.

### Method 1: Direct Deployment
1. Push all files to a GitHub repository (including `404.html`)
2. Go to repository Settings > Pages
3. Select source branch (usually `main` or `master`)
4. Select `/ (root)` as the folder
5. Click Save

Your site will be available at `https://<username>.github.io/<repository-name>/`

**Note:** If using a custom domain (e.g., `ainis.dev`), make sure:
- Your domain is configured in repository Settings > Pages > Custom domain
- DNS records point to GitHub Pages
- The `.nojekyll` file is present (already included)

### Method 2: Using GitHub Actions (Optional)
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

## Notes

- The LinkedIn URL needs to be updated in all HTML files (search for `yourprofile`)
- Replace placeholder email addresses (search for `your.email@example.com`)
- Replace placeholder GitHub username (search for `yourusername`)
- All external libraries are loaded via CDN for simplicity
- The `.nojekyll` file ensures GitHub Pages serves the site correctly

## License

This project is open source and available for personal use.

## Contributing

Feel free to fork this project and customize it for your own CV website!
