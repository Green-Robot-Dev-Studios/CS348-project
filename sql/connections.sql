create table connections
(
    id     char(36)   default (uuid()) null,
    userId char(36)                    not null,
    roomId char(36)                    not null,
    ready  tinyint(1) default 0        not null,
    primary key (userId, roomId),
    constraint connections_roomid_foreign
        foreign key (roomId) references rooms (id),
    constraint connections_userid_foreign
        foreign key (userId) references users (id)
);

