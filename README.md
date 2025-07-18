# MCP Code Audit Server

> AI-powered code auditing using local Ollama models with Model Context Protocol (MCP) integration

A comprehensive TypeScript MCP server that performs intelligent code audits for security, completeness, performance, quality, architecture, testing, and documentation using local AI models via Ollama.

## 🚀 Features

### Multi-Dimensional Code Analysis

- **Security**: OWASP Top 10 vulnerabilities, authentication flaws, injection attacks
- **Completeness**: TODOs, empty functions, missing error handling, unfinished implementations
- **Performance**: Algorithmic complexity, memory leaks, optimization opportunities
- **Quality**: Code smells, SOLID principles, maintainability issues
- **Architecture**: Design patterns, separation of concerns, dependency management
- **Testing**: Testability issues, missing coverage, race conditions
- **Documentation**: API docs, code comments, compliance standards

### Intelligent Model Selection

- **Multi-model support**: CodeLlama, DeepSeek-Coder, StarCoder2, Granite-Code, Qwen2.5-Coder
- **Specialization-based routing**: Different models for different audit types
- **Fallback strategies**: Automatic model fallback on failures
- **Performance optimization**: Fast vs. thorough modes

### Advanced Features

- **Context-aware analysis**: Framework-specific checks (React, Express, Django, etc.)
- **Priority-based auditing**: Fast mode (security + completeness) for rapid feedback
- **Language support**: 10+ programming languages with language-specific rules
- **Configurable severity**: Customizable issue severity thresholds
- **Auto-fix suggestions**: Confidence-scored fix recommendations
- **Complexity analysis**: Cyclomatic, cognitive, and maintainability metrics

## 📋 Requirements

