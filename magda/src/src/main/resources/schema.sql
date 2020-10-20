/* create table users(
      username varchar_ignorecase(225) not null primary key,
      password varchar_ignorecase(50) not null,
      EMAIL VARCHAR(225),PHONE_NUMBER VARCHAR(225),GENDER VARCHAR(225),
      PERSONAL_IMAGE VARCHAR(225),BACKGROUND_IMAGE VARCHAR(225),BIRTH_DATE VARCHAR(225),
      enabled boolean not null);

  create table authorities (
      id int PRIMARY KEY AUTO_INCREMENT,
      username varchar_ignorecase(225) not null ,
      authority varchar_ignorecase(50) not null,
      constraint fk_authorities_users foreign key(username) references users(username));
      create unique index ix_auth_username on authorities (username,authority);*/

    /*  create table RECIPES(
      id int not null primary key,
      name varchar_ignorecase(50) not null primary key,
      description varchar_ignorecase(50) not null,
      imagepath not null);

  create table INGREDIENTS (
      id  int not null primary key,
      name varchar_ignorecase(50) not null,
      amount varchar_ignorecase(50) not null,
      recipe_id int not null,
      constraint fk_INGREDIENTS_RECIPES foreign key(recipe_id) references RECIPES(id));
      create unique index ind_ingredients on INGREDIENTS (name , amount);*/