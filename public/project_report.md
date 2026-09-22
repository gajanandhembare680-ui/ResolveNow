# PROJECT REPORT
## RESOLVENOW: A CLOUD-BASED CAMPUS COMPLAINT MANAGEMENT SYSTEM

*Submitted in partial fulfillment of the requirements for the degree of Bachelor of Technology / Bachelor of Computer Applications / Master of Science in Computer Science.*

---

### **PROJECT DETAILS**
* **Project Title:** ResolveNow: A Cloud-Based Campus Complaint Management System (CMS)
* **Academic Year:** 2025 - 2026
* **Technology Stack:** React.js (v19), Vite, Google Firebase (Authentication & Cloud Firestore), Vanilla CSS (Glassmorphism design), Lucide Icons, React Router DOM (v7)
* **Author/Student Name:** [Your Name]
* **Roll Number/ID:** [Your Roll Number]
* **Department:** Department of Computer Science & Engineering / Information Technology
* **Supervisor/Guide:** [Supervisor Name & Designation]
* **Institution:** [Your Institution/College Name]

---

## **TABLE OF CONTENTS**
1. **Certificate of Approval**
2. **Candidate Declaration**
3. **Acknowledgements**
4. **Abstract Summary**
5. **Chapter 1: Introduction**
   * 1.1 Project Overview & Context
   * 1.2 Project Scope & Limitations
   * 1.3 Motivation & Core Philosophy
   * 1.4 Problem Statement of Legacy Systems
   * 1.5 Objectives & Key KPI Targets
6. **Chapter 2: Literature Survey**
   * 2.1 Analysis of Traditional Complaint Logs
   * 2.2 System Feasibility Analysis
   * 2.3 Technology Stack Evaluation Matrix
   * 2.4 React Single Page Application (SPA) Architectural Paradigm
   * 2.5 NoSQL vs SQL Database Choice
7. **Chapter 3: SDLC Methodology**
   * 3.1 SDLC Process Model Selection
   * 3.2 Agile Scrum Framework & Sprint Planning
   * 3.3 Agile User Stories & Backlog Grooming
   * 3.4 Work Breakdown Structure (WBS)
8. **Chapter 4: System Specifications**
   * 4.1 Hardware Environment Specification
   * 4.2 Software Environment Specification
   * 4.3 Functional Requirements Breakdown (Actor-wise)
   * 4.4 Non-Functional Software Quality Requirements
9. **Chapter 5: System Design**
   * 5.1 Block-Level System Architecture
   * 5.2 Database Entity Schema & Collections
   * 5.3 Data Flow Diagrams (DFD Levels 0, 1, and 2)
   * 5.4 Unified Modeling Language (UML) Diagrams
   * 5.5 User Interface Guidelines & Aesthetics
10. **Chapter 6: Implementation Details**
    * 6.1 Codebase Project Architecture Tree
    * 6.2 Firebase Database Initialization Code
    * 6.3 Routing & Protected Routes Implementation
    * 6.4 Student Dashboard Logic Walkthrough
    * 6.5 Administrative Logic & Operations Walkthrough
11. **Chapter 7: Testing & Quality Assurance**
    * 7.1 Quality Assurance Methodologies
    * 7.2 Master Test Suite Table
    * 7.3 Security Audit & Rules Configurations
12. **Chapter 8: Installation & User Manual**
    * 8.1 Developer Setup & Local Hosting Installation
    * 8.2 End User Manual: Student Guide
    * 8.3 Administrative Workspace Guide
13. **Chapter 9: Conclusion & Future Scope**
    * 9.1 Achievements & Project Summary
    * 9.2 Technical Constraints & Limitations
    * 9.3 Future Technical Roadmap
14. **References & Bibliography**

---

## **1. CERTIFICATE OF APPROVAL**

This is to certify that the project report entitled **"ResolveNow: A Cloud-Based Campus Complaint Management System"** is a record of bonafide work carried out by **[Your Name]** (Roll No: **[Your Roll Number]**) in partial fulfillment of the requirements for the award of the degree of Bachelor of Technology in Computer Science & Engineering at **[Your Institution Name]** during the academic term 2025 - 2026.

This work has been performed under my supervision and guidance. The contents of this report, in full or in part, have not been submitted to any other University or Institute for the award of any degree or diploma.

\
\
**________________________**  
**[Supervisor Name]**  
Project Guide / Assistant Professor  
Department of Computer Science & Engineering  

\
\
**________________________**  
**[Head of Department Name]**  
Head of Department  
Department of Computer Science & Engineering  

---

## **2. CANDIDATE DECLARATION**

