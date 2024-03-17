import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import * as jose from 'jose';

class Config {
  constructor() {
    this.express = express;
    this.app = this.express();
    this.cors = cors;
    this.passport = passport;
    this.session = session;
    this.jose = jose;
  }
}
export default Config;