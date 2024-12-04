# scalar-e-commerce-2

Microservice version of Scalar Ecommerce

# Steps to build:

1. Superadmin service server
   1. Features
      1. Admin onboarding
      2. Superadmin onboarding
      3. Service onboarding
      4. superadmin Profile
      5. superadmin password recovery
   2. Schemas
      1. Client
      2. Services
2. UI
   1. Login
   2. CURD Superadmins + admins
   3. CURD services
   4. Profile
   5. Password recovery
3. File Upload + link MS

4. Monorepo with pnpm and nx: [https://www.youtube.com/watch?v=ngdoUQBvAjo&ab_channel=Nx-SmartMonorepos-FastCI]
5. MUI responsive UI breakpoints

```jsx
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1500,
    },
  },
});

export default theme;
```