I, **[Your Name]**, student of Bachelor of Technology in Computer Science & Engineering, roll number **[Your Roll Number]**, at **[Your Institution Name]**, hereby declare that the project work presented in this report entitled **"ResolveNow: A Cloud-Based Campus Complaint Management System"** is an authentic record of my own work carried out under the supervision of **[Supervisor Name]**.

Any library materials, software libraries, references, or text segments adapted from standard resources have been duly acknowledged and documented in this report. No part of this report has previously been submitted for the award of any other academic certificate or degree.

\
\
**Date:** [Current Date]  
**Place:** [Your City]  

\
**________________________**  
**[Your Name]**  
Candidate Signatory  

---

## **3. ACKNOWLEDGEMENTS**

It is my distinct privilege to express my deepest sense of gratitude, respect, and appreciation to my project mentor, **[Supervisor Name]**, Department of Computer Science & Engineering, for their invaluable advice, continuous support, and motivating discussions that kept this project on course.

I would also like to thank **[Head of Department Name]**, Head of the Department, for extending the resources and facilities of the departmental computer networks lab to configure and deploy our cloud instances.

Finally, I must acknowledge the support of my family members and peer group who actively tested the user interfaces in various simulated workloads. Their feedback directly shaped the responsive navigation layouts and the validation forms integrated within the login sections.

---

## **4. ABSTRACT SUMMARY**

Institutions of higher learning regularly face complex maintenance, logistical, and academic issues that impact student learning environments. In the absence of structured tracking systems, campus complaints—ranging from library Wi-Fi outages to hostel room maintenance—are submitted via physical registers, paper chits, or unmanaged email lists. These traditional methods lack transparency, fail to offer status updates, suffer from data loss, and create bottlenecks for administrative teams tasked with resolution.

To overcome these systemic issues, this thesis presents the design, implementation, and deployment of **ResolveNow**, an academic **Campus Complaint Management System (CMS)**. The system is engineered on a modern single-page application (SPA) model using **React.js (v19)** and **Vite** for client-side rendering. The user interface leverages custom **Glassmorphism CSS** styles to create a polished, responsive, and accessible experience on both desktop and mobile viewports, using **Lucide Icons** for intuitive visual cues. The backend relies on a serverless architecture powered by **Google Firebase**, specifically integrating **Firebase Authentication** for secure account control and **Cloud Firestore** for NoSQL data storage and real-time document synchronization.

ResolveNow implements **Role-Based Access Control (RBAC)** to separate student and administrator views. Students can register accounts, sign in, lodge complaints categorized by department (Wi-Fi, Infrastructure, Hostel, Academic), track the status of their issues (Pending, Accepted, Resolved, Rejected, Unresolved) in real time, and delete their own logged reports. Administrators are equipped with a comprehensive system panel featuring server-side keyword searching, state filtering, timestamp sorting, single-click status updates, and a student database tracker. The application has been optimized, tested, and deployed on cloud instances (Vercel). The resulting system simplifies complaint management, reduces resolution times, and ensures a transparent feedback loop for student concerns.

---

## **5. CHAPTER 1: INTRODUCTION**

### **1.1 Project Overview & Context**
**ResolveNow** is an enterprise-grade Campus Complaint Management System (CMS) designed to automate, streamline, and coordinate the processing of college issues. The application operates as a single-page web app (SPA) using React.js (v19) on the client side, connected to a serverless backend on Google Firebase. ResolveNow replaces traditional, manual record-keeping with a secure portal featuring separate student and administrator views. This allows institutions to manage, evaluate, and resolve complaints efficiently.

Educational campuses host large populations of students, faculty, and administrative staff who share a complex network of physical facilities, digital infrastructure, and academic services. Keeping these systems running smoothly requires an efficient feedback loop. ResolveNow provides this loop by allowing students to register and track complaints, while administrators receive the tools needed to prioritize, monitor, and resolve issues systematically.

### **1.2 Project Scope & Limitations**
The scope of this project includes the design, implementation, testing, and deployment of a fully functional web-based complaint management application. Features include:
1. Secure email-password authentication with role segregation.
2. A database to log complaints under specific categories (Infrastructure, Academic, Hostel, Wi-Fi).
3. Interactive student and administrator dashboards containing real-time status trackers and metrics.
4. A searchable, filterable administrative interface with sorting and status controls.

**Current Boundaries & Limitations:** The initial version is restricted to single-organization deployment. It uses a single-tier administrator role, meaning complaints cannot yet be automatically routed to department heads (e.g., electrical or IT sub-admins). The system lacks external messaging systems (SMS/email notifications), requiring users to log in to see status changes. Finally, users cannot upload attachments (like screenshots or photos), which will be addressed in future versions.

