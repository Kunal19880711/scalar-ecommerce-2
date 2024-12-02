import helmet from "helmet";

const helmetContentSecurity = helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    frameSrc: ["'self'", "*.stripe.com"],
    scriptSrc: ["'self'", "*.stripe.com"], // Allow scripts from 'self'
    styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles (unsafe)
    imgSrc: ["'self'", "data:", "*"], // Allow images from 'self' and data URLs,
    connectSrc: ["'self'", "*.stripe.com"], // Allow connections to 'self'
    fontSrc: ["'self'", "fonts.gstatic.com"], // Allow fonts from 'self' and fonts.gstatic.com
    objectSrc: ["'none'"], // Disallow object, embed, and applet elements
    upgradeInsecureRequests: [], // Upgrade insecure requests to HTTPS
  },
});

export default helmetContentSecurity;

