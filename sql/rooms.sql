create table rooms
(
    id           char(36) default (uuid()) not null
        primary key,
    picked       varchar(64)               null,
    longitude    double                    not null,
    latitude     double                    not null,
    searchNumber int                       not null,
    maxDistance  double                    not null,
    constraint rooms_picked_foreign
        foreign key (picked) references food (id)
);

