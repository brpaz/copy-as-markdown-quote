# Contributing

## Pre-requisites

Before starting, make sure to have [NodeJS](https://nodejs.org/en/download/package-manager) >= 21 and [PNPM](https://pnpm.io/installation) installed on your machine.

## Getting started

### Clone the repository

```sh
git clone https://github.com/brpaz/copy-as-markdown-quote
cd copy-as-markdown-quote
```

### Install dependencies

```sh
pnpm i
```

### Start the development server

```sh
pnpm run dev
```

By default, this will launch a Chrome browser with the extension. If you want to use Firefox run:

```sh
TARGET=firefox pnpm run dev
```

### Build the application

To build the application for distrubtion run:

- **Google Chrome** - `TARGET=chrome pnpm build`

- **Firefox** - `TARGET=firefox pnpm build`

The build artifact will be placed in `dist` folder.

