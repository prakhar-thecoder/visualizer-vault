# Contributing to Visualizer Vault Backend

Thank you for your interest in contributing to the Visualizer Vault backend! Your contributions help make this project better for everyone. This guide will help you get started with contributing to the backend server.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Reporting Issues](#reporting-issues)

## Getting Started

1. **Fork the repository** to your GitHub account
2. **Clone your fork** to your local machine:
   ```bash
   git clone https://github.com/your-username/visualizer-vault.git
   cd visualizer-vault/backend
   ```
3. **Set up the upstream remote**:
   ```bash
   git remote add upstream https://github.com/original-owner/visualizer-vault.git
   ```

## Development Setup

1. **Install Node.js** (v18 or higher) from [nodejs.org](https://nodejs.org/)
2. **Install MongoDB** locally or set up a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration.

5. **Start the development server**:
   ```bash
   npm run dev
   ```
   This will start the server at `http://localhost:3000` with nodemon for hot-reloading.

## Making Changes

1. **Create a new branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b bugfix/description-of-fix
   ```

2. **Make your changes** following the coding standards below

3. **Commit your changes** with a descriptive message:
   ```bash
   git commit -m "Add your descriptive commit message here"
   ```

## Pull Request Process

1. **Push your changes** to your fork:
   ```bash
   git push origin your-branch-name
   ```

2. **Open a Pull Request** (PR) to the `main` branch

3. **Ensure the PR description** clearly describes the problem and solution

4. **Address any code review feedback**

## Coding Standards

- Follow the existing code style (2-space indentation, semicolons)
- Write clear, concise commit messages
- Keep functions small and focused
- Use async/await instead of callbacks
- Follow RESTful API conventions

## Reporting Issues

When reporting issues, please include:
- A clear title and description
- Steps to reproduce the issue
- Expected vs. actual behavior
- Any relevant error messages
- Environment details (Node.js version, OS, etc.)

## Code of Conduct

This project adheres to the [Contributor Covenant](https://www.contributor-covenant.org/). By participating, you are expected to uphold this code.
