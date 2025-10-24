# ZeroTouch - AI-Powered Communication Platform

An intelligent three-panel collaboration workspace powered by **DeepSeek-V3.1** with advanced reasoning capabilities. ZeroTouch bridges communication gaps between customers and service providers by translating raw requests into actionable solutions, generating intelligent follow-ups, and streamlining response workflows.

## Overview

ZeroTouch eliminates communication friction in customer service, enterprise collaboration, and educational settings by providing:
- **Real-time AI analysis** of customer needs with transparent thinking process
- **Automated solution generation** with negotiation and refinement capabilities
- **Intelligent follow-up questions** to gather missing information
- **Context-aware response drafting** with one-click application
- **Emergency escalation detection** and department routing suggestions

## Key Features

### Three-Panel Architecture

1. **Customer Conversation Panel (Left)**
   - Customer input interface with message history
   - Supports text messages and images
   - Real-time message flow from AI-generated customer replies

2. **Collaboration Workspace (Center)**
   - Employee/agent workspace for drafting responses
   - AI-assisted composition with multiple modes:
     - **Solution Suggestions**: AI-generated resolution proposals
     - **Follow-up Questions**: Smart questions to clarify requirements
     - **Customer Reply Drafts**: Pre-written customer responses for testing
     - **Department Contacts**: Routing suggestions for complex issues
   - Real-time negotiation interface for refining AI suggestions
   - Chat mode with emergency escalation support
   - Streaming message display with live updates

