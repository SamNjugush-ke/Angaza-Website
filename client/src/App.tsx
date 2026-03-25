import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Approach from "./pages/Approach";
import Impact from "./pages/Impact";
import Contact from "./pages/Contact";
import MSMEResources from "./pages/MSMEResources";
import STEMResources from "./pages/STEMResources";
import AdminDashboard from "./pages/AdminDashboard";
import STEMHub from "./pages/STEMHub";
import MSMESupport from "./pages/MSMESupport";
import Team from "./pages/Team";
import Donate from "./pages/Donate";
import Events from "./pages/Events";
import Projects from "./pages/Projects";
import Products from "./pages/Products";
import VSLAs from "./pages/VSLAs";
import AdminLogin from "./pages/AdminLogin";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Gallery from "./pages/Gallery";
import DigitalCircularEconomy from "./pages/DigitalCircularEconomy";
import Policies from "./pages/Policies";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/programs" component={Programs} />
      <Route path="/approach" component={Approach} />
      <Route path="/impact" component={Impact} />
      <Route path="/contact" component={Contact} />
      <Route path="/resources/msme" component={MSMEResources} />
      <Route path="/resources/stem" component={STEMResources} />
      <Route path="/stem-hub" component={STEMHub} />
      <Route path="/msme-support" component={MSMESupport} />
      <Route path="/team" component={Team} />
      <Route path="/policies" component={Policies} />
      <Route path="/donate" component={Donate} />
      <Route path="/events" component={Events} />
      <Route path="/projects" component={Projects} />
      <Route path="/products" component={Products} />
      <Route path="/vslas" component={VSLAs} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogDetail} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/digital-circular-economy" component={DigitalCircularEconomy} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin" component={AdminLogin} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
