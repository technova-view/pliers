'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<ThemeProvider>
				{children}
				<Toaster position="bottom-right" />
			</ThemeProvider>
		</Provider>
	);
}
