import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import 'dotenv/config';
import './config/passsport';
import { router } from './routes/routes';
import { ENV } from './config/env';
import { globalErrrHandle } from './middlewares/global.error';
import { notFound } from './middlewares/notFound';

export const app = express();

app.use(
  session({
    secret: ENV.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1', router);

app.use(globalErrrHandle);
app.use(notFound);
