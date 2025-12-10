import Header from "./Header";
import Sidebar from "./Sidebar";
import Profiles from "../pages/Profiles";

export default function AppLayout() {
  return (
    <div className="flex flex-col h-screen w-screen bg-neutral-900 text-white">
      <Header />
      <main className="flex h-[calc(100vh-8vh)]">
        <Sidebar />
        <div className="flex h-full w-full">
          <Profiles />
        </div>
      </main>
    </div>
  );
}
