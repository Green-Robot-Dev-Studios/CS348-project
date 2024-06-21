create table users
(
    id           char(36) default (uuid()) not null
        primary key,
    admin        int      default 4        null,
    email        varchar(255)              null,
    passwordHash varchar(255)              null,
    name         varchar(255)              not null,
    avatar       text                      null,
    googleId     varchar(255)              null,
    githubId     int                       null,
    constraint users_email_unique
        unique (email),
    constraint users_githubid_unique
        unique (githubId),
    constraint users_googleid_unique
        unique (googleId)
);

