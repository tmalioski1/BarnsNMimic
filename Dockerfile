FROM node:12 AS build-stage

WORKDIR /react-app
COPY react-app/. .

# You have to set this because it should be set during build time.
ENV REACT_APP_BASE_URL=https://barnesnmimic-e2bc434b3ebb.herokuapp.com

# Build our React App
RUN npm install
RUN npm run build

FROM python:3.9

# Setup Flask environment
ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True
ENV SECRET_KEY=7a08ae3a5617c8dd41929491b6e0b9db
ENV DATABASE_URL=sqlite:///dev.db
ENV SCHEMA=flask_schema
ENV S3_BUCKET=barnesnmimicbucket
ENV S3_KEY=AKIAWBJCFPNNLR4C33MS
ENV S3_SECRET=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

EXPOSE 5000
EXPOSE 8000
EXPOSE 3000

WORKDIR /var/www
COPY . .
COPY --from=build-stage /react-app/build/* app/static/

# Install Python Dependencies
RUN pip install -r requirements.txt
RUN pip install psycopg2

# Run flask environment
CMD gunicorn app:app
