# Experiment 2.3: Advanced JPA & Security SPA

## Aim
To design and optimize the frontend for a real-world Spring Boot application utilizing advanced JPA techniques, query optimizations, robust security configurations, and database versioning.

## Objective
This SPA simulates the client-side interaction with a complex backend architecture:
1. **Implement Entity Relationships**: Visualize and interact with `@OneToMany` and `@ManyToMany` mappings (e.g., Suppliers → Products → Categories).
2. **Optimize Queries**: Demonstrate the difference between Lazy fetching (N+1 problem) and Eager fetching (`JOIN FETCH`), as well as executing JPQL and Criteria API queries.
3. **Refresh Tokens & Secure Sessions**: Implement a robust JWT flow where short-lived access tokens (15s) are automatically and transparently refreshed using long-lived refresh tokens.
4. **Database Migration**: Visualize the state of the database schema via simulated Flyway/Liquibase migration history logs.

## Implementation Details
- **Tech Stack**: React, Vite, Material UI (`@mui/material`), `jwt-decode`.
- **UI Design**: A sleek, dark OLED minimalist design with cyan and rose neon accents. Uses subtle glassmorphism and snappy hover states.
- **Mock API (`api.js`)**: Features complex mock functions to simulate database latency, token generation, token rotation logic, and dynamic JSON relationship mapping.

## Setup
1. `npm install`
2. `npm run dev`
