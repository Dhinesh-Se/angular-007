# angular-007

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-iur3cz)

## 🎯 Enterprise Angular Components - Full Demo

A comprehensive demonstration of the `@dhinesh-se/angular-components` library features integrated into a working Angular 20 application.

### 📦 Library Features Implemented

#### 1. **Permission Directive** (`entHasPermission`)
- Role-based access control with policy evaluation
- Support for 'all' and 'any' modes for flexible permission checking
- Conditional rendering based on user permissions
- **Location:** `src/permission-demo/`
- **Tab:** Permissions

#### 2. **Workflow Timeline** (`ent-workflow-timeline`)
- Visual process state representation with status indicators
- Support for multiple step statuses: completed, active, failed, pending, skipped
- Step metadata and timestamps
- Configurable orientation (vertical/horizontal)
- **Location:** `src/workflow-demo/`
- **Tab:** Workflow

#### 3. **Smart Table** (`ent-smart-table`)
- Reactive data binding with sorting and filtering
- Multi-select with bulk actions
- Configurable columns with custom cell templates
- Server-side pagination support
- **Location:** `src/smart-table-demo/`
- **Tab:** Smart Table

#### 4. **Dynamic Form Renderer** (`ent-dynamic-form-renderer`)
- Schema-driven form generation
- Multiple field types: text, email, number, select, checkbox, textarea
- Conditional field visibility (visibleWhen/disabledWhen)
- Pre-built form templates for common scenarios
- **Location:** `src/dynamic-form-demo/`
- **Tab:** Dynamic Form

#### 5. **Query Builder** (`ent-query-builder`)
- User-friendly filter expression builder
- Type-aware inputs (enums, dates, numbers)
- Real-time query compilation to SQL, MongoDB, OData formats
- Live summary and compiled preview
- **Location:** `src/query-builder-demo/`
- **Tab:** Query Builder

### 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm build
```

### 📊 Application Tabs

| Tab | Component | Features |
|-----|-----------|----------|
| Overview | AppComponent | Architecture overview & component guide |
| Products | HelloComponent | Product management with CRUD |
| Customers | ParentComponent | Customer list with child communication |
| **Permissions** | PermissionDemoComponent | Role-based access control demo |
| **Workflow** | WorkflowDemoComponent | Process timeline visualization |
| **Smart Table** | SmartTableDemoComponent | Advanced table with selection & bulk actions |
| **Dynamic Form** | DynamicFormDemoComponent | Multiple form templates |
| **Query Builder** | QueryBuilderDemoComponent | Filter expression builder |

### 🏗️ Architecture

- **Standalone Components:** All components are standalone and tree-shakeable
- **Reactive State:** RxJS BehaviorSubject and combineLatest for state management
- **OnPush Detection:** Optimized change detection strategy
- **SOLID Principles:** Clear separation of concerns between models, services, and UI

### 🔐 Key Patterns

1. **Permission Management:**
   ```ts
   constructor(permissionStore: PermissionStore) {
     permissionStore.setPermissions(['invoice.read', 'invoice.approve']);
   }
   ```

2. **Workflow Timeline:**
   ```html
   <ent-workflow-timeline
     [steps]="workflowSteps$"
     [config]="{ orientation: 'vertical', showMetadata: true }"
     (stepSelected)="openStep($event)"
   ></ent-workflow-timeline>
   ```

3. **Smart Table:**
   ```ts
   tableConfig = {
     idSelector: (row: Product) => row.id,
     columns: [
       { key: 'name', label: 'Name', sortable: true },
       { key: 'price', label: 'Price', sortable: true }
     ]
   };
   ```

4. **Dynamic Form:**
   ```ts
   schema = {
     id: 'customer-form',
     title: 'Customer Form',
     fields: [
       { key: 'name', label: 'Name', type: 'text' }
     ]
   };
   ```

5. **Query Builder:**
   ```ts
   // Get compiled SQL from user-built query
   const sql = compileQuery(filters, { dialect: 'sql' });
   ```

### 📚 Documentation

For detailed information about each component, visit:
- [@dhinesh-se/angular-components](https://www.npmjs.com/package/@dhinesh-se/angular-components)
- [GitHub Repository](https://github.com/Dhinesh-Se/Angular_components)

### 🛠️ Development

- **Framework:** Angular 20
- **State Management:** RxJS 7.8
- **Build Tool:** Angular CLI
- **Package Manager:** npm

### 📝 License

MIT
