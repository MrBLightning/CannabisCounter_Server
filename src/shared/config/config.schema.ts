import * as Joi from '@hapi/joi';

export type AppConfig = {
    APP_NAME: string,
    APP_VERSION: string,
    PORT: number,
    HOST: string,
    SECRET: string,

    MYSQL_HOST: string,
    MYSQL_USER: string,
    MYSQL_PASS: string,
    MYSQL_DATABASE: string,

    STORAGE_FOLDER: string
}

export const ConfigSchema = Joi.object<AppConfig>({
    APP_VERSION: Joi.string().required(),
    APP_NAME: Joi.string().required(),
    PORT: Joi.number().port().default(6000),
    HOST: Joi.string().hostname().default("localhost"),
    SECRET: Joi.string().required(),

    MYSQL_HOST: Joi.alternatives().try(
        Joi.string().hostname(),
        Joi.string().ip()
    ).required(),
    MYSQL_USER: Joi.string().required(),
    MYSQL_PASS: Joi.string().required(),
    MYSQL_DATABASE: Joi.string().default("Admin"),

    STORAGE_FOLDER: Joi.string().required(),
})