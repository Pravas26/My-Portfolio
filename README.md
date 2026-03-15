# AI Engineer Portfolio Website

A modern, futuristic single-page portfolio website designed for AI Engineers with animated particle backgrounds, glassmorphism UI, and 3D effects.

## 🚀 Quick Start

### 1. Replace Placeholders

Open `index.html` and replace these placeholders:
- `{{NAME}}` - Your full name
- `{{EMAIL}}` - Your email address
- `{{GITHUB_USERNAME}}` - Your GitHub username
- `{{LINKEDIN_URL}}` - Your LinkedIn profile path (e.g., "john-doe")

Also update `{{GITHUB_USERNAME}}` in `script.js` (line 329) for the GitHub repositories section.

### 2. Add Your Resume

**IMPORTANT:** Place your resume PDF file in the same directory as `index.html` and name it `resume.pdf`.

The "Download Resume" button in the hero section will download this file when clicked.

If you want to use a different filename:
1. Open `index.html`
2. Find `<a href="resume.pdf" download class="btn btn-primary">`
3. Change `resume.pdf` to your filename (e.g., `John_Doe_Resume.pdf`)

### 3. Customize Content

Edit the following sections in `index.html`:
- **About Section**: Update the paragraph text about yourself
- **Skills**: Modify the bullet points in each category
- **Projects**: Add your own projects (title, description, tech stack, links)
- **Metrics**: Change the counter numbers in the About section

### 4. Deploy to GitHub Pages

1. Create a new repository named `your-username.github.io`
2. Upload these files to the repository root:
   - `index.html`
   - `style.css`
   - `script.js`
   - `resume.pdf` (your resume)
3. Go to Settings → Pages
4. Select "Deploy from main branch"
5. Your site will be live at `https://your-username.github.io`

## ✨ Features

### Visual Design
- **Animated particle network background** with mouse interaction
- **3D neural network visualization** in hero section
- **Glassmorphism UI cards** with backdrop blur effects
- **Neon color scheme** (cyan, blue, purple)
- **Floating geometric elements**
- **3D tilt effect** on project cards

### Sections
1. **Hero** - Introduction with animated gradient text and CTA buttons
2. **About** - Bio with animated statistics counter
3. **Skills** - Four categories with bullet point lists
4. **Projects** - Featured projects showcase
5. **GitHub** - Auto-fetched repositories from GitHub API
6. **Contact** - Contact information and social links

### Interactive Features
- Smooth scroll navigation
- Scroll-triggered animations
- Responsive mobile menu
- GitHub API integration with language filtering
- Counter animations
- Mouse-interactive particles

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1920px+)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

## 🎨 Color Customization

To change the color scheme, edit the CSS variables in `style.css`:

```css
:root {
    --color-neon-blue: #00d9ff;
    --color-neon-purple: #b24bf3;
    --color-neon-pink: #ff2d95;
    --color-neon-cyan: #00fff5;
}
```

## 🔧 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📄 File Structure

```
portfolio/
├── index.html    # Main HTML file
├── style.css     # All styles and animations
├── script.js     # JavaScript for interactivity
└── resume.pdf    # Your resume (add this)
```

## 💡 Tips

- Use a professional headshot if you add an image
- Keep project descriptions concise (2-3 sentences)
- Update GitHub username to show your actual repositories
- Test the resume download button before deploying
- Optimize your resume PDF (keep file size under 2MB)

## 🐛 Troubleshooting

**Resume not downloading?**
- Make sure `resume.pdf` is in the same folder as `index.html`
- Check that the filename matches exactly (case-sensitive)

**GitHub repos not loading?**
- Update `{{GITHUB_USERNAME}}` in `script.js`
- Check browser console for API errors
- Verify your GitHub profile is public

**Animations not working?**
- Clear browser cache
- Try a different browser
- Check JavaScript console for errors

## 📧 Support

For issues or questions about customization, refer to the code comments in each file.

---

Built with vanilla HTML, CSS, and JavaScript - no frameworks required!