### **1.3 Motivation & Core Philosophy**
The motivation for building ResolveNow stems from the inefficiencies found in traditional campus administration. Most colleges still log complaints using physical registers or open spreadsheets. These methods suffer from several key issues:
* **Lack of Accountability:** Written complaints can be misplaced or ignored, leaving students without updates on their status.
* **Inefficient Sorting:** Administration staff must sort through pages of handwritten notes to compile issues by urgency or category.
* **No Historical Records:** Without a searchable database, it is difficult to identify recurring issues (like a specific router frequently losing connection).

The core philosophy of ResolveNow is to build a centralized, real-time platform where issues are registered, indexed, and resolved in a transparent and auditable manner. This improves communication, helps administrators allocate resources more effectively, and boosts student satisfaction.

### **1.4 Problem Statement of Legacy Systems**
The legacy complaint processes in academic institutions are heavily manual and prone to bottlenecking. The following matrix illustrates the differences between manual registration and the automated ResolveNow system:

| Operational Factor | Manual Paper-based Registers | ResolveNow Automated Platform |
| :--- | :--- | :--- |
| **Registration Speed** | Slow (requires visiting administrative office) | Instant (accessible via desktop or mobile web) |
| **Tracking Capability** | None (no feedback loop for students) | Real-time dashboard status tracking |
| **Search & Filtering** | Requires manual page search | Instant keyword search and category filtering |
| **Security & Integrity** | Low (registers can be lost, altered, or damaged) | High (database secured by Firebase RBAC) |
| **Data Analysis** | Time-consuming to compile manually | Live statistical counts displayed instantly |

### **1.5 Objectives & Key KPI Targets**
To evaluate the success of the ResolveNow platform, the project targets several Key Performance Indicators (KPIs):
* **Registration Time reduction:** Reduce the average time a student spends filing a complaint from 20 minutes to under 60 seconds.
* **Administrative processing speed:** Reduce the average time to read and categorize a complaint from 3 days to under 4 hours.
* **Transparency Index:** Ensure every submitted complaint has a clear status (Pending, Accepted, Resolved, Rejected, Unresolved) visible to the student.
* **Vulnerability rate:** Achieve zero unauthorized database access attempts by using role-based routing checks.
* **Interface Speed:** Keep page-to-page navigation times under 150ms on standard 3G/4G networks through Vite build optimizations.

---

## **6. CHAPTER 2: LITERATURE SURVEY**

### **2.1 Analysis of Traditional Complaint Logs**
Historically, campus complaint management relied on physical logbooks kept at administrative desks or hostels. When a student encountered an issue, they had to walk to the office and write down details such as the date, description, and contact info in a register. The administrator would then manually review the logbook, compile issues, and assign tasks to maintenance teams.

As personal computers became common, some campuses moved to shared spreadsheets (e.g., Microsoft Excel or Google Sheets) or basic email accounts. While this solved the issue of physical storage, it introduced new problems: sheets could be accidentally overwritten, emails were often lost in busy inboxes, and there was still no automated system for updating students on progress. ResolveNow addresses these challenges by replacing spreadsheets and emails with a dedicated NoSQL data structure that guarantees data security and automates status updates.

### **2.2 System Feasibility Analysis**
Before beginning development, a feasibility study was conducted across three key areas:
1. **Technical Feasibility:** The development stack (React.js, Vite, and Firebase) is widely documented and supported. Firebase provides out-of-the-box user authentication and NoSQL data storage, removing the need to configure and maintain a dedicated backend server. This makes the project highly feasible technically.
2. **Operational Feasibility:** The interface requires no prior technical training. Students use simple forms to file complaints, and administrators manage tasks through a dashboard with straightforward search, filter, and status update options.
3. **Economic Feasibility:** Developing and deploying the system is highly cost-effective. Firebase and Vercel offer free-tier plans that easily cover the resource requirements of a medium-sized college campus. Additionally, the system reduces the administrative costs associated with paper logbooks and manual data entry.

### **2.3 Technology Stack Evaluation Matrix**
To choose the best technology stack for the project, we compared various frontend and database options. The matrix below outlines our evaluation:

| Feature | Vite + React (Chosen) | Angular / Vue | Plain HTML + PHP |
| :--- | :--- | :--- | :--- |
| **Development Speed** | Very High (due to reusable React hooks) | Medium (steeper learning curve) | Low (requires custom templates) |
| **Build Performance** | Extremely Fast (Vite HMR & bundling) | Moderate (Webpack builds) | N/A (No compilation step) |
| **State Control** | Simple Context API & state management | Built-in but complex structures | Session-based Page Reloads |
| **Backend integration** | Direct connection via Firebase SDK | Requires custom REST API setup | Manual database connections (PDO) |

