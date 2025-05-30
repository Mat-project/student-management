# Student Management System

A full-stack web application offering comprehensive student management with CRUD functionality, interactive dashboard, and real-time analytics.

## Project Overview

This Student Management System provides an intuitive interface for educational institutions to efficiently manage student information. Administrators can view dashboards with analytics, search through student records, and perform add, edit, and delete operations through a modern, responsive interface.

## Key Features

- **Interactive Dashboard** - Visual analytics showing student distribution, course statistics and system activity
- **Comprehensive Student Management** - Complete CRUD operations for student records
- **Real-time Search & Filtering** - Instantly find students across multiple parameters
- **Data Visualization** - Charts and progress bars for statistical representation
- **Form Validation** - Client-side validation with helpful error messages
- **Responsive Design** - Optimized for desktops, tablets, and mobile devices
- **Toast Notifications** - User-friendly feedback for all operations
- **Automated Carousel** - Dynamic content display on homepage

## Dashboard Preview

![Dashboard Preview](frontend/src/static/img1.png)

*The dashboard provides a visual overview of the system with statistics cards, student distribution by course, recent activity log, and more.*

## Technologies Used

### Frontend
- **React** - JavaScript library for building user interfaces
- **Vite** - Next generation frontend tooling
- **React Router** - For navigation and routing
- **React Bootstrap** - UI component library 
- **Axios** - Promise-based HTTP client for API requests
- **Formik & Yup** - Form handling and validation
- **React Toastify** - Toast notifications
- **React Icons** - Icon library for enhanced UI
- **React Spinners** - Loading indicators

### Backend
- **Django** - Python web framework for the backend
- **Django REST Framework** - For building the REST API
- **SQLite/PostgreSQL** - Database (implied from Django setup)

## Project Structure

```
student-management/
├── frontend/                        # React frontend application
│   ├── src/
│   │   ├── components/              # React components
│   │   │   ├── AddStudentModel.jsx  # Add student form modal
│   │   │   ├── Dashboard.jsx        # Analytics dashboard
│   │   │   ├── Home.jsx             # Homepage with carousel
│   │   │   ├── Manage.jsx           # Student management interface
│   │   │   ├── Nav.jsx              # Navigation sidebar
│   │   │   ├── Students.jsx         # Student listing component
│   │   │   └── UpdateStudentModel.jsx # Edit student form modal
│   │   ├── services/
│   │   │   └── Api.js               # API service functions
│   │   ├── static/                  # Static assets like images
│   │   ├── App.css                  # Main application styles
│   │   ├── App.jsx                  # Main application component
│   │   ├── index.css                # Global styles
│   │   └── main.jsx                 # Application entry point
│   ├── index.html                   # HTML template
│   └── .eslintrc.cjs                # ESLint configuration
└── backend/                         # Django backend
    ├── student_api/                 # Django REST API app
    ├── student_management/          # Django project directory
    ├── manage.py                    # Django management script
    └── requirements.txt             # Python dependencies
```

## Detailed Features

### Dashboard
- Student count and statistics
- Course distribution with visual progress bars
- Recent activity log with timestamps
- Email domain distribution analysis
- Latest system updates

### Student Management
- View all students in a searchable, sortable table
- Add new students with comprehensive form validation
- Edit existing student information
- Delete student records with confirmation
- Search across all student fields

### User Interface
- Clean, modern design with consistent color scheme
- Card-based layout for visual separation and organization
- Responsive sidebar navigation
- Loading indicators during data operations
- Interactive elements with hover effects
- Toast notifications for user feedback

## API Endpoints

The application communicates with the backend through these RESTful endpoints:

- `GET /student/` - Retrieve all students
- `POST /student/` - Add a new student
- `PUT /student/:id/` - Update a specific student
- `DELETE /student/:id/` - Delete a specific student

## Data Model

### Student
- **First Name** - Student's first name (required, min 2 characters)
- **Last Name** - Student's last name (required, min 1 character)
- **Registration Number** - Unique identifier (required, alphanumeric)
- **Email** - Student's contact email (required, valid email format)
- **Course** - Enrolled course name (required)

## System Requirements

### Development Environment
- Node.js 14.x or later
- npm 6.x or later
- Python 3.8 or later
- pip 20.x or later

### Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## How to Run the Project

### Frontend

```bash
# Clone the repository
git clone https://github.com/username/student-management.git
cd student-management/frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

### Backend

```bash
# Navigate to backend directory
cd ../backend

# Create virtual environment (optional but recommended)
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Apply migrations
python manage.py migrate

# Run development server
python manage.py runserver
```

## Future Enhancements

### UI Enhancements
- Dark/Light theme toggle
- Advanced filtering options
- Pagination for large datasets
- Data export to CSV/Excel/PDF
- Print-friendly views

### Functional Improvements
- User authentication with role-based access
- Student photos/profile images
- Email notifications for important actions
- Batch operations for multiple records
- Student portal for self-service

### Technical Improvements
- TypeScript integration
- Centralized state management with Redux
- Automated testing suite
- Performance optimizations
- Offline support with service workers

## Contributors

- Mathan M - Initial work and development

## License

This project is licensed under the MIT License - see the LICENSE file for details.
