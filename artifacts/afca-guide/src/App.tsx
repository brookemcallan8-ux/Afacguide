import React, { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "./components/layout";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}
import Home from "./pages/home";
import Guide from "./pages/guide";
import ComplaintTypes from "./pages/complaint-types";
import WriteComplaint from "./pages/write-complaint";
import MyComplaints from "./pages/my-complaints";
import Faq from "./pages/faq";
import Resources from "./pages/resources";
import Templates from "./pages/templates";
import CaseStudies from "./pages/case-studies";
import AboutAfca from "./pages/about-afca";
import BankSanctions from "./pages/bank-sanctions";
import DosAndDonts from "./pages/dos-and-donts";
import Forum from "./pages/forum";
import TermsOfUse from "./pages/terms-of-use";
import PrivacyPolicy from "./pages/privacy-policy";
import Disclaimer from "./pages/disclaimer";
import Testimonies from "./pages/testimonies";
import Agencies from "./pages/agencies";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/guide" component={Guide} />
        <Route path="/complaint-types" component={ComplaintTypes} />
        <Route path="/write-complaint" component={WriteComplaint} />
        <Route path="/my-complaints" component={MyComplaints} />
        <Route path="/faq" component={Faq} />
        <Route path="/resources" component={Resources} />
        <Route path="/templates" component={Templates} />
        <Route path="/case-studies" component={CaseStudies} />
        <Route path="/about-afca" component={AboutAfca} />
        <Route path="/bank-sanctions" component={BankSanctions} />
        <Route path="/dos-and-donts" component={DosAndDonts} />
        <Route path="/forum" component={Forum} />
        <Route path="/terms-of-use" component={TermsOfUse} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/disclaimer" component={Disclaimer} />
        <Route path="/testimonies" component={Testimonies} />
        <Route path="/agencies" component={Agencies} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, "") || ""}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
