# Apex Fitness Club Landing Page - React + Tailwind CSS

This is an ultra-premium, cinematic landing page for **Apex Fitness Club**, a luxury fitness club in Miami, Florida. The design is engineered to replicate the aesthetics of Awwwards-winning websites (Apple × Nike × Equinox styles).

## Key Features
*   **Fully Interactive Biometric Calculator**: Direct computations for body mass index (BMI) status and daily targeted calories based on goals (fat loss, maintenance, muscle building) and activity factors.
*   **Before/After Transformation Slider**: A custom drag-and-reveal slider using reactive states.
*   **Filterable Live Class Timetable**: Filter classes dynamically by category (Strength, Cardio, Yoga, Recovery).
*   **Pricing Cycle Comparison**: Seamlessly toggle between monthly and annual plans.
*   **Masonry Gallery & Lightbox**: A fluid grid of modern gym scenes, click-to-zoom overlays.
*   **Virtual Tour Hotspots**: Clickable virtual points of interest showcasing specialized equipment and amenities.
*   **Form Validation & Confetti Blast**: Real-time validation checks for reservations, complete with a celebratory canvas-confetti explosion on success.
*   **Adaptive Glassmorphism & Mouse-Tracking Glow**: Dynamic layout elements with custom gradients that respond to mouse coordinate glow paths.

---

## Getting Started

### 1. Instant Static Preview (Zero-Setup)
We have provided a fully compile-free, interactive preview file.
*   **Action**: Double-click [index.html](file:///c:/Users/nayak/Desktop/landing%20pages/gym/index.html) at the project root.
*   **Why**: It references React, Tailwind, and Babel libraries over high-speed CDNs. All interactive widgets (calculator, schedule filters, before/after slider, modal states) work instantly in any web browser without installing Node.js dependencies.

### 2. Full React + Vite Development Environment
To run the project in a modular React component developer layout:

1.  **Install Node.js dependencies**:
    ```bash
    npm install
    ```
2.  **Launch the local Vite server**:
    ```bash
    npm run dev
    ```
3.  **Build production-ready static assets**:
    ```bash
    npm run build
    ```

---

## File Architecture
*   [index.html](file:///c:/Users/nayak/Desktop/landing%20pages/gym/index.html) - Zero-setup interactive browser preview.
*   [package.json](file:///c:/Users/nayak/Desktop/landing%20pages/gym/package.json) - Node environment packages.
*   [tailwind.config.js](file:///c:/Users/nayak/Desktop/landing%20pages/gym/tailwind.config.js) - Color overrides, custom fonts (`Syne` / `Outfit`), keyframes, and neon shadow configurations.
*   [src/index.css](file:///c:/Users/nayak/Desktop/landing%20pages/gym/src/index.css) - Global styling, scrollbar, neon styling, glassmorphism utilities.
*   [src/App.jsx](file:///c:/Users/nayak/Desktop/landing%20pages/gym/src/App.jsx) - Main React application containing all 18 sections and interactive widgets.
*   [src/main.jsx](file:///c:/Users/nayak/Desktop/landing%20pages/gym/src/main.jsx) - DOM mounting entry point.