3. **AI Analysis Hub (Right)**
   - Real-time AI reasoning with **Thinking Mode** (shows AI's thought process)
   - Comprehensive needs analysis
   - Solution candidates with acceptance/rejection workflow
   - Missing information detection and collection
   - AI intervention controls (Pause, Resume, Adjust)

### Advanced AI Capabilities

#### DeepSeek-V3.1 Integration
- **Thinking Mode**: Transparent AI reasoning process separate from final output
- **Streaming Responses**: Real-time content generation with visual feedback
- **Context Awareness**: Multi-turn conversation understanding
- **Language Enforcement**: Consistent English output across all interactions

#### Intelligent Features
- **Needs Analysis**: Automatic extraction of explicit and implicit requirements
- **Solution Generation**: Context-aware response proposals with reasoning
- **Smart Follow-ups**: Targeted questions based on missing information
- **Customer Reply Simulation**: Generate customer responses for workflow testing
- **Emergency Detection**: Automatic identification of urgent issues
- **Department Routing**: Intelligent escalation and transfer suggestions
- **Iterative Refinement**: Negotiation workflow for all AI suggestions

### User Experience

- **Real-time Streaming**: Live display of AI thinking and responses
- **AI Intervention**: Pause, resume, or adjust AI during generation
- **Keyboard Shortcuts**: Fast navigation and actions (Ctrl+K for shortcuts)
- **Notification System**: Visual feedback for all actions and events
- **Settings Panel**: Customizable theme, font size, sound, and more
- **Auto-scroll Control**: Smooth message navigation
- **Responsive Design**: Optimized for desktop workflows

### Multi-Scenario Support

Three built-in scenario presets with customized prompts and workflows:

1. **Retail**: Customer ↔ Store/Sales Representative
   - Product inquiries, order issues, returns
   - Example: Business suit recommendation for conference

2. **Enterprise**: Marketing Manager ↔ R&D Engineer
   - Cross-department collaboration
   - Example: Mobile app retention improvement project

3. **Education**: Student ↔ Teacher
   - Learning support and tutoring
   - Example: Understanding quantum physics concepts

### Complete Workflows

#### Standard Customer Service Flow
1. Customer sends inquiry in Problem Panel
2. AI analyzes needs and displays thinking process
3. AI generates solution suggestions in Collaboration Workspace
4. Agent reviews, accepts, or negotiates modifications
5. Final response sent to customer
6. AI generates follow-up questions if needed

#### Iterative Refinement Flow
1. Agent clicks "Negotiate" on any AI suggestion
2. Provides specific modification requirements
3. AI generates revised version with updated reasoning
4. Agent can accept, reject, or continue negotiating
5. Accepted content applied to input area

#### Missing Information Flow
1. AI detects gaps in customer request
2. Displays missing information checklist
3. Agent selects relevant items
4. AI generates targeted follow-up questions
5. Follow-up sent to customer for clarification

#### Emergency Escalation Flow
1. System detects urgent keywords or customer frustration
2. AI prompts emergency mode confirmation
3. Agent sets urgency level and description
4. AI generates department contact suggestions
5. Escalation instructions provided

## Quick Start

### Prerequisites
- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0
- **DashScope API Key**: Alibaba Cloud account with DashScope access

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Zerotouch
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure API key**

**IMPORTANT**: Never commit API keys to the repository!

**Option A: Environment variable (recommended)**
```bash
# macOS/Linux
export DASHSCOPE_API_KEY="sk-***your_key***"

# Windows PowerShell
$env:DASHSCOPE_API_KEY="sk-***your_key***"
```

**Option B: Create `.env` file** (add to `.gitignore`)
```bash
DASHSCOPE_API_KEY=sk-***your_key***
```

4. **Start development server**
```bash
npm run dev
```

The application will open at `http://localhost:3000`

## Build & Deployment

### Production Build
```bash
npm run build
```

Outputs to `dist/` directory with optimized assets and code splitting.

### Run Production Server
```bash
npm start
```

Express server starts on port 8080 (or `$PORT` env variable), serving:
- Static files from `dist/`
- API proxy at `/api/dashscope` → DashScope API
- Health check endpoint at `/health`

### Docker Deployment

**Build image:**
```bash
docker build -t zerotouch:latest .
```

**Run container:**
```bash
docker run -p 8080:8080 \
  -e DASHSCOPE_API_KEY="sk-***your_key***" \
  zerotouch:latest
```

**Docker Compose:**
```yaml
version: '3.8'
services:
  zerotouch:
    build: .
    ports:
      - "8080:8080"
    environment:
      - DASHSCOPE_API_KEY=${DASHSCOPE_API_KEY}
      - PORT=8080
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:8080/health')"]
      interval: 30s
      timeout: 3s
      retries: 3
```

### Railway Deployment
```bash
# Deploy to Railway
npm run railway:deploy

# Railway automatically detects and uses:
# - railway:build script for build
# - railway:start script for startup
```

## How to Use

### Basic Workflow

1. **Start Conversation**
   - Type customer message in the Customer Conversation panel (left)
   - Or click "Insert Example" to load scenario template
   - Press Enter or click Send

2. **AI Analysis**
   - Watch AI thinking process in real-time (right panel)
   - Review needs analysis and solution candidates
   - Monitor for missing information alerts

3. **Review Suggestions**
   - Check AI-generated solutions in Collaboration Workspace (center)
   - Three action buttons per suggestion:
     - **Accept**: Apply to input area
     - **Negotiate**: Request modifications
     - **Reject**: Dismiss suggestion

4. **Refine Response**
   - Edit accepted suggestion in input area
   - Or negotiate for AI to regenerate
   - Use AI Chat for clarification or custom requests

5. **Send Response**
   - Click "Send to Customer" to simulate response
   - Response appears in Customer Conversation panel
   - AI may generate follow-up questions automatically

### Advanced Features

#### AI Intervention
While AI is generating content:
- **Pause**: Stop generation temporarily
- **Resume**: Continue from pause point
- **Adjust**: Provide mid-generation guidance

#### Chat with AI
- Open chat mode from toolbar
- Ask questions about current situation
- Request custom solutions or clarifications
- History maintained for context

#### Emergency Mode
- Activated when urgent issues detected
- Set urgency level: Urgent/Critical/Emergency
- AI generates escalation suggestions
- Department contact recommendations

#### Department Contact
- AI analyzes request complexity
- Suggests relevant departments
- Provides transfer instructions
- Generates handoff summary

### Keyboard Shortcuts

- `Ctrl+K`: Show all shortcuts
- `Ctrl+Enter`: Send message (in focused input)
- `Ctrl+,`: Open settings
- `Ctrl+L`: Clear conversation (confirmation required)
- `Ctrl+1`: Focus Problem Panel input
- `Ctrl+2`: Focus Solution Panel input

## Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DASHSCOPE_API_KEY` | Alibaba Cloud DashScope API key | - | Yes |
| `PORT` | Server port (production) | `8080` | No |
| `NODE_ENV` | Environment mode | `development` | No |

### Application Settings

Access via Settings Panel (Ctrl+,):

- **Appearance**
  - Dark Mode (default: enabled)
  - Font Size: Small/Medium/Large

- **Behavior**
  - Sound Effects (notifications)
  - Auto-scroll in message panels
  - Show timestamps on messages

- **Performance**
  - Max messages per panel (default: 50)
  - API endpoint configuration (advanced)

- **Language**
  - UI Language (default: English)
  - Output language enforced via system prompts

### Scenario Customization

Edit `src/App.jsx` → `scenarios` object:

```javascript
{
  id: 'custom',
  name: 'Custom Scenario',
  icon: Icon,
  description: 'Your scenario description',
  problemRole: 'Role A',
  solutionRole: 'Role B',
  example: 'Example message...'
}
```

## Architecture

### Frontend (React 18)
```
src/
├── App.jsx                    # Main application component
├── main.jsx                   # Entry point
├── components/
│   ├── ProblemPanel.jsx       # Customer conversation UI
│   ├── SolutionPanel.jsx      # Collaboration workspace
│   ├── LLMPanel.jsx           # AI analysis hub
│   ├── ScenarioSelector.jsx   # Scenario switcher
│   ├── SettingsPanel.jsx      # Settings modal
│   ├── KeyboardShortcuts.jsx  # Shortcut handler
│   ├── NotificationSystem.jsx # Toast notifications
│   ├── LoadingStates.jsx      # Loading animations
│   └── AnimatedTransition.jsx # UI transitions
├── hooks/
│   └── useMessageFlow.js      # State management & workflows
├── services/
│   ├── llmService.js          # DeepSeek-V3.1 API client
│   └── realtimeService.js     # WebSocket/event bus
└── styles/
    └── globals.css            # Global styles & animations
```

### Backend (Express)
```
server.js                      # Production server
├── Static file serving        # dist/ folder
├── API proxy                  # /api/dashscope → DashScope
└── Health check              # /health endpoint
```

### Data Flow
```
Customer Input
    ↓
Problem Panel → useMessageFlow Hook
    ↓
llmService → DeepSeek-V3.1 API
    ↓
AI Analysis (Streaming)
    ↓
LLM Panel (Display Thinking + Answer)
    ↓
Solution Suggestions → Solution Panel
    ↓
Agent Accept/Negotiate/Reject
    ↓
Final Response → Customer
```

## Tech Stack

### Core Technologies
- **React 18**: Component framework with hooks
- **Vite 4**: Fast build tool and dev server
- **Tailwind CSS 3**: Utility-first styling
- **Lucide React**: Icon library

### Backend & Proxy
- **Express**: Production web server
- **http-proxy-middleware**: API request proxying
- **Node.js 18+**: Runtime environment

### AI Integration
- **DeepSeek-V3.1**: Language model (via DashScope)
- **Streaming API**: Server-Sent Events (SSE)
- **Thinking Mode**: Separate reasoning/output

### UI/UX Libraries
- **@headlessui/react**: Accessible UI primitives
- **clsx + tailwind-merge**: Conditional styling
- **Axios**: HTTP client for API calls

### Development
- **ESLint**: Code linting
- **PostCSS + Autoprefixer**: CSS processing
- **TypeScript** (config only): Type checking support

## Security

### API Key Protection
- Never expose keys in client-side code
- Environment-based injection (dev + prod)
- Proxy architecture prevents key leakage
- `.gitignore` includes `.env` files

### Production Considerations
- Use environment variables on hosting platform
- Enable HTTPS for production deployments
- Set `NODE_ENV=production` for optimizations
- Run as non-root user (Docker: nodejs:1001)
- Health checks for monitoring
- Error logging for debugging

## Troubleshooting

### API Connection Issues
```bash
# Check API key is set
echo $DASHSCOPE_API_KEY

# Test proxy endpoint
curl http://localhost:3000/api/dashscope/models \
  -H "Authorization: Bearer $DASHSCOPE_API_KEY"

# Check server logs
npm run dev  # Watch console output
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Docker Issues
```bash
# Check container logs
docker logs <container-id>

# Verify environment variables
docker exec <container-id> env | grep DASHSCOPE

# Test health endpoint
curl http://localhost:8080/health
```

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

[Add your license here]

## Acknowledgments

- **Alibaba Cloud DashScope** for AI API access
- **DeepSeek** for the V3.1 model
- **React & Vite teams** for excellent tools
