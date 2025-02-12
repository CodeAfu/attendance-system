
## Checklist
- Create Attendance Form Page ✅
- Create Submit Page 🔨
- Use Dynamic Routing to display QR Code for each **venue/course/venue-course** (choose 1) combination 
- Create Admin Panel ❌

## Use Case
- Generate a QR code for **course ID**
- User scans QR code
- Form is fetched for the **course ID**
- User fills out form and submits
- **API is called to create attendance record**

## Data
- User
    - Name
    - Employer
    - NRIC
    - Citizenship
    - Gender
    - Signature
- Course Details
    - Course ID
    - Venue
- Date


## API Endpoints
```bash
### CREATE QRCODE
/api/qr/generate # POST - Generate QR Code for course ID

### FORM
/api/attendance/form?course={course}&venue={venue} # GET - course and venue required
```