import { ReactElement, createContext, useState } from "react";

interface IProps {
    children: ReactElement,
}

export interface IUserInfo {
    id: string,
    username: string | undefined,
}

export interface IUserContext {
    setUserInfo: React.Dispatch<React.SetStateAction<IUserInfo | undefined>>,
    userInfo: IUserInfo | undefined,
}

export const UserContext = createContext({});
export function UserContextProvider({children}: IProps) {
    const [userInfo, setUserInfo] = useState<IUserInfo | undefined>(undefined);
    return (
        <UserContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </UserContext.Provider>
    );
}
