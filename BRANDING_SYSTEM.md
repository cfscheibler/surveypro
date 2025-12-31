# Branding System Specification

## Overview
The branding system allows clients to automatically apply their company's visual identity to all surveys they create, creating a seamless brand experience for survey respondents.

---

## Key Features

### 1. Company HTML/CSS Upload
- **Input Methods**:
  - Direct HTML/CSS paste
  - File upload (HTML file)
  - URL import (fetch company website)
  - Manual color/font entry (fallback)

### 2. Automatic Extraction
The system automatically extracts:
- **Colors**:
  - Primary color
  - Secondary color
  - Accent color
  - Background color
  - Text color
  - Link color
- **Typography**:
  - Primary font family
  - Secondary font family
  - Font sizes (base, headings)
  - Font weights
- **Visual Elements**:
  - Logo (extracted or uploaded separately)
  - Border radius
  - Shadow styles
  - Button styles

### 3. Theme Generation
- Generate CSS variables from extracted data
- Create survey-specific theme CSS
- Maintain responsive design
- Ensure accessibility (contrast ratios)

---

## Implementation Details

### HTML Parsing
```typescript
interface BrandingExtractor {
  parseHTML(html: string): ParsedHTML;
  extractColors(html: string): ColorPalette;
  extractFonts(html: string): FontFamily[];
  extractLogo(html: string): LogoData;
  extractStyles(html: string): StyleData;
}

interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  link: string;
  border?: string;
}

interface FontFamily {
  primary: string;
  secondary?: string;
  weights: number[];
}
```

### CSS Variable Generation
```css
:root {
  --brand-primary: #6366f1;
  --brand-secondary: #8b5cf6;
  --brand-accent: #ec4899;
  --brand-background: #ffffff;
  --brand-text: #1f2937;
  --brand-link: #6366f1;
  --brand-font-primary: 'Inter', sans-serif;
  --brand-font-secondary: 'Roboto', sans-serif;
  --brand-border-radius: 0.5rem;
  --brand-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

### Survey Theme Application
1. Load user's branding data
2. Generate theme CSS
3. Inject into survey HTML
4. Override default survey styles
5. Maintain survey functionality

### Branding Storage
```typescript
interface UserBranding {
  userId: string;
  companyName: string;
  companyHTML: string;
  companyCSS: string;
  extractedColors: ColorPalette;
  extractedFonts: FontFamily[];
  logoUrl: string;
  customCSS?: string;
  themeCSS: string; // Generated
  updatedAt: Date;
}
```

---

## User Flow

### Initial Setup
1. User registers account
2. During registration, prompted for company HTML
3. System extracts branding elements
4. User can preview extracted colors/fonts
5. User can adjust/override extracted values
6. User uploads logo (optional)
7. Branding saved to account

### Survey Creation
1. User creates new survey
2. System automatically applies company branding
3. User can preview survey with branding
4. User can make survey-specific overrides (optional)
5. Survey published with branding applied

### Branding Updates
1. User updates company HTML in settings
2. System re-extracts branding
3. User can choose to:
   - Apply to all existing surveys
   - Apply only to new surveys
   - Keep existing surveys unchanged

---

## Technical Considerations

### Color Extraction Methods
1. **CSS Parsing**: Extract from `<style>` tags and external stylesheets
2. **Inline Styles**: Parse `style` attributes
3. **Color Detection**: Use libraries to detect dominant colors
4. **Fallback**: Use common color schemes if extraction fails

### Font Extraction
1. Parse `font-family` from CSS
2. Extract from `@font-face` declarations
3. Detect Google Fonts usage
4. Fallback to system fonts

### Logo Extraction
1. Find `<img>` tags with logo-like attributes
2. Extract from CSS `background-image`
3. Look for common logo file names
4. Allow manual upload if not found

### Performance
- Cache extracted branding data
- Generate theme CSS once, reuse
- Lazy load fonts
- Optimize logo images

### Accessibility
- Ensure color contrast ratios (WCAG AA minimum)
- Maintain readable font sizes
- Preserve focus indicators
- Test with screen readers

---

## Survey Component Theming

### Components to Theme
- Survey container
- Section headers
- Question labels
- Input fields
- Buttons
- Radio buttons / checkboxes
- Error messages
- Progress indicators

### Theming Approach
```typescript
// Survey component with branding
function Survey({ survey, branding }: SurveyProps) {
  const themeCSS = generateThemeCSS(branding);
  
  return (
    <div className="survey-container" style={themeCSS}>
      {/* Survey content */}
    </div>
  );
}
```

### CSS Override Strategy
1. Base survey styles (default)
2. Branding theme CSS (overrides)
3. Survey-specific overrides (if any)
4. Inline styles (for dynamic values)

---

## Edge Cases

### No Company HTML Provided
- Use default theme
- Allow manual color/font selection
- Prompt user to add branding later

### Invalid HTML
- Validate HTML structure
- Extract what's possible
- Show warnings for missing elements
- Allow manual override

### Branding Conflicts
- Survey-specific settings override branding
- User can disable branding for specific survey
- Preview shows final result

### Logo Issues
- Handle missing logos gracefully
- Support multiple logo formats
- Optimize logo size/format
- Fallback to text logo

---

## Future Enhancements

1. **Branding Templates**: Pre-built themes
2. **Branding Library**: Save multiple brand profiles
3. **A/B Testing**: Test different branding
4. **Branding Analytics**: Track brand impact
5. **White-Label**: Remove G2M branding option
6. **Custom Domains**: Use client's domain
7. **Branding API**: Programmatic branding updates

---

## Testing Requirements

1. **Extraction Accuracy**: Test with various HTML structures
2. **Theme Application**: Verify all components themed correctly
3. **Responsive Design**: Ensure branding works on mobile
4. **Accessibility**: Test contrast, readability
5. **Performance**: Measure theme generation time
6. **Browser Compatibility**: Test across browsers
7. **Edge Cases**: Handle invalid/missing data

---

## Security Considerations

1. **HTML Sanitization**: Prevent XSS attacks
2. **File Upload Security**: Validate file types/sizes
3. **CSS Validation**: Prevent malicious CSS
4. **Content Security Policy**: Restrict inline styles if needed
5. **Logo Validation**: Verify image files, prevent malicious uploads

---

## Success Metrics

- **Branding Adoption**: % of users who add branding
- **Branding Satisfaction**: User feedback on branding system
- **Survey Completion**: Impact of branding on completion rates
- **Brand Recognition**: User feedback on brand consistency
- **Time to Brand**: How long to set up branding

