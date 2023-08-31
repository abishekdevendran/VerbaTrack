'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const QCOptions = {
	defaultOptions: {
		queries: {
			staleTime: Infinity,
		}
	},
};

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
	const queryClient = new QueryClient(QCOptions);
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

export default ClientProvider;
