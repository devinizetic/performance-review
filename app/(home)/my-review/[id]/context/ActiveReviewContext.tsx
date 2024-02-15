'use client';
import { FullUserReview } from '@/types/supabase.types';
import React, { ReactNode, useState } from 'react';

// Define the shape of the context state
interface ContextState {
  activeReview: FullUserReview | undefined;
}

// Define the shape of the context
interface ActiveReviewContextProps {
  state: ContextState;
  setState: React.Dispatch<React.SetStateAction<ContextState>>;
}

// Create the context
const initialValues = {
  activeReview: undefined
};
const initialContextProps = {
  state: initialValues,
  setState: () => {}
};
const ActiveReviewContext =
  React.createContext<ActiveReviewContextProps>(initialContextProps);

// Create the provider
const ActiveReviewProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [state, setState] = useState<ContextState>(initialValues);

  const value = {
    state,
    setState
  };

  return (
    <ActiveReviewContext.Provider value={value}>
      {children}
    </ActiveReviewContext.Provider>
  );
};

export { ActiveReviewContext, ActiveReviewProvider };
