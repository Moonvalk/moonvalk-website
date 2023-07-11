import { PropsWithChildren, ReactElement, useEffect, useState } from "react";
import { ACCESS_LEVEL, userAuthStore } from "../../stores/User";

/**
 * Contract for properties required by the RestrictedContent element.
 */
interface IRestrictedContentProps {
    /**
     * The access level required by a user in order for this restricted content to display.
     */
    accessLevel: ACCESS_LEVEL,
}

/**
 * Generates a new restricted content container that handles dynamically displaying content
 * based on user authorization.
 * @param {PropsWithChildren<IRestrictedContentProps>} props_ - Properties for determining how this content should be handled.
 * @return {ReactElement} A new JSX element for rendering.
 */
export function RestrictedContent(props_: PropsWithChildren<IRestrictedContentProps>): ReactElement {
    /**
     * Contains the current user data from our user auth store.
     */
    const {userInfo} = userAuthStore();

    /**
     * Flag that handles determining whether content can be displayed or not.
     */
    const [authorized, setAuthorized] = useState(false);

    /**
     * Called when user info is changed to handle authorization.
     */
    useEffect(() => {
        setAuthorized(userInfo?.accessLevel >= props_.accessLevel);
    }, [userInfo]);

    // When not authorized, return a blank JSX element to hide children.
    if (!authorized) {
        return <></>;
    }

    // Safe to display children now.
    return (
        <>
            {props_.children}
        </>
    )
}