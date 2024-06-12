import { NextFunction, Request, Response } from "express";
import { auth } from "../firebase.util";
import { DecodedIdToken } from "firebase-admin/auth";

const testUser: DecodedIdToken = {
    aud: "example_project_id",
    auth_time: new Date().getTime(),
    email: "phoenixCosmos@example.com",
    email_verified: true,
    exp: new Date().getTime(),
    firebase: {
        identities: {
            email: ["phoenixCosmos@example.com"],
            sign_in_provider: "password",
        },
        sign_in_provider: "password",
        tenant: "example_tenant_id",
    },
    iat: new Date().getTime(),
    iss: "https://securetoken.google.com/example_project_id",
    phone_number: "+1234567890",
    picture: "",
    sub: "example_user_sub",
    uid: "phoenixCosmos123",
    custom_claim: "user",
};

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const reqHeaderAuth = req.headers.authorization as string;
    
    if (reqHeaderAuth == null || reqHeaderAuth == "" || reqHeaderAuth == undefined) {
        return res.sendStatus(401);
    }

    const token = reqHeaderAuth.split(" ")[1]
    if(token == undefined) {
        return res.sendStatus(401);
    }

    if (process.env.PROD == "true") {
        auth.verifyIdToken(token, true)
            .then((decodedToken: DecodedIdToken) => {
                req.user = decodedToken;
                next();
            })
            .catch((error: any) => {
                console.log(error.code, error.message);
                return res.sendStatus(401);
            });
    } else if (process.env.PROD == "false") {
        req.user = testUser;
        next();
    }
}