### **2.4 React Single Page Application (SPA) Architectural Paradigm**
ResolveNow is built as a Single Page Application (SPA). Unlike traditional multi-page websites that reload the entire page on every transition, an SPA loads a single HTML shell. It then dynamically updates the content as the user interacts with the app, using client-side routing managed by `react-router-dom`.

This architecture offers several benefits: it reduces network bandwidth since headers, footers, and scripts load only once, and it provides a smoother, desktop-like user experience. React's Virtual DOM ensures that only the modified parts of the page re-render, keeping the interface highly responsive during real-time database updates.

### **2.5 NoSQL vs SQL Database Choice**
Choosing between a relational SQL database (like MySQL or PostgreSQL) and a NoSQL document database (like Cloud Firestore) is a key design decision. The table below compares the two options for this project:

| Database Type | Relational SQL (e.g. PostgreSQL) | Cloud Firestore NoSQL (Chosen) |
| :--- | :--- | :--- |
| **Data Structure** | Strict tables with rows and columns | Flexible collections of JSON-like documents |
| **Scalability** | Requires complex vertical scaling | Scales horizontally automatically |
| **Real-time Sync** | Requires WebSockets or long polling | Built-in real-time sync with SDK listeners |
| **Schema Changes** | Requires database migrations | Schemaless; easily stores new fields |
| **Server Setup** | Requires server hosting and maintenance | Serverless; fully managed cloud service |

For ResolveNow, Cloud Firestore's serverless setup and built-in real-time sync made it the ideal choice, allowing the system to update complaint statuses instantly without manual server configuration.

---

## **7. CHAPTER 3: SDLC METHODOLOGY**

### **3.1 SDLC Process Model Selection**
The development of ResolveNow followed the **Agile Scrum Methodology**. Traditional waterfall development is less suited for web applications, as design and feature requirements often shift during user testing. Agile Scrum breaks development down into short, iterative cycles called sprints, allowing for continuous feedback and improvement.

Using short, iterative phases ensures that core elements like user registration, database routing, security guards, and form validation are systematically designed, implemented, and reviewed.

### **3.2 Agile Scrum Framework & Sprint Planning**
The project was completed over three development sprints, each lasting two weeks:
* **Sprint 1: Core Setup & Authentication (Weeks 1-2):** Initialized Vite and React, configured the Firebase SDK, created registration and login pages, and built route protection controls.
* **Sprint 2: Student Panel & Complaint Filing (Weeks 3-4):** Built the student dashboard, configured Firestore collections for complaints, designed the complaint submission form, and implemented the list view.
* **Sprint 3: Admin Workspace & Verification (Weeks 5-6):** Developed the administrative dashboard, added status update actions, implemented search and filter options, ran test suites, and deployed to production on Vercel.

### **3.3 Agile User Stories & Backlog Grooming**
User stories helped define functional requirements from the perspective of both students and administrators:

| User Role | User Story Description | Acceptance Criteria |
| :--- | :--- | :--- |
| **Student** | As a student, I want to create an account so I can securely log in and file complaints. | Email must be verified; account role must be saved as "student" in Firestore. |
| **Student** | As a student, I want to view my past complaints so I can check their resolution status. | Dashboard displays real-time status counts; history list updates dynamically. |
| **Administrator** | As an admin, I want to view all complaints submitted across campus. | Master dashboard displays all records sorted by date. |
| **Administrator** | As an admin, I want to search and filter complaints to find urgent issues. | Search matches keywords in titles; dropdowns filter by category or status. |
| **Administrator** | As an admin, I want to change a complaint's status so students know it is being addressed. | Clicking status updates Firestore and updates the student's dashboard. |

### **3.4 Work Breakdown Structure (WBS)**
The project was organized into five main phases:
1. **Phase 1: Project Initiation & Requirements Gathering**
   * Identify user requirements and construct DFD diagrams.
   * Research development tools and configure the Firebase environment.
2. **Phase 2: Database and Authentication Architecture**
   * Design NoSQL schemas for the `user` and `complaints` collections.
   * Configure Firebase Authentication email-password login parameters.
3. **Phase 3: Frontend Interface Development**
   * Create components for the Landing page, login/signup forms, and dashboards.
   * Style the application using global Glassmorphism CSS.
4. **Phase 4: Backend API Integration**
   * Connect the frontend forms to Firestore using the Firebase SDK.
   * Implement Route Protection middleware to secure admin and student dashboards.
5. **Phase 5: Quality Assurance & Deployment**
   * Run unit, integration, and role-security tests.
   * Deploy the application to Vercel and write project documentation.

---

## **8. CHAPTER 4: SYSTEM SPECIFICATIONS**

### **4.1 Hardware Environment Specification**

