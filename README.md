# Corporate Attendance System
A web application for training managers and lecturers to manage training courses and attendance, built for APU.

## Data Model

#### User
- **Email**
- **Password**
- **Role**
- **Image**
- **Is Locked**
- **Lock Start**
- **Lock End**

#### Trainee
- **First Name**
- **Last Name**
- **Gender**
- **Date of Birth**
- **Citizenship**
- **NRIC**
- **Email**
- **Contact Number**
- **Employer**
- **Course ID**

#### Course
- **Course ID**
- **Course Name**
- **Trainer Name**

#### Attendance Record
- **ID**
- **Course ID**
- **Venue**
- **Date**
- **Base 64 Signature**
- **Trainee Record ID**

### User
- **Name**
- **Employer**
- **NRIC**
- **Citizenship**
- **Gender**
- **Signature**

### Course Details
- **Course ID**
- **Venue**

## Future Reference

### Local Postgres DB via Docker

#### Initialize Database
```bash
docker run --name local-attendance-db -e POSTGRES_USER=localuser -e POSTGRES_PASSWORD=localpass -e POSTGRES_DB=localdb -p 5433:5432 -d postgres
```

#### Connect to Database via psql (CLI for postgres)
```bash
docker exec -it local-attendance-db psql -U localuser -d localdb
```

## Notes
- *Nothing here for now*

## Workflow

### Development Point of View
1. Create **Course** via admin panel.
2. Add **Trainees** to course via admin panel.
3. Generate QR Code for **Course ID**.
4. **Trainee** scans QR Code and fills out the form.
5. Form submission creates an **Attendance Record**.

### Client Point of View
- *To be added*

## Questions
- Do we create courses in the web app?
  - *Involves manually inserting data via admin panel.*
- Do we store Trainee information in the web app database?
  - *Involves manually inserting data via admin panel.*
- Which aspect do you want to specifically automate? (Personal workload, Attendance collection process)
- Verify the workflow of the attendance process.
  - *Take note of the workflow.*

