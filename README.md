# FINBlog - Financial Tips for South African Students

A comprehensive financial blog designed specifically for South African students, providing practical advice on budgeting, banking, side hustles, and financial planning.

## 🌟 Features

- **Comprehensive Financial Content**: Detailed guides on budgeting, banking, investing, and student life
- **Interactive Elements**: Budget calculators, comparison tables, and visual infographics
- **Responsive Design**: Beautiful, mobile-friendly interface with blue-to-purple gradient theme
- **Admin Panel**: Full content management system for creating and editing blog posts
- **User Authentication**: Secure login system for content management
- **Search Functionality**: Find articles by keywords and categories
- **SEO Optimized**: Proper meta tags, structured content, and search engine optimization

## 🎯 Target Audience

South African students looking for:
- Budgeting and money management advice
- Student bank account comparisons
- Side hustle opportunities
- Investment basics and wealth building
- NSFAS allowance management
- Textbook and study material savings

## 🚀 Getting Started

### Prerequisites

- Python 3.8 or higher
- pip (Python package installer)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/finblog.git
   cd finblog
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   SECRET_KEY=your-secret-key-here
   DATABASE_URL=sqlite:///blog.db
   ```

5. **Initialize the database**
   ```bash
   python -c "from app import app, db; app.app_context().push(); db.create_all()"
   ```

6. **Create an admin user**
   ```bash
   python -c "
   from app import app, db
   from models import User
   from werkzeug.security import generate_password_hash
   
   with app.app_context():
       admin = User(
           username='admin',
           email='admin@finblog.com',
           password_hash=generate_password_hash('admin123'),
           is_admin=True
       )
       db.session.add(admin)
       db.session.commit()
       print('Admin user created!')
   "
   ```

7. **Run the application**
   ```bash
   python app.py
   ```

8. **Access the application**
   - Main site: http://127.0.0.1:5000
   - Admin panel: http://127.0.0.1:5000/admin/posts
   - Login: admin@finblog.com / admin123

## 📁 Project Structure

```
finblog/
├── app.py                 # Main Flask application
├── models.py              # Database models
├── forms.py               # WTForms for user input
├── config.py              # Configuration settings
├── requirements.txt       # Python dependencies
├── .env                   # Environment variables (create this)
├── .gitignore            # Git ignore file
├── README.md             # This file
├── static/               # Static files
│   ├── css/
│   │   └── style.css     # Custom styles
│   ├── js/
│   │   └── main.js       # JavaScript functionality
│   └── images/           # Blog images
├── templates/            # Jinja2 templates
│   ├── base.html         # Base template
│   ├── index.html        # Homepage
│   ├── blog.html         # Blog listing
│   ├── blog_post.html    # Individual blog post
│   ├── about.html        # About page
│   ├── contact.html      # Contact page
│   ├── login.html        # Login page
│   ├── register.html     # Registration page
│   ├── search.html       # Search results
│   └── admin/            # Admin templates
│       ├── posts.html    # Post management
│       └── post_form.html # Post creation/editing
└── uploads/              # File uploads (created automatically)
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Blue to purple gradient (#1e3a8a to #a855f7)
- **Accent**: Golden yellow (#fbbf24)
- **Background**: Clean white with subtle patterns

### Interactive Elements
- **Hero Section**: Animated gradient background with floating elements
- **Progress Indicators**: Visual step-by-step guides
- **Interactive Calculators**: Budget and investment calculators
- **Comparison Tables**: Styled tables with hover effects
- **Visual Callouts**: Highlighted tips, warnings, and important information

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interface
- Optimized for all screen sizes

## 📝 Content Management

### Creating Blog Posts
1. Log in to the admin panel
2. Click "New Post"
3. Fill in the post details:
   - Title and excerpt
   - Content (supports Markdown)
   - Category and tags
   - Featured image
   - Publication status

### Supported Content Types
- **Markdown**: Full markdown support with tables, code blocks, and formatting
- **Images**: Automatic image optimization and lazy loading
- **Interactive Elements**: Calculators, comparison tables, and visual callouts
- **Categories**: Banking, Budgeting, Side Hustles, Student Life, Investing, Apps & Tools

## 🛠️ Technology Stack

### Backend
- **Flask**: Python web framework
- **SQLAlchemy**: Database ORM
- **Flask-Login**: User authentication
- **Flask-WTF**: Form handling and CSRF protection
- **Markdown**: Content rendering

### Frontend
- **Bootstrap 5**: CSS framework
- **Font Awesome**: Icons
- **Custom CSS**: Advanced styling and animations
- **JavaScript**: Interactive functionality

### Database
- **SQLite**: Development database
- **PostgreSQL**: Production-ready (configurable)

## 🔧 Configuration

### Environment Variables
```env
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///blog.db
FLASK_ENV=development
```

### Database Configuration
The application supports multiple database backends:
- SQLite (default for development)
- PostgreSQL (recommended for production)
- MySQL (alternative option)

## 📊 Content Statistics

The blog includes comprehensive content covering:

- **9 Detailed Articles**: 5,000+ words of financial guidance
- **6 Categories**: Banking, Budgeting, Side Hustles, Student Life, Investing, Apps & Tools
- **Interactive Tools**: Budget calculators, investment growth calculators, side hustle income trackers
- **Visual Elements**: Comparison tables, infographics, progress indicators
- **Local Focus**: South African-specific information and resources

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Author

**Sarah Johnson** - Financial Blogger
- Email: admin@finblog.com
- Specializing in South African student financial education

## 🙏 Acknowledgments

- South African financial institutions for providing accurate information
- Unsplash for high-quality images
- Bootstrap and Font Awesome for UI components
- The Flask community for excellent documentation

## 📞 Support

If you have any questions or need help with the project:

1. Check the [Issues](https://github.com/yourusername/finblog/issues) page
2. Create a new issue if your problem isn't already reported
3. Contact the author at admin@finblog.com

## 🚀 Deployment

### Heroku Deployment
1. Create a Heroku app
2. Set environment variables
3. Configure PostgreSQL database
4. Deploy using Git

### VPS Deployment
1. Set up a Linux server
2. Install Python, PostgreSQL, and Nginx
3. Configure SSL certificates
4. Set up process management with systemd

---

**Made with ❤️ for South African Students**