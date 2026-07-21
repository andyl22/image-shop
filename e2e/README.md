# Playwright E2E Test Suite

This directory contains the end-to-end (E2E) test suite for the image-shop project, built with [Playwright](https://playwright.dev/).

## Running Tests

### Run all tests
The config auto-starts the Next.js dev server before running tests:
```bash
npx playwright test
```

### Run tests in headed mode (visible browser)
```bash
npx playwright test --headed
```

### Run tests in debug mode with Playwright Inspector
```bash
npx playwright test --debug
```

### Run tests in UI mode
```bash
npx playwright test --ui
```

### Run tests for a specific file
```bash
npx playwright test e2e/home.spec.ts
```

### Run tests for a specific project
```bash
npx playwright test --project=chromium
```

### Generate HTML report
```bash
npx playwright show-report
```

## How It Works

The `playwright.config.ts` automatically starts the Next.js dev server before running tests via the `webServer` configuration. The server is:
- Started with `npm run dev` in the project root directory
- Waits for `http://localhost:3000` to be reachable
- Times out after 120 seconds
- Stopped automatically after tests complete

## Test Structure

```
e2e/
├── playwright.config.ts    # Playwright configuration
├── README.md               # This file
├── home.spec.ts            # Home page tests
├── shop.spec.ts            # Shop page tests
├── blog.spec.ts            # Blog page tests
├── contact.spec.ts         # Contact, About, Privacy, Credits page tests
├── auth.spec.ts            # Authentication, dropdown, and collapsible tests
└── helpers/                # Page Object classes
    ├── HomePage.ts
    ├── ShopPage.ts
    └── ContactPage.ts
```

## Test Categories

### 1. **home.spec.ts** - Home Page Tests
- Header navigation (hamburger menu, nav links)
- Sign In link visibility and navigation
- Cart button visibility and accessibility
- Footer navigation links

### 2. **shop.spec.ts** - Shop Page Tests
- Shop page structure (items control menu, path navigation)
- Items control menu (sort filters, collapse toggle)
- Section links (links list)
- Cart modal interaction
- Checkout navigation

### 3. **blog.spec.ts** - Blog Page Tests
- Blog card rendering and navigation
- Blog detail page access
- Header consistency across pages

### 4. **contact.spec.ts** - Contact & Utility Page Tests
- Contact form page structure
- About, Privacy, Credits page accessibility
- Cross-page navigation

### 5. **auth.spec.ts** - Authentication & Component Tests
- Login page form elements
- Registration page form elements
- Protected route handling
- Dropdown component functionality
- Collapsible component functionality

## Page Object Classes

The `helpers/` directory contains Page Object classes that encapsulate common interactions:

- **HomePage.ts**: Interactions for the home page (nav links, cart, footer)
- **ShopPage.ts**: Shop section navigation and cart interactions
- **ContactPage.ts**: Contact page form helpers

## Using data-testid Attributes

All interactive components have `data-testid` attributes for reliable test selectors. Key test IDs:

### Header Navigation
| Test ID | Component |
|---------|-----------|
| `nav-home` | Home link |
| `nav-shop` | Shop link |
| `nav-blog` | Blog link |
| `nav-about` | About link |
| `nav-sign-in-link` | Sign In link |
| `hamburger-menu-button` | Mobile hamburger menu |
| `right-header` | Right header section |
| `right-header-user-menu` | User dropdown trigger |

### Cart
| Test ID | Component |
|---------|-----------|
| `cart-button` | Cart toggle button |
| `cart-modal-content` | Cart modal container |
| `cart-items-list` | Cart items list |
| `cart-total` | Cart total display |
| `cart-checkout-button` | Checkout button |

### Footer
| Test ID | Component |
|---------|-----------|
| `app-footer` | Footer container |

### Forms
| Test ID | Component |
|---------|-----------|
| `form-container` | Form wrapper |
| `form-submit-link` | Submit button/link |
| `form-error-display` | Error message display |

### Login/Register
| Test ID | Component |
|---------|-----------|
| `login-form` | Login form container |
| `register-form` | Register form container |
| `toggle-to-register` | Toggle to register link |
| `toggle-to-login` | Toggle to login link |

### Shop Components
| Test ID | Component |
|---------|-----------|
| `items-control-menu` | Items control menu |
| `items-control-collapse-button` | Sort filter toggle |
| `items-control-sort-form` | Sort form |
| `items-control-filters` | Filters container |
| `path-nav` | Breadcrumb navigation |
| `path-nav-home-link` | Home breadcrumb link |
| `links-list` | Section links list |
| `collapsible-container` | Collapsible wrapper |
| `collapsible-content` | Collapsible content area |

### Dropdown Components
| Test ID | Component |
|---------|-----------|
| `dropdown-container` | Dropdown wrapper |
| `dropdown-toggle-button` | Dropdown trigger button |

### Action Dialog
| Test ID | Component |
|---------|-----------|
| `action-dialog` | Action dialog container |
| `action-dialog-title` | Dialog title |
| `action-dialog-confirm-button` | Confirm button |
| `action-dialog-cancel-button` | Cancel button |

### Drawer
| Test ID | Component |
|---------|-----------|
| `drawer-overlay` | Drawer overlay background |
| `drawer-content` | Drawer content area |

## Best Practices

1. **Use `data-testid` selectors** - These are stable and won't change with styling updates
2. **Use `getByRole` where possible** - Better accessibility testing
3. **Use `getByLabel` for form inputs** - Matches user behavior
4. **Avoid CSS class selectors** - They may change with styling updates
5. **Use `waitForURL` for navigation assertions** - Ensures navigation completes
6. **Group related tests with `test.describe`** - Improves test organization

## Adding New Tests

1. Create a new `.spec.ts` file or add to an existing one
2. Use `test.describe` to group related tests
3. Use descriptive test names that explain the expected behavior
4. Add `data-testid` attributes to any new interactive components
5. Follow the existing test structure and patterns

## Continuous Integration

To run tests in CI/CD, add the following step:

```yaml
- name: Run E2E Tests
  run: npx playwright test --reporter=github