import { PropsWithChildren, ReactElement, useEffect, useState } from "react";
import { ACCESS_LEVEL, userAuthStore } from "../../stores/userAuth.store";

interface IRestrictedContentProps {
    accessLevel: ACCESS_LEVEL,
}

export function RestrictedContent(props: PropsWithChildren<IRestrictedContentProps>): ReactElement {
    const {userInfo} = userAuthStore();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        setAuthorized(userInfo?.accessLevel >= props.accessLevel);
    }, [userInfo]);

    if (!authorized) {
        return <></>;
    }

    return (
        <>
            {props.children}
        </>
    )
}