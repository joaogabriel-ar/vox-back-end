FROM node:25-bullseye

WORKDIR /app

RUN groupadd -r voxuser && useradd -r -g voxuser voxuser

RUN npm install -g @nestjs/cli typescript

COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile

COPY tsconfig*.json ./
COPY nest-cli.json ./

RUN chown -R voxuser:voxuser /app

USER voxuser
CMD ["yarn", "start:dev"]