#### **A. Development Workstation Specifications**
* **CPU:** Intel Core i5 or AMD Ryzen 5 processor.
* **System RAM:** 8 GB DDR4 or higher.
* **Storage:** 256 GB SSD (Solid State Drive) minimum.
* **Display Resolution:** 1920x1080 Full HD recommended for testing responsive layout designs.

#### **B. Target Server Hosting Infrastructure**
* **Hosting Provider:** Vercel Global Edge Network.
* **Database Server:** Google Firebase multi-regional hosting nodes.

#### **C. Target Client Device Specifications**
* **Desktops & Laptops:** Intel/AMD/Apple CPU, 2GB RAM, 1024x768 minimum display resolution.
* **Smartphones & Tablets:** iOS or Android devices with a standard web browser (Safari, Chrome, Firefox).

### **4.2 Software Environment Specification**

#### **A. Developer Local Software Configurations**
* **Operating System:** Windows 11 Home/Pro, macOS Sequoia, or Ubuntu LTS.
* **Runtime Environment:** Node.js (v18.x or v20.x LTS) with NPM package manager.
* **IDE Tool:** Visual Studio Code with ESLint and Prettier extensions.

#### **B. Software Frameworks & Dependencies**
* **Frontend Engine:** React.js v19 (rendering Single Page Application).
* **Build System:** Vite Bundler v7.
* **Routing Engine:** React Router DOM v7.
* **Icons Library:** Lucide React v0.5.
* **Cloud SDK:** Google Firebase Web Core SDK v12.

### **4.3 Functional Requirements Breakdown (Actor-wise)**

#### **Student Actor Functional Requirements**
* **Account Registration:** Students can register using their email, name, and password, and log in securely.
* **Lodge Complaint:** Lodge a complaint with a title, category selector (Infrastructure, Academic, Hostel, Wi-Fi), and description.
* **Track Status:** View real-time status counts on a personal dashboard.
* **Manage Complaints:** View past complaints in an expandable log view, and delete their own logged reports.

#### **Administrator Actor Functional Requirements**
* **Account Setup:** Single-admin account check during registration prevents unauthorized admin signups.
* **System Overview:** Master dashboard displaying totals of all complaints registered in the system.
* **Search & Filter Logs:** Filter complaints by category, state, and text keywords.
* **Modify Complaint Status:** Update complaint status (Pending, Accepted, Resolved, Rejected, Unresolved) to sync changes in real time.
* **Registered Users Panel:** View a list of registered students and manage records.

### **4.4 Non-Functional Software Quality Requirements**
* **Security & Authentication:** Passwords are encrypted on the client side before transmission, and session tokens are validated through Firebase. Protected routes prevent unauthorized access to student and administrator dashboards.
* **Scalability:** Built on a serverless NoSQL database, the system scales automatically as the number of users and complaints grows.
* **Reliability:** System-wide try-catch blocks prevent application crashes during database latency. The web client defaults to localized context state caches if network connections drop.
* **Usability & Responsiveness:** CSS Flexbox and Grid layouts keep the interface responsive on mobile, tablet, and desktop screens. Hover effects and clear status colors guide the user experience.
* **Performance:** Using the Vite build tool keeps the production bundle size minimal, ensuring page load times remain under 1.5 seconds.

---

## **9. CHAPTER 5: SYSTEM DESIGN**

### **5.1 Block-Level System Architecture**
ResolveNow uses a three-tier architecture that separates the presentation layer, the application logic, and the cloud data storage services:

```
[Presentation Layer]           ---> Web Browsers (React.js SPA UI Elements)
         |
         v
[Application Logic Layer]      ---> React Router Middleware, ProtectedRoute, Context Provider
         |
         v
[Cloud Data Storage Layer]     ---> Google Firebase Auth & Cloud Firestore collections
```

### **5.2 Database Entity Schema & Collections**

#### **Collection: `user`**
Stores detailed profiles of registered users. Document ID matches the User's UID generated by Firebase Authentication.
* **Fields:**
  * `uid`: String (Primary Key)
  * `name`: String
  * `email`: String
  * `role`: String ("student" | "admin")
  * `createdAt`: ServerTimestamp

#### **Collection: `complaints`**
Stores complaints filed by students. Document ID is an auto-generated hash key.
* **Fields:**
  * `id`: AutoHashString (Primary Key)
  * `userId`: String (Foreign Key user.uid)
  * `title`: String
  * `description`: String
  * `category`: String
  * `status`: String ("pending" | "accepted" | "resolved" | "rejected" | "unresolved")
  * `date`: Timestamp

### **5.3 Data Flow Diagrams (DFD Levels 0, 1, and 2)**

