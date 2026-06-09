import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { SLIDE_SLUGS } from "./pages/slide-routes";

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* Every slide slug renders the same one-page deck. On mobile the URL
          tracks the slide in view (deep links + back/forward); desktop ignores
          the slug and behaves as a single scroll page. */}
      {SLIDE_SLUGS.map((slug) => (
        <Route key={slug} path={slug} element={<Index />} />
      ))}
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
