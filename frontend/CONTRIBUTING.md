# Contributing to Visualizer Vault Frontend

Thank you for your interest in contributing to Visualizer Vault! We appreciate your time and effort in making this project better. This guide will help you get started with contributing to the frontend of Visualizer Vault.

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
   cd visualizer-vault/frontend
   ```
3. **Set up the upstream remote**:
   ```bash
   git remote add upstream https://github.com/original-owner/visualizer-vault.git
   ```

## Development Setup

1. **Install Node.js** (v16 or higher) from [nodejs.org](https://nodejs.org/)
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm start
   ```
   This will start the development server at `http://localhost:3000`
4. **Set environment variables**:
   ```bash
   cp .env.example .env
   ```
   Fill in the values for the environment variables in the `.env` file.

## Making Changes

1. **Create a new branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b bugfix/description-of-fix
   ```

2. **Make your changes** following the [coding standards](#coding-standards)


3. **Commit your changes** with a descriptive commit message:
   ```bash
   git add .
   git commit -m "feat: add new visualization component"
   # or
   git commit -m "fix: resolve navigation issue in navbar"
   ```

4. **Push your changes** to your fork:
   ```bash
   git push origin your-branch-name
   ```

## Pull Request Process

1. **Update your fork** with the latest changes from the main branch:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   git checkout your-branch-name
   git rebase main
   ```

2. **Resolve any merge conflicts** if they occur

3. **Push your changes** to your fork:
   ```bash
   git push -f origin your-branch-name
   ```

4. **Create a Pull Request** (PR) from your fork to the original repository's `main` branch

5. **Fill out the PR template** with details about your changes:
   - What changes were made
   - Why these changes are necessary
   - Any relevant screenshots or GIFs
   - Any breaking changes or considerations

6. **Request reviews** from maintainers

7. **Address any feedback** from code reviews

## Coding Standards

- Follow the existing code style and patterns
- Use meaningful variable and function names
- Write clear, concise comments for complex logic
- Keep components small and focused on a single responsibility
- Use functional components with hooks
- Follow the project's ESLint and Prettier configurations


## Reporting Issues

When creating an issue, please include:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected vs. actual behavior
- Browser/OS version if relevant
- Screenshots if applicable
