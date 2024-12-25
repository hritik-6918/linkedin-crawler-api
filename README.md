# LinkedIn Crawler and API System

This project is designed to crawl job postings and LinkedIn profiles, store the data in a database, and provide APIs to fetch relevant profiles and jobs based on input criteria.

---

## **Table of Contents**

1. [Introduction](#introduction)
2. [System Design](#system-design)
3. [Setup Instructions](#setup-instructions)
4. [Web Crawlers](#web-crawlers)
5. [Database Schema](#database-schema)
6. [API Endpoints](#api-endpoints)
7. [Algorithms](#algorithms)
8. [Scalability Considerations](#scalability-considerations)
9. [Limitations and Assumptions](#limitations-and-assumptions)

---

## **Introduction**

This system performs the following tasks:

1. Crawls job postings and LinkedIn profiles.
2. Stores the crawled data in a MongoDB database.
3. Exposes APIs to fetch relevant jobs and profiles based on user inputs.

### Key Features:

- Custom-built crawlers to extract meaningful data fields.
- Efficient NoSQL database schema for real-time querying.
- APIs with scoring algorithms for ranking profiles and jobs.

---

## **System Design**

### Components:

1. **Crawlers**: Extract job postings and LinkedIn profiles.
2. **Database**: MongoDB to store structured data.
3. **APIs**: Built with Express.js to fetch relevant data.

### Data Flow:

1. Crawlers fetch and store data in the database.
2. APIs query the database based on user inputs.
3. Custom algorithms rank and return relevant results.

---

## **Setup Instructions**

### Prerequisites:

- Node.js installed.
- MongoDB installed locally or on the cloud.

### Steps:

1. Clone the repository.
   ```bash
   git clone <repository-url>
   cd linkedin-crawler-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start MongoDB:
   ```bash
   mongod
   ```
4. Run the server:
   ```bash
   npm start
   ```
5. Test the APIs using Postman or a browser:
   - `http://localhost:3000/profiles`
   - `http://localhost:3000/jobs`

---

## **Web Crawlers**

### Job Crawler:

Extracts job postings with the following fields:

- Job Title
- Company
- Location
- Skills Required
- Job Description

### Profile Crawler:

Extracts LinkedIn profiles with the following fields:

- Name
- Title
- Skills
- Location
- Current Company

### Anti-Bot Mechanisms:

- **User-Agent Rotation**: Uses random user-agents to mimic real users.
- **Rate Limiting**: Crawlers are throttled to respect website policies.

---

## **Database Schema**

### Job Schema:

```json
{
  "jobTitle": "String",
  "company": "String",
  "location": "String",
  "skillsRequired": ["String"],
  "jobDescription": "String"
}
```

### Profile Schema:

```json
{
  "name": "String",
  "title": "String",
  "skills": ["String"],
  "location": "String",
  "currentCompany": "String"
}
```

### Indexing:

- Index on `location` and `skills` fields for faster queries.

---

## **API Endpoints**

### **GET /profiles**

#### Input:

- `designation` (String)
- `location` (String)
- `company` (String)

#### Output:

- A list of 5-10 LinkedIn profiles with match scores.

#### Match Scoring:

- Location Match: +30 points
- Designation Match: +30 points
- Company Match: +40 points

### **GET /jobs**

#### Input:

- `location` (String)
- `designation` (String)

#### Output:

- A list of 5-10 job postings with match scores.

#### Match Scoring:

- Location Match: +30 points
- Designation Match: +70 points

---

## **Algorithms**

### Matching Algorithm:

1. **Profiles**:

   ```javascript
   function calculateMatchScore(input, profile) {
     let score = 0;
     if (input.location && profile.location === input.location) score += 30;
     if (input.designation && profile.title.includes(input.designation))
       score += 30;
     if (input.company && profile.currentCompany === input.company) score += 40;
     return score;
   }
   ```

2. **Jobs**:
   ```javascript
   function calculateMatchScore(input, job) {
     let score = 0;
     if (input.location && job.location === input.location) score += 30;
     if (input.designation && job.jobTitle.includes(input.designation))
       score += 70;
     return score;
   }
   ```

---

## **Scalability Considerations**

1. **Crawling**:

   - Use multiple crawlers running concurrently.
   - Implement distributed crawling with task queues (e.g., RabbitMQ).

2. **API Requests**:

   - Optimize queries with indexing.
   - Scale horizontally using load balancers (e.g., NGINX).
   - Implement caching for frequent queries.

3. **Database**:
   - Use sharding to handle large datasets.
   - Optimize schema for read-heavy operations.

---

## **Limitations and Assumptions**

1. **Compliance**:

   - Crawling is limited to publicly accessible data.
   - Follows LinkedIn's robots.txt guidelines.

2. **Data Accuracy**:

   - Accuracy depends on the structure of LinkedIn pages.
   - Changes to LinkedIn's HTML might break crawlers.

3. **Match Scoring**:

   - Simple algorithm used; could be enhanced with machine learning.

4. **Concurrency**:
   - System handles up to 1000 QPS with current design.
   - May require further optimization for higher loads.

---
