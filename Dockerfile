FROM node:25-bullseye

WORKDIR /app

RUN npm install -g @nestjs/cli typescript prisma

ARG USER_ID=1000
ARG GROUP_ID=1000

RUN groupmod -g ${GROUP_ID} node && \
    usermod -u ${USER_ID} -g ${GROUP_ID} node && \
    chown -R node:node /app

USER node

COPY --chown=node:node package.json yarn.lock* ./

RUN yarn install --frozen-lockfile

COPY tsconfig*.json ./
COPY nest-cli.json ./

COPY prisma ./prisma

RUN yarn prisma generate

COPY --chown=node:node . .

CMD ["sleep", "infinity"]
