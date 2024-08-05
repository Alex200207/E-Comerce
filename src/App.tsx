import AppRouter from "./AppRouter.tsx";
import { AuthProvider } from "./utils/AuthProvider.tsx";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
