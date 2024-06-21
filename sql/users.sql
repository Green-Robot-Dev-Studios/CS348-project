create table users
(
    id           char(36) default (uuid()) not null
        primary key,
    admin        int      default 4        null,
    email        varchar(255)              null,
    passwordHash varchar(255)              null,
    name         text                      null,
    avatar       text                      null,
    googleId     varchar(255)              null,
    githubId     int                       null,
    constraint users_email_unique
        unique (email)
);

