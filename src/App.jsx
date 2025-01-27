import { Router } from "./router/Router";
import { useScrollToTop } from "./hooks/useScrollToTop";

function App() {
  // Scrolls to the top of the page on path change/page load
  useScrollToTop();
  return <Router />;
}

export default App;
