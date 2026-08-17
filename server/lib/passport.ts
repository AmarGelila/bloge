import passport from "passport";
import { StrategyOptionsWithSecret } from "passport-jwt";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { JwtPayload } from "jsonwebtoken";
import prisma from "./prisma";
import { GoogleProfile } from "../types";

const jwtOptions: StrategyOptionsWithSecret = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET as string,
};

passport.use(
	new JwtStrategy(jwtOptions, async (payload: JwtPayload, done) => {
		if (!payload || !payload.id || !payload.email) return done(null, false);
		done(null, { id: payload.id, email: payload.email });
	}),
);

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
if (!googleClientId || !googleClientSecret)
	throw new Error("Missing Google OAuth env vars");

passport.use(
	new GoogleStrategy(
		{
			clientID: googleClientId,
			clientSecret: googleClientSecret,
			callbackURL: "/auth/sign-in/google/callback",
		},
		async (accessToken, refreshToken, profile, done) => {
			const { name, email } = profile._json as GoogleProfile;

			try {
				let user = await prisma.user.findUnique({ where: { email } });
				if (!user) {
					user = await prisma.user.create({ data: { name, email } });
				}
				done(null, user);
			} catch (error) {
				done(error, false);
			}
		},
	),
);