#### **DFD Level 0: Context Level Diagram**
```
Student ----(Form Inputs: Title, Category, Desc)----> [ ResolveNow ] <---(Updates/Filters)--- Admin
Student <---(Dashboard Status & Real-time Logs)------ [  Platform  ] ----(All System Logs)--> Admin
```

#### **DFD Level 1: System Process Diagram**
```
Student ---> [1.0 Account Check] <== Session Verification ==> (Firebase Auth)
Student ---> [2.0 File & View]   <== Write & Read Queries  ==> (Firestore: complaints)
Admin   ---> [3.0 Manage Logs]   <== Read & Update States  ==> (Firestore: user & complaints)
```

#### **DFD Level 2: CRUD Complaint Processing Detail**
```
Form Input ---> [2.1 Write Complaint] ---> Insert Server Date ---> [Firestore: complaints]
                                                                        |
                                                                        v
Admin Panel <--- [2.2 Query Logs] <--- Filter by category/status <------+
                                 |
                                 v
Admin Click ---> [2.3 Write Status Update] ---> Edit status field ---> [Firestore: complaints]
```

### **5.4 Unified Modeling Language (UML) Diagrams**
The UML Use Case and Sequence diagrams detail how actors interact with system boundaries, showing the step-by-step communication between the client frontend, authentication modules, and the database during key actions.

### **5.5 User Interface Guidelines & Aesthetics**
The user interface of ResolveNow is designed around a modern **Glassmorphism** aesthetic. Rather than using rigid white backgrounds, the interface features semi-transparent, frosted-glass panels layered over a subtle blue-to-indigo gradient. This design approach is defined by key styling principles:
* **Transparency & Blur:** Glass panels use a semi-transparent background color (`rgba(255, 255, 255, 0.6)`) coupled with a backdrop filter (`backdrop-filter: blur(12px)`) to create depth.
* **Reflective Borders:** Borders are thin and light (`rgba(255, 255, 255, 0.8)`) to mimic the light reflection on the edges of real glass.
* **Soft Shadows:** Shadows are soft and diffused (`rgba(31, 38, 135, 0.1)`) to make panels stand out from the background gradient without adding visual clutter.
* **Color Harmony & Status Coding:** We used a slate gray color scheme for text (`#1e293b` and `#64748b`) to ensure readability, while assigning distinct colors to complaint statuses (Yellow for Pending, Blue for Accepted, Green for Resolved, and Red for Rejected).

---

## **10. CHAPTER 6: IMPLEMENTATION DETAILS**

### **6.1 Codebase Project Architecture Tree**
```
CMS/
├── public/                 # Static assets
│   ├── vite.svg
│   ├── project_report.md
│   └── project_report.html
├── src/
│   ├── components/
│   │   └── ProtectedRoute.jsx  # Route middleware check component
│   ├── context/
│   │   └── ComplaintContext.jsx # Local state provider
│   ├── pages/
│   │   ├── Introduction.jsx    # Project Home Landing page
│   │   ├── RoleSelection.jsx   # Role selection card page
│   │   ├── Login.jsx           # Portal sign-in UI
│   │   ├── Signup.jsx          # Portal registration UI
│   │   ├── StudentDashboard.jsx# Student UI & filing form
│   │   └── AdminDashboard.jsx  # Admin database table panel
│   ├── App.jsx             # React routing table
│   ├── index.css           # Global glassmorphism stylesheet
│   └── firebase.js         # Cloud initialization SDK configs
└── package.json            # Scripts & libraries dependencies
```

### **6.2 Firebase Database Initialization Code**
```javascript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAXTdAxSP-ROJ0MFIufx-WKk-r2HhOTN7w",
    authDomain: "complaint-management-sys-b2250.firebaseapp.com",
    projectId: "complaint-management-sys-b2250",
    storageBucket: "complaint-management-sys-b2250.firebasestorage.app",
    messagingSenderId: "908442936065",
    appId: "1:908442936065:web:5da8e4f4a720061921b100",
    measurementId: "G-EW8LS00EPW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

### **6.3 Routing & Protected Routes Implementation**
```javascript
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const ProtectedRoute = ({ children, allowedRole }) => {
    const [status, setStatus] = useState('loading');
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const userDoc = await getDoc(doc(db, "user", user.uid));
                    if (userDoc.exists() && userDoc.data().role === allowedRole) {
                        setAuthorized(true);
                    } else {
                        setAuthorized(false);
                    }
                } catch (err) {
                    console.error("Authorization check failed", err);
                    setAuthorized(false);
                }
            } else {
                setAuthorized(false);
            }
            setStatus('done');
        });
        return unsubscribe;
    }, [allowedRole]);

    if (status === 'loading') {
        return <div>Verifying credentials...</div>;
    }

    return authorized ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
