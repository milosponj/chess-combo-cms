import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const useAccessToken = () => {
    const { getAccessTokenSilently, getAccessTokenWithPopup, user, loginWithRedirect } = useAuth0();
    const opts = {
        audience: "https://api.goaltrails.com",
    };
    const [accessToken, setAccessToken] = useState<string>()

    useEffect(() => {
        (async () => {
            try {
                const { audience } = opts;
                setAccessToken(await getAccessTokenSilently({ audience }));
            } catch (error) {
                if ((error as any).error === "consent_required") {
                    setAccessToken(await getAccessTokenWithPopup(opts));
                }
                if ((error as any).error === "login_required" ){
                    loginWithRedirect()
                }
            }
        })();
    }, []);

    return {
        accessToken
    };
};