# Library Structure

This directory contains shared utilities, constants, types, and other reusable components organized by domain.

## Structure

```
src/lib/
├── constants/           # Application constants organized by domain
│   ├── index.ts        # Re-exports all constants for easy importing
│   ├── prompts.ts      # AI prompts and templates
│   └── sample-data.ts  # Sample data used for testing and examples
├── types/              # Shared TypeScript types
│   └── index.ts        # Common interfaces and types
└── README.md           # This file
```

## Usage

### Constants

```typescript
// Import all constants
import {
  FORMAT_AND_SUMMARIZE_JOB_POSTING,
  PHUC_RESUME_PLAIN_TEXT,
} from "./lib/constants";

// Import from specific modules
import { FORMAT_AND_SUMMARIZE_JOB_POSTING } from "./lib/constants/prompts";
import { PHUC_RESUME_PLAIN_TEXT } from "./lib/constants/sample-data";
```

### Types

```typescript
import { RawCsvRow, SynthesizedJobPosting } from "./lib/types";
```

## Design Principles

- **Domain separation**: Constants and types are organized by their domain/purpose
- **Easy imports**: The index files provide convenient re-exports
- **Clear naming**: File and export names clearly indicate their purpose
- **Scalability**: Structure supports adding new domains/modules easily