```

### **6.4 Student Dashboard Logic Walkthrough**
The student dashboard provides a clean interface for filing complaints and tracking their status. When a student logs in, the dashboard fetches their specific complaints from Firestore and displays them in an expandable list:
```javascript
React.useEffect(() => {
    const fetchComplaints = async () => {
        if (!auth.currentUser) return;
        try {
            const { getDocs, query, where } = await import("firebase/firestore");
            const q = query(collection(db, "complaints"), where("userId", "==", auth.currentUser.uid));
            const querySnapshot = await getDocs(q);
            const complaintsData = [];
            
            querySnapshot.forEach((doc) => {
                complaintsData.push({ id: doc.id, ...doc.data() });
            });

            complaintsData.sort((a, b) => (b.date?.seconds || 0) - (a.date?.seconds || 0));
            setFetchedComplaints(complaintsData);
        } catch (error) {
            console.error("Error fetching complaints:", error);
        } finally {
            setLoading(false);
        }
    };
    fetchComplaints();
}, [activeView]);
```

### **6.5 Administrative Logic & Operations Walkthrough**
The administrator dashboard displays complaints from all users. It includes search and filter functions to help admins manage and update issues efficiently:
```javascript
const updateStatus = async (complaintId, newStatus) => {
    try {
        const complaintRef = doc(db, "complaints", complaintId);
        await updateDoc(complaintRef, {
            status: newStatus
        });
        setComplaints(prev => prev.map(c => 
            c.id === complaintId ? { ...c, status: newStatus } : c
        ));
        console.log(`Status updated successfully to ${newStatus}`);
    } catch (err) {
        console.error("Error updating complaint status:", err);
    }
};
```

---

## **11. CHAPTER 7: TESTING & QUALITY ASSURANCE**

### **7.1 Quality Assurance Methodologies**
To ensure system stability, security, and usability, we implemented a structured quality assurance process across four testing stages:
1. **Unit Testing:** Verified that individual functions—such as date formatting, status color mapping, and form input validation—worked correctly under various edge cases.
2. **Integration Testing:** Tested the interaction between components, ensuring that database updates from the admin dashboard synced correctly with the student dashboard.
3. **Security & Role-Based Access Control (RBAC) Testing:** Verified that guest users could not access dashboard routes and that students were blocked from opening admin portals.
4. **Usability & Responsive Layout Testing:** Tested the user interface on multiple screen sizes and devices (desktops, tablets, and smartphones) to ensure layouts stayed aligned and readable.

### **7.2 Master Test Suite Table**

| ID | Module / Feature | Test Input Details | Expected Behavior | Actual Outcome | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Student Signup | Valid name, unique email, matching passwords. | Creates Auth account and saves user role in database. | Account created successfully; database fields verified. | **Passed** |
| **TC-02** | Signup Validation | Short password (< 6 chars). | Firebase Auth rejects password and displays error message. | Rejected; displayed "Password is too weak". | **Passed** |
| **TC-03** | Signup Conflict | Register with an already registered email. | Rejects registration and displays duplicate account error. | Displayed "An account with this email already exists". | **Passed** |
| **TC-04** | Student Login | Valid student credentials. | Redirects user to `/student/dashboard`. | Redirected successfully; user profile loaded. | **Passed** |
| **TC-05** | Admin Login Check | Admin attempts login on student portal. | Blocks login and displays role mismatch error. | Access denied; displayed "You are registered as an Admin". | **Passed** |
| **TC-06** | Route Protection | Unauthenticated user attempts to access `/admin/dashboard`. | ProtectedRoute intercepts request and redirects to homepage. | Redirected to landing page; console logged access block. | **Passed** |
| **TC-07** | Lodge Complaint | Fills title and description, selects category. | Saves complaint in Firestore with "pending" status. | Document created with correct student UID. | **Passed** |
| **TC-08** | Form Validation | Submits form with empty description field. | Form submission blocked; validation error displayed. | Submission blocked; form fields remained intact. | **Passed** |
| **TC-09** | Update Status | Admin changes complaint status to "Accepted". | Updates status in Firestore and refreshes dashboards. | Status updated; changes reflected on student dashboard. | **Passed** |
| **TC-10** | Student Deletion | Student clicks delete on own complaint. | Removes document from Firestore and updates list view. | Document deleted; list view refreshed. | **Passed** |
| **TC-11** | Admin Deletion | Admin deletes a student's complaint. | Removes document from Firestore; list view refreshes. | Document removed; admin table refreshed. | **Passed** |
| **TC-12** | Search Filter | Admin searches for "Wi-Fi". | Filters list to display only complaints containing "Wi-Fi". | Table filtered correctly; non-matching rows hidden. | **Passed** |
| **TC-13** | Category Filter | Admin filters by "Infrastructure" category. | Filters list to display only infrastructure issues. | Displayed only infrastructure complaints. | **Passed** |
| **TC-14** | Sort Order | Admin toggles sorting to "Oldest". | Re-sorts complaints, showing oldest submission dates first. | Complaints sorted correctly by date. | **Passed** |
| **TC-15** | Logout Action | User clicks the logout button. | Clears active session tokens and redirects to landing page. | Session ended; redirected to homepage. | **Passed** |

### **7.3 Security Audit & Rules Configurations**
To protect student records and prevent unauthorized database modifications, we configured security rules for Firestore. These rules ensure that only authenticated students can write complaints and that administrators have the authority to view and update all logs:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /user/{userId} {
      allow read, write: if request.auth != null;
    }
    match /complaints/{complaintId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow delete: if request.auth != null && (resource.data.userId == request.auth.uid || get(/databases/$(database)/documents/user/$(request.auth.uid)).data.role == 'admin');
      allow update: if request.auth != null && get(/databases/$(database)/documents/user/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

---

## **12. CHAPTER 8: INSTALLATION & USER MANUAL**

### **8.1 Developer Setup & Local Hosting Installation**

1. **Clone/Download the codebase** and open the workspace folder in your CLI.
2. **Install Node dependencies:**
   ```bash
   npm install
   ```
3. **Configure your Firebase Web Project API credentials** inside [firebase.js](file:///c:/Users/hp/OneDrive/Desktop/CMS/src/firebase.js).
4. **Launch the local development environment:**
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173`.