- **Node.js**: 18.0.0 or higher
- **Ollama**: Latest version ([Download](https://ollama.ai))
- **RAM**: 8GB+ recommended (for larger models)
- **Storage**: 10GB+ for essential models, 50GB+ for comprehensive setup

## 🛠️ Installation

### Global Installation (Recommended)

```bash
# Install globally from npm
npm install -g @moikas/code-audit-mcp

# Run interactive setup (includes MCP configuration)
code-audit setup

# Or setup with automatic MCP configuration
code-audit setup --auto

# Start the MCP server
code-audit start
```

### Development Installation

```bash
# Clone the repository
git clone <repository-url>
cd code-audit-mcp

# Install dependencies
npm install

# Build the package
npm run build

# Test locally
npm run test-local
```

### 🚀 Development Setup

#### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher
- **Git**: For version control and pre-commit hooks
- **VS Code**: Recommended IDE (see `.vscode/extensions.json` for extensions)

#### Initial Setup

```bash
# Clone and enter directory
git clone https://github.com/warrengates/code-audit-mcp.git
cd code-audit-mcp

# Install dependencies (includes husky setup)
npm install

# Build the project
npm run build

# Run quality checks
npm run quality-check

# Test the setup
npm run test-local
```

#### Pre-commit Hooks

This project uses Husky and lint-staged for automatic code quality checks:

- **ESLint**: Checks code for errors and style issues
- **Prettier**: Formats code consistently
- **TypeScript**: Type checks all TypeScript files

Pre-commit hooks run automatically on `git commit`. To manually run quality checks:

```bash
# Run all quality checks
npm run quality-check

# Fix auto-fixable issues
npm run quality-fix

# Individual checks
npm run lint          # ESLint check
npm run format:check  # Prettier check
npm run type-check    # TypeScript check
```

The setup script will:

1. ✅ Check prerequisites (Node.js, npm, tsx)
2. 🩺 Verify Ollama installation and health
3. 📦 Install recommended AI models
4. 🧪 Test MCP server functionality
5. 📝 Generate example configuration

### Manual Setup

If you prefer manual installation:

```bash
# Install dependencies
npm install

# Install essential models
ollama pull codellama:7b
ollama pull granite-code:8b

# Build the project
npm run build

# Test the server
npm run dev
```

## 🎯 Usage

### CLI Commands

```bash
# Interactive setup wizard
code-audit setup

# Start MCP server (foreground)
code-audit start

# Start as background daemon
code-audit start --daemon

# Stop running server
code-audit stop

# Check system health
code-audit health

# Manage AI models
code-audit models --list
code-audit models --pull codellama:7b

# Configuration management
code-audit config --show
code-audit config --set ollama.host=http://remote:11434

# MCP server management
code-audit mcp status
code-audit mcp configure
code-audit mcp remove

# Check for updates
code-audit update
```

### Development Mode

```bash
# Development mode with hot reload
npm run dev

# Build TypeScript
npm run build

# Test package locally
npm run test-local
```

### MCP Integration

#### Automatic Configuration (Recommended)

The setup wizard now automatically configures code-audit as an MCP server:

```bash
# Configure during setup
code-audit setup

# Or configure after installation
code-audit mcp configure
```

This will automatically add code-audit to:

- Claude Desktop: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Claude Code (Global): `~/.config/claude/mcp-settings.json`
- Claude Code (Project): `.claude/mcp-settings.json`

#### Manual Configuration

If you prefer manual configuration, add to your MCP configuration:

```json
{
  "mcpServers": {
    "code-audit": {
      "command": "code-audit",
      "args": ["start", "--stdio"],
      "env": {}
    }
  }
}
```

For more details, see:

- [MCP Configuration Guide](./kb/docs/MCP_SERVERS_CONFIG.md)
- [Claude Code Integration](./kb/docs/CLAUDE_CODE_INTEGRATION.md)

### Available Tools

#### `audit_code` - Main audit tool

```json
{
  "name": "audit_code",
  "arguments": {
    "code": "function processPayment(amount) {\n  const query = `SELECT * FROM users WHERE id = ${userId}`;\n  // TODO: implement payment logic\n}",
    "language": "javascript",
    "auditType": "all",
    "priority": "thorough",
    "context": {
      "framework": "express",
      "environment": "production",
      "performanceCritical": true,
      "projectType": "api"
    }
  }
}
```

**Parameters:**

- `code` (required): Code to audit
- `language` (required): Programming language
- `auditType`: `security` | `completeness` | `performance` | `quality` | `architecture` | `testing` | `documentation` | `all`
- `priority`: `fast` (security + completeness only) | `thorough` (all audit types)
- `context`: Additional context for framework-specific analysis
- `maxIssues`: Limit number of issues returned (default: 50)

#### `health_check` - Server health status

```json
{
  "name": "health_check",
  "arguments": {}
}
```

#### `list_models` - Available AI models

```json
{
  "name": "list_models",
  "arguments": {}
}
```

## 🔧 Configuration

### Server Configuration

Create a configuration file or use environment variables:

```typescript
const config = {
  name: 'code-audit-mcp',
  version: '1.0.0',
  ollama: {
    host: 'http://localhost:11434',
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000,
  },
  auditors: {
    security: {
      enabled: true,
      severity: ['critical', 'high', 'medium'],
      rules: {
        sql_injection: true,
        xss_vulnerability: true,
        hardcoded_secret: true,
      },
    },
    performance: {
      enabled: true,
      severity: ['high', 'medium', 'low'],
      thresholds: {
        cyclomaticComplexity: 10,
        nestingDepth: 4,
      },
    },
  },
  logging: {
    level: 'info',
    enableMetrics: true,
    enableTracing: false,
  },
};
```

### Auditor Configuration

Each auditor can be individually configured:

```typescript
{
  enabled: boolean;              // Enable/disable auditor
  severity: Severity[];          // Severity levels to include
  rules: Record<string, boolean>; // Specific rules to enable/disable
  thresholds: Record<string, number>; // Numeric thresholds
}
```

### Model Selection

Configure model preferences for different scenarios:

```typescript
// Performance-critical code
const performanceConfig = {
  strategy: 'PerformanceModelSelectionStrategy', // Always prefer fast models
  fallbackModels: ['codellama:7b', 'granite-code:8b'],
};

// Quality-focused analysis
const qualityConfig = {
  strategy: 'QualityModelSelectionStrategy', // Always prefer accurate models
  fallbackModels: ['deepseek-coder:33b', 'codellama:13b'],
};
```

## 🤖 Supported Models

### Essential Models (Recommended)

- **CodeLlama 7B**: Fast, general-purpose code analysis
- **Granite Code 8B**: Excellent for security analysis

### Comprehensive Setup

- **CodeLlama 13B**: Better accuracy for complex analysis
- **DeepSeek-Coder 6.7B**: Superior performance analysis
- **StarCoder2 7B**: Specialized for testing analysis
- **Qwen2.5-Coder 7B**: Good for documentation analysis

### Full Setup (Advanced)

- **DeepSeek-Coder 33B**: Highest accuracy (requires 16GB+ RAM)
- **StarCoder2 15B**: Advanced testing and architecture analysis
- **Llama 3.1 8B**: Excellent for documentation

### Model Installation

```bash
# Essential models (~7GB)
ollama pull codellama:7b
ollama pull granite-code:8b

# Comprehensive setup (~30GB)
ollama pull codellama:13b
ollama pull deepseek-coder:6.7b
ollama pull starcoder2:7b
ollama pull qwen2.5-coder:7b

# Full setup (~80GB)
ollama pull deepseek-coder:33b
ollama pull starcoder2:15b
ollama pull llama3.1:8b
```

## 🌐 Language Support

### Fully Supported

- **JavaScript/TypeScript**: React, Node.js, Express-specific checks
- **Python**: Django, Flask, FastAPI-specific analysis
- **Java**: Spring Boot, security-focused analysis
- **Go**: Goroutine safety, performance patterns
- **Rust**: Memory safety, performance optimization

### Well Supported

- **C#**: .NET patterns, security analysis
- **PHP**: Laravel, WordPress security checks
- **Ruby**: Rails-specific patterns
- **Swift**: iOS-specific patterns
- **Kotlin**: Android-specific analysis

### Basic Support

- **C/C++**: Memory safety, performance
- **SQL**: Injection detection, query optimization
- **HTML/CSS**: XSS prevention, performance
- **Docker**: Security configuration
- **YAML/JSON**: Configuration validation

## 📊 Example Output

```json
{
  "requestId": "audit_12345",
  "issues": [
    {
      "id": "sql_injection_2",
      "location": { "line": 2, "column": 15 },
      "severity": "critical",
      "type": "sql_injection",
      "category": "security",
      "title": "SQL injection vulnerability in query construction",
      "description": "Direct string interpolation in SQL query allows SQL injection attacks",
      "suggestion": "Use parameterized queries or prepared statements",
      "confidence": 0.95,
      "fixable": true,
      "ruleId": "SEC001",
      "documentation": "OWASP Top 10: A03:2021 – Injection"
    },
    {
      "id": "todo_3",
      "location": { "line": 3 },
      "severity": "medium",
      "type": "todo_comment",
      "category": "completeness",
      "title": "TODO comment indicates incomplete implementation",
      "description": "Found TODO comment: // TODO: implement payment logic",
      "suggestion": "Implement the missing functionality or remove the TODO comment",
      "confidence": 1.0,
      "fixable": false,
      "ruleId": "COMP001"
    }
  ],
  "summary": {
    "total": 2,
    "critical": 1,
    "high": 0,
    "medium": 1,
    "low": 0,
    "info": 0,
    "byCategory": {
      "security": 1,
      "completeness": 1
    }
  },
  "suggestions": {
    "autoFixable": [
      /* fixable issues */
    ],
    "priorityFixes": [
      /* critical/high severity */
    ],
    "quickWins": [
      /* low effort, high impact */
    ],
    "technicalDebt": [
      /* long-term improvements */
    ]
  },
  "metrics": {
    "duration": 1250,
    "modelResponseTime": 800,
    "coverage": {
      "linesAnalyzed": 15,
      "functionsAnalyzed": 1,
      "complexity": 3
    }
  }
}
```

## ⚡ Performance Optimization

### Fast Mode for Rapid Development

```json
{
  "auditType": "all",
  "priority": "fast" // Only security + completeness
}
```

### Context-Aware Analysis

```json
{
  "context": {
    "framework": "react",
    "environment": "production",
    "performanceCritical": true,
    "projectType": "web"
  }
}
```

### Caching Configuration

```typescript
{
  performance: {
    maxConcurrentAudits: 3,
    cacheEnabled: true,
    cacheTtl: 300  // 5 minutes
  }
}
```

## 🔍 Audit Types Deep Dive

### Security Audit

- **OWASP Top 10 Coverage**: SQL injection, XSS, authentication flaws
- **Language-specific**: Prototype pollution (JS), pickle usage (Python)
- **Framework-specific**: CSRF protection (Express), SQL injection (Django)

### Performance Audit

- **Algorithmic Analysis**: O(n²) detection, nested loop optimization
- **Memory Management**: Leak detection, object pooling opportunities
- **Database Optimization**: N+1 queries, missing indexes
- **Async Patterns**: Blocking operations, Promise handling

### Quality Audit

- **Code Smells**: Long methods, large classes, duplicate code
- **SOLID Principles**: SRP, OCP, LSP, ISP, DIP violations
- **Maintainability**: Cyclomatic complexity, cognitive load
- **Naming Conventions**: Consistency, clarity, domain alignment

## 🛠️ Development

### VS Code Setup

This project includes comprehensive VS Code configuration for optimal development experience:

#### Recommended Extensions

Install recommended extensions for the best experience:

```bash
# Install all recommended extensions
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension usernamehw.errorlens
code --install-extension yoavbls.pretty-ts-errors
```

Or open VS Code and accept the workspace recommendations popup.

#### Workspace Settings

The `.vscode/settings.json` includes:

- **Auto-formatting**: Format on save with Prettier
- **Linting**: Real-time ESLint feedback
- **TypeScript**: Enhanced IntelliSense and error checking
- **Import management**: Auto-import and path intellisense
- **Git integration**: Pre-configured for the workflow

#### Debugging

Use the included debug configurations:

1. **Debug Server**: Launch and debug the MCP server
2. **Debug CLI**: Debug CLI commands
3. **Debug Tests**: Step through test execution

Press `F5` or use the Debug panel to start debugging.

### Project Structure

```
code-audit-mcp/
├── src/
│   ├── server.ts              # Main MCP server
│   ├── types.ts               # TypeScript interfaces
│   ├── auditors/              # Audit implementations
│   │   ├── base.ts           # Base auditor class
│   │   ├── security.ts       # Security auditor
│   │   ├── completeness.ts   # Completeness auditor
│   │   ├── performance.ts    # Performance auditor
│   │   └── ...
│   ├── ollama/               # Ollama integration
│   │   ├── client.ts         # HTTP client wrapper
│   │   ├── models.ts         # Model configuration
│   │   └── prompts.ts        # Audit prompts
│   └── utils/                # Utilities
│       ├── codeParser.ts     # Code parsing
│       ├── complexity.ts     # Complexity analysis
│       └── logger.ts         # Logging utilities
├── cli/
│   └── setup.ts              # Setup script
├── .vscode/                  # VS Code configuration
│   ├── settings.json        # Workspace settings
│   ├── extensions.json      # Recommended extensions
│   └── launch.json          # Debug configurations
├── .husky/                   # Git hooks
│   └── pre-commit           # Pre-commit checks
└── tests/                    # Test suites
```

### Building and Testing

```bash
# Development
npm run dev                   # Start with hot reload
npm run build                 # Compile TypeScript
npm run lint                  # Run ESLint
npm run format               # Format with Prettier

# Testing
npm test                     # Run test suite
npm run test:watch          # Watch mode
npm run test:coverage       # Coverage report

# Production
npm run start               # Start production server
```

### Adding Custom Auditors

1. Create a new auditor class extending `BaseAuditor`:

```typescript
import { BaseAuditor } from './base.js';

export class CustomAuditor extends BaseAuditor {
  constructor(config, ollamaClient, modelManager) {
    super('custom', config, ollamaClient, modelManager);
  }

  // Override methods for custom logic
  protected async postProcessIssues(rawIssues, request, language) {
    // Custom post-processing
    return super.postProcessIssues(rawIssues, request, language);
  }
}
```

2. Register in `auditors/index.ts`:

```typescript
import { CustomAuditor } from './custom.js';

export const auditorClasses = {
  // ... existing auditors
  custom: CustomAuditor,
};
```

3. Add configuration:

```typescript
const config = {
  auditors: {
    custom: {
      enabled: true,
      severity: ['high', 'medium'],
      rules: {},
    },
  },
};
```

## 🐛 Troubleshooting

### Common Issues

#### Ollama Connection Failed

```bash
# Check if Ollama is running
ollama list

# Start Ollama service
ollama serve

# Check port availability
curl http://localhost:11434/api/tags
```

#### Model Not Found

```bash
# List installed models
ollama list

# Install missing model
ollama pull codellama:7b

# Check model availability in server
curl -X POST http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{"model": "codellama:7b", "prompt": "test"}'
```

#### TypeScript Compilation Errors

```bash
# Clear build cache
rm -rf dist/
rm -rf node_modules/
npm install

# Check TypeScript configuration
npx tsc --noEmit

# Update dependencies
npm update
```

#### Memory Issues

```bash
# Check available memory
free -h

# Use smaller models
ollama pull codellama:7b  # Instead of codellama:34b

# Reduce concurrent audits
{
  "performance": {
    "maxConcurrentAudits": 1
  }
}
```

### Performance Tuning

#### Model Selection Optimization

```typescript
// For CI/CD environments - prioritize speed
const ciConfig = {
  strategy: 'PerformanceModelSelectionStrategy',
  priority: 'fast',
};

// For code review - prioritize accuracy
const reviewConfig = {
  strategy: 'QualityModelSelectionStrategy',
  priority: 'thorough',
};
```

#### Resource Management

```typescript
{
  ollama: {
    timeout: 60000,        // Increase for large files
    retryAttempts: 5,      // More retries for reliability
    healthCheckInterval: 30000  // More frequent health checks
  },
  performance: {
    maxConcurrentAudits: 2,    // Reduce for limited RAM
    cacheEnabled: true,        // Enable for repeated analysis
    cacheTtl: 600             // 10-minute cache
  }
}
```

## 📚 API Reference

### Tool Schemas

#### audit_code

```typescript
interface AuditRequest {
  code: string; // Required: Code to audit
  language: string; // Required: Programming language
  auditType: AuditType; // Optional: Default 'all'
  file?: string; // Optional: File path for context
  context?: AuditContext; // Optional: Additional context
  priority?: 'fast' | 'thorough'; // Optional: Default 'thorough'
  maxIssues?: number; // Optional: Default 50
  includeFixSuggestions?: boolean; // Optional: Default true
}
```

#### Response Format

```typescript
interface AuditResult {
  requestId: string;
  issues: AuditIssue[];
  summary: AuditSummary;
  coverage: AuditCoverage;
  suggestions: AuditSuggestions;
  metrics: AuditMetrics;
  model: string;
  timestamp: string;
  version: string;
}
```

### Error Codes

| Code                     | Description             | Resolution                       |
| ------------------------ | ----------------------- | -------------------------------- |
| `INVALID_REQUEST`        | Malformed request       | Check required parameters        |
| `CODE_TOO_LARGE`         | Code exceeds size limit | Split into smaller chunks        |
| `LANGUAGE_NOT_SUPPORTED` | Unsupported language    | Use supported language           |
| `NO_AVAILABLE_MODEL`     | No suitable model found | Install required models          |
| `OLLAMA_UNAVAILABLE`     | Ollama service down     | Start Ollama service             |
| `MODEL_NOT_FOUND`        | Requested model missing | Pull model with `ollama pull`    |
| `GENERATION_FAILED`      | AI generation failed    | Check model health, retry        |
| `AUDIT_FAILED`           | General audit failure   | Check logs, verify configuration |

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/your-username/code-audit-mcp.git
cd code-audit-mcp

# Install dependencies
npm install

# Run in development mode
npm run dev

# Run tests
npm test

# Submit a pull request
```

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration
- **Prettier**: Automated formatting
- **Testing**: Jest with >80% coverage
- **Documentation**: JSDoc for all public APIs

### 📚 Development Documentation

- **[Contributing Guidelines](CONTRIBUTING.md)**: How to contribute to the project
- **[VS Code Setup](docs/VSCODE-SETUP.md)**: Optimal IDE configuration
- **[Pre-commit Hooks](docs/PRE-COMMIT-HOOKS.md)**: Automated quality checks
- **[Troubleshooting](docs/TROUBLESHOOTING.md)**: Solutions to common issues

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- **Anthropic** for the Model Context Protocol specification
- **Ollama** for local AI model serving
- **Meta** for CodeLlama models
- **DeepSeek** for specialized coding models
- **BigCode** for StarCoder models

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/discussions)
- **Documentation**: [Wiki](https://github.com/your-repo/wiki)

---

**Built with ❤️ for better code quality through AI-powered analysis**
