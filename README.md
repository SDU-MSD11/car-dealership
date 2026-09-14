# Car Dealership

An Expo React Native application built with TypeScript.

## Prerequisites

- Node.js 22.13.x or later
- npm
- Expo-compatible development tooling for the platform you want to run

## Setup

Install the project dependencies:

```bash
npm ci
```

## Development

Start the Expo development server:

```bash
npm start
```

Run the project directly for a specific platform:

```bash
npm run android
npm run ios
npm run web
```

When the development server is running, use the Expo CLI prompts to open the application on a connected device, emulator, simulator, or web browser.

## Validation

Run the TypeScript checks:

```bash
npm run typecheck
```

Run the CI test suite with coverage:

```bash
npm run test:ci
```

## Project Structure

```text
src/
├── app/          Expo Router routes and layouts
├── components/   Shared components
├── features/     Feature-specific components, stores, and exports
├── hooks/        Shared React hooks
├── store/        Global state stores
└── utils/        Shared utility modules

__tests__/        Tests that mirror the src/ structure
assets/           Application assets
```

Routes and layouts belong in `src/app`. Feature-specific code belongs in `src/features`, while reusable code belongs in the shared `src/components`, `src/hooks`, `src/store`, or `src/utils` directories.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
