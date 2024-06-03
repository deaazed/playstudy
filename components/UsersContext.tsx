import { createContext, useContext, useReducer } from "react";


const UsersContext = createContext<any>({});

const initialState = {
    user: {},
    users: [],
    games: [],
    store: [],
    isLoading: false,
    error: null,
};

const usersReducer = (state: any, action: any) => {
    switch (action?.type) {
        case "USERS_PROCESS_REQUEST":
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case "USERS_PROCESS_FAILURE":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case "USERS_FETCH":
            return {
                ...state,
                isLoading: false,
                users: action.payload,
            };
        case "USERS_CLEAR":
            return {
                ...state,
                users: [],
            };
        case "GAMES_PROCESS_REQUEST":
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case "GAMES_PROCESS_FAILURE":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case "GAMES_FETCH":
            return {
                ...state,
                isLoading: false,
                games: action.payload,
            };
        case "GAMES_CLEAR":
            return {
                ...state,
                games: [],
            };
        case "STORE_PROCESS_REQUEST":
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case "STORE_PROCESS_FAILURE":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case "STORE_FETCH":
            return {
                ...state,
                isLoading: false,
                store: action.payload,
            };
        case "STORE_CLEAR":
            return {
                ...state,
                store: [],
            };
        case "USER_PROCESS_REQUEST":
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case "USER_PROCESS_FAILURE":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case "USER_FETCH":
            return {
                ...state,
                isLoading: false,
                user: action.payload,
            };
        case "USER_CLEAR":
            return {
                ...state,
                user: {},
            };
        default:
            return state;
    }
}

export const UsersProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(usersReducer, initialState);
    return (
        <UsersContext.Provider value={{ state, dispatch }}>
            {children}
        </UsersContext.Provider>
    );
}

export const useUsers = () => {
    const context = useContext(UsersContext);
    if (context === undefined) {
        throw new Error('useUsers must be used within a UsersProvider');
    }
    return context;
}

