import React, { createContext, useContext, useReducer } from 'react';
import customTheme from '../functions/customTheme';

const ThemeColorContext = createContext();

const initialState = {
  theme: customTheme,
};

/**
 * Reducer function for managing theme color state.
 *
 * @param {object} state - Current state object.
 * @param {object} action - Action object describing the state change.
 * @param {string} action.type - Type of action to perform.
 * @param {string} action.payload - Payload data for the action.
 * @returns {object} New state object after applying the action.
 */
const themeColorReducer = (state, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      };
    case 'SET_PRIMARY_COLOR':
      return {
        ...state,
        theme: {
          ...state.theme,
          palette: {
            ...state.theme.palette,
            primary: {
              main: action.payload,
            },
          },
        },
      };
    case 'SET_SECONDARY_COLOR':
      return {
        ...state,
        theme: {
          ...state.theme,
          palette: {
            ...state.theme.palette,
            secondary: {
              main: action.payload,
            },
          },
        },
      };
    case 'SET_ERROR_COLOR':
      return {
        ...state,
        theme: {
          ...state.theme,
          palette: {
            ...state.theme.palette,
            error: {
              main: action.payload,
            },
          },
        },
      };
    default:
      return state;
  }
};

/**
 * Provider component for managing theme color state using React context.
 *
 * @component
 * @param {object} props - Props for the ThemeColorProvider component.
 * @param {React.ReactNode} props.children - Child components to render within the provider.
 */
export function ThemeColorProvider({ children }) {
  const [state, dispatch] = useReducer(themeColorReducer, initialState);

  return (
    <ThemeColorContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeColorContext.Provider>
  );
}

/**
 * Custom hook for accessing theme color state and dispatch function.
 *
 * @returns {object} An object containing the current theme state and dispatch function.
 * @throws {Error} Throws an error if used outside of a ThemeColorProvider.
 */
export const useThemeColors = () => {
  const context = useContext(ThemeColorContext);
  if (!context) {
    throw new Error('useThemeColors must be used within a ThemeColorProvider');
  }
  return context;
};
