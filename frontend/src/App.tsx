import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { NotFoundPage } from './core/errors/NotFoundPage';
import { Layout } from './core/layout/Layout';
import { ToastProvider } from './core/toast/toast';
import { HomePage } from './pages/HomePage';
import { PrivacyPage } from './pages/legal/PrivacyPage';

const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

// Маршруты проекта. Новые страницы — сюда и в project.json → routes (для sitemap.xml).
const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { path: '/', element: <HomePage /> },
            { path: '/legal/privacy', element: <PrivacyPage /> },
            { path: '*', element: <NotFoundPage /> },
        ],
    },
]);

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ToastProvider>
                <RouterProvider router={router} />
            </ToastProvider>
        </QueryClientProvider>
    );
}