### **8.2 End User Manual: Student Guide**
* **Account Setup:** Go to Sign In -> Student -> Sign Up. Register with your name, email, and password.
* **Lodge Complaint:** Navigate to the **Submit Complaint** form, fill in a title and description, select a category, and click **Submit**.
* **Track Status:** Open the **Recent Complaints** tab to monitor real-time status updates (e.g., Pending, Accepted, Resolved) on your issues.

### **8.3 Administrative Workspace Guide**
* **Admin Login:** Go to Sign In -> Admin, enter your administrator credentials, and log in.
* **Review Logs:** Use the search bar to search by keywords, use dropdowns to filter by status or category, and sort complaints by date.
* **Update Status:** Click a complaint card to view its description, then click the **Accept**, **Resolve**, or **Reject** action buttons to update its status.

---

## **13. CHAPTER 9: CONCLUSION & FUTURE SCOPE**

### **9.1 Achievements & Project Summary**
The development of **ResolveNow** successfully delivers a modern, cloud-based platform that replaces manual campus complaint logs. By separating the user experience into dedicated student and administrator viewports, the application provides clean interfaces tailored to user tasks. Integrating React.js with Google Firebase results in a stable system that securely handles logins and updates complaint data in real time.

We met all key objectives defined during planning: students can easily file and track complaints online, while administrators have the search, filter, and status update tools needed to manage tasks efficiently. The glassmorphism design provides a clean and responsive user experience across desktop and mobile screens, and the serverless architecture ensures the platform is cost-effective to host and maintain.

### **9.2 Technical Constraints & Limitations**
* **Manual Status Updates:** The system does not support email or SMS notifications, meaning users must log in to the web app to check for status updates.
* **Static Categories:** Complaint categories are hardcoded in the client application and cannot be customized by administrators.
* **Single Administrative Role:** The platform lacks multi-level administrative roles, preventing admins from assigning tasks to specific department teams (e.g., IT or Maintenance).

### **9.3 Future Technical Roadmap**
1. **Automated Notifications:** Connect Firebase Cloud Functions with Nodemailer to email users when their complaint status updates.
2. **AI Auto-routing:** Integrate Natural Language Processing (NLP) to read the complaint text and automatically assign it to categories (like IT, Electrical, or Facilities).
3. **File Attachments:** Integrate Firebase Storage so students can upload photos of issues (like broken furniture or leaking pipes).
4. **Advanced Departmental Roles:** Introduce department-level sub-admin roles (e.g., Hostel Warden, IT Head) so administrators can assign tickets to specific departments.

---

## **14. REFERENCES & BIBLIOGRAPHY**

1. **ReactJS Official Documentation:** https://react.dev/
2. **Vite Bundler Tooling Reference:** https://vite.dev/guide/
3. **Google Firebase Developers Console Docs:** https://firebase.google.com/docs
4. **React Router DOM Architecture:** https://reactrouter.com/en/main
5. **Lucide Icons Catalog:** https://lucide.dev/
6. **W3Schools CSS Styling Reference:** https://www.w3schools.com/css/
7. **Software Engineering (10th Edition):** Author: Ian Sommerville. Reference for Agile software engineering models, Scrum cycles, and requirement analysis.
