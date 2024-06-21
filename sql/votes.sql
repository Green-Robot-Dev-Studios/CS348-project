create table votes
(
    id        char(36)  default (uuid())          not null
        primary key,
    userId    char(36)                            not null,
    roomId    char(36)                            not null,
    foodId    char(36)                            not null,
    timestamp timestamp default CURRENT_TIMESTAMP not null,
    approved  tinyint(1)                          not null,
    constraint votes_foodid_foreign
        foreign key (foodId) references food (id),
    constraint votes_roomid_foreign
        foreign key (roomId) references rooms (id),
    constraint votes_userid_foreign
        foreign key (userId) references users (id)
);

