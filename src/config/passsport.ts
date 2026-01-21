import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { prisma } from './prisma.configs';
import bcryptjs from 'bcryptjs';

//gmail and pass login
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email: string, password: string, done) => {
      try {
        const isExsist = await prisma.user.findUnique({ where: { email } });
        if (!isExsist) {
          return done(null, false, {
            message: 'Invalid email. Please enter a registered email address',
          });
        }
        const isMatchPassword = await bcryptjs.compare(
          password as string,
          isExsist?.password as string
        );

        if (!isMatchPassword) {
          return done(null, false, {
            message: 'Incorrect password. Please try again.',
          });
        }
        return done(null, isExsist);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser(
  (user: Express.User, done: (err: any, id?: unknown) => void) => {
    done(null, user);
  }
);

passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    done(null, user);
  } catch (error) {
    done(error);
  }
});
