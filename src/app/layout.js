import { TaskProvider } from '@/context/TaskContext';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TaskProvider>
          <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white p-4">
              <div className="container mx-auto">
                <h1 className="text-2xl font-bold">Task Management App</h1>
              </div>
            </header>
            
            <main className="container mx-auto mt-8 px-4">
              {children}
            </main>
          </div>
        </TaskProvider>
      </body>
    </html>
  );
}