# Healthcare Management System Backend

This backend powers a healthcare management system with features such as a searchable hospital database, health reminders, user profiles, appointment scheduling, and more.

---

## Features
- **Searchable hospital database**
- **Basic health reminders** (e.g., medicine, appointments)
- **User profiles** with basic health data (age, height, weight, blood type)
- **Basic FAQ section**
- **Emergency contacts management**
- **Nearby hospital locator**
- **User login and secure health data storage**
- **Appointment scheduling**

---

## Installation Steps

### 1. Clone the Repository
Clone the repository or download the code files to your local machine.

```bash
git clone <repository-url>
cd <project-directory>
```
### 2. Install Dependencies
Run the following command in the project directory to install required dependencies:

```bash
npm install
```

### 3. Configure the Project
Create a .env file in the root directory to define environment variables like:

```env
PORT=3000
JWT_SECRET=your_secret_key
DB_URL=your_database_url
```

### Running the Server
Start the Node.js server:

```bash
node script.js
```

**API Routes**

**User Management**
```
POST /api/create/user: Register a new user.
POST /api/login/user: Log in an existing user.
```
**Contact Management**
```
POST /create/contact: Create a new contact (requires JWT authentication).
GET /api/get/contacts: Fetch all contacts (requires JWT authentication).
DELETE /api/del/contact: Delete a contact (requires JWT authentication).
```

**Reminder Management**
```
POST /api/reminder: Create a general reminder (requires JWT authentication).
POST /api/med/reminder: Create a medicine reminder (requires JWT authentication).
DELETE /api/del/med/reminder: Delete a medicine reminder (requires JWT authentication).
```
**Appointment Management**
```
POST /api/apt/reminder: Create an appointment reminder (requires JWT authentication).
GET /api/get/apt/reminder: Fetch all appointment reminders (requires JWT authentication).
DELETE /api/del/apt/reminder: Delete an appointment reminder (requires JWT authentication).
```

**User Profile and History**
```
GET /api/user/profile: Get the user's profile information (requires JWT authentication).
GET /api/appointments/history: Get the user's appointment history (requires JWT authentication).
```


### Frontend Integration
For the frontend implementation of this backend, [click here to visit the frontend repository](https://github.com/jfernsio/healthcare-frontend).


The frontend repository provides the user interface to interact with these backend APIs. Ensure you configure the frontend with the correct backend API URL.
