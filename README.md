# Playwright for Qsystems test

This repository uses Playwright for end-to-end testing.

## 🏃 Running Tests Locally

### Prerequisites

- Node.js v18 or higher
- npm or yarn

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/Bryn1roll/qsystems-test.git
   cd qsystems-test
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Install Playwright browsers
   ```bash
   npx playwright install --with-deps
   ```

### Running Tests

Run all tests:
```bash
npx playwright test
```

Run a specific test file:
```bash
npx playwright test tests/paysend.spec.ts
```

Run tests in UI mode:
```bash
npx playwright test --ui
```

Generate and open an HTML report:
```bash
npx playwright test --reporter=html
npx playwright show-report
```

## 📁 Test Structure

```
project-root/
│
├── pageobject/                   # Каталог с Page Object классами
│   └── exchangepage.js           # Класс с локаторами и методами
│
├── tests/                        # Каталог с тестовыми файлами
│   └── paysend.spec.js           # Основной файл с автотестами
│
├── .env                          
├── README.md                     # Инструкция по установке и запуску тестов
└── playwright.config.js          

```


## 📚 Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Test Configuration Guide](https://playwright.dev/docs/test-configuration)
