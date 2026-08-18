# Restful Booker API Test Framework

Automated API test suite built with Node.js Native Test Runner, TypeScript, and tsx. Designed with the API Object Model (AOM) pattern for maximum maintainability and clean assertions.

---

## Tech Stack

- **Runtime:** Node.js (v20+)
- **Language:** TypeScript
- **Test Runner:** Node.js Native Test Runner (`node:test`)
- **HTTP Client:** Native `fetch` with custom `FetchClient` wrapper
- **CI/CD:** GitHub Actions

---

## Getting Started

### 1. Prerequisites

Ensure you have **Node.js v20.0.0 or higher** installed.

### 2. Installation

**Clone the repository and install dependencies:**

```bash
git clone <repository-url>
cd <repository-folder>
npm ci

```

### 3. Environment Setup

Create a `.env` file in the root directory based on the `.env-template.md` file

## Running Tests

| Command              | Description                                                                    |
| :------------------- | :----------------------------------------------------------------------------- |
| `npm run test:local` | Runs all API tests locally using your `.env` file                              |
| `npm test`           | Runs all API tests (used in CI/CD pipeline using system environment variables) |

## CI/CD Pipeline

This project uses **GitHub Actions** for Continuous Integration.

- **Trigger:** Runs automatically on every **Pull Request** targeting the `main` branch.
- **Workflow:** Defined in `.github/workflows/api-tests.yml`.
- **Secrets:** `BASE_URL`, `DEFAULT_USERNAME`, and `DEFAULT_PASSWORD` are securely injected into the runner via GitHub Repository Secrets.

## Project Structure

```text
.
├── .github/
│   └── workflows/
│       └── api-tests.yml        # GitHub Actions workflow for automated PR testing
├── src/
│   ├── api/                     # API Object Model (Service layer)
│   │   ├── auth.service.ts      # Service handling authentication requests
│   │   └── booking.service.ts   # Service handling booking endpoint requests
│   ├── config/                  # Configuration setup
│   │   └── config.ts            # Centralized fail-fast environment variables config
│   ├── constants/               # Project constants
│   │   └── api.constants.ts     # Endpoints and HTTP status code constants
│   ├── tests/                   # Automated test suites
│   │   └── booking.test.ts      # End-to-end API test scenarios for bookings
│   ├── tests-data/              # Test data and fixtures
│   │   └── booking.data.ts      # Payload builders and static test datasets
│   ├── types/                   # TypeScript type definitions
│   │   └── common.ts            # Shared interfaces and data models
│   └── utils/                   # Framework core utilities
│       ├── assertions.util.ts   # Custom strict assertion functions with formatted logs
│       └── fetchClient.util.ts  # Generic HTTP client wrapper over native fetch
├── .env                         # Local environment variables file (git-ignored)
├── .env-template.md             # Template detailing required environment variables
├── .gitignore                   # Specifies files and folders untracked by Git
├── package.json                 # Project dependencies, metadata, and test scripts
├── package-lock.json            # Locked dependency tree versioning
├── README.md                    # Framework documentation and setup instructions
└── tsconfig.json                # TypeScript compiler configuration settings
```
