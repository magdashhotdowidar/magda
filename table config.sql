npm install @fortawesome/fontawesome-free
npm install -g @angular/cli

create table users(
      username varchar_ignorecase(225) not null primary key,
      password varchar_ignorecase(50) not null,the_User_Admin varchar(225),
      EMAIL VARCHAR(225),PHONE_NUMBER VARCHAR(225),GENDER VARCHAR(225),
      PERSONAL_IMAGE VARCHAR(225),BACKGROUND_IMAGE VARCHAR(225),BIRTH_DATE VARCHAR(225),
      enabled boolean not null);

  create table authorities (
      id int PRIMARY KEY AUTO_INCREMENT,
      username varchar_ignorecase(225) not null ,
      authority varchar_ignorecase(50) not null,
      constraint fk_authorities_users foreign key(username) references users(username));
      create unique index ix_auth_username on authorities (username,authority);
	  
INSERT INTO users (username,password,enabled,the_User_Admin) VALUES('user','pass',true,'ahmed');
INSERT INTO users (username,password,enabled,the_User_Admin) VALUES('ahmed','saber',true,'ahmed');
INSERT INTO users (username,password,enabled,the_User_Admin) VALUES('omar','omar',true,'ahmed');
INSERT INTO users (username,password,enabled,the_User_Admin) VALUES('ww','ww',true,'ww');

INSERT INTO authorities (username,authority) VALUES('omar','ROLE_SELLER');
INSERT INTO authorities (username,authority) VALUES('user','ROLE_USER');
INSERT INTO authorities (username,authority) VALUES('ww','ROLE_ADMIN');
INSERT INTO authorities (username,authority) VALUES('ahmed','ROLE_ADMIN');

create table USER_TABLE(
id int PRIMARY KEY AUTO_INCREMENT,
name varchar(20),
email varchar(20),
experience int
dom varchar(20),
)

create table blockedusers(
id int PRIMARY KEY AUTO_INCREMENT,
blocked_user varchar(225),
blocker_user varchar(225)
)
create table posts(
id int PRIMARY KEY AUTO_INCREMENT,
publisher varchar(220),
message varchar(220),
pic_name varchar(220),
user_pic_name varchar(220),
message_date varchar(220)
)
create table product(
name varchar(220),
THE_ADMIN varchar(220),
Brand varchar(220),
Description varchar(220),
Category varchar(220),
Amount int,
Price decimal(9,2),
Image_Name varchar(220),
PRIMARY KEY(name,THE_ADMIN)
)
create table carts(
id int PRIMARY KEY AUTO_INCREMENT,
product_Name varchar(220),
product_Amount int,
product_Price decimal(9,2),
total decimal (9,2),
Cart_User varchar(220),
Image_Name varchar(220)
)
create table INVOICES(
      id int PRIMARY KEY AUTO_INCREMENT,
      user_Name varchar_ignorecase(50) not null ,
      customer_Name varchar_ignorecase(50) not null,
      date Date not null);

  create table INVOICE_PRODUCTS (
      id  int PRIMARY KEY AUTO_INCREMENT,
      name varchar_ignorecase(50) not null,
	  amount int not null,
      price decimal(9,2) not null,
      invoice_id int not null,
      constraint fk_INVOICE_PRODUCTS_INVOICES foreign key(invoice_id) references INVOICES(id));
	  
	  create table INGR (
      id  int not null primary key,
      name varchar_ignorecase(50) not null,
      amount varchar_ignorecase(50) not null,
      recipe_id int not null,
      constraint fk_INGREDIENTS_RECIPES foreign key(recipe_id references RECIPES(id));
      

select * from
recipes 
left join ingredients
on recipes.id= ingredients.recipe_id

The following SQL statement lists the number of customers in each country,
 sorted high to low (Only include countries with more than 5 customers
 
SELECT COUNT(CustomerID), Country
FROM Customers
GROUP BY Country
HAVING COUNT(CustomerID) > 5
ORDER BY COUNT(CustomerID) DESC;

alter table users drop column(
personal_Image,background_Image,phone_Number,gender,email,birth_Date)

ALTER TABLE USERS   
ADD (EMAIL VARCHAR(225),PHONE_NUMBER VARCHAR(225),GENDER VARCHAR(225),
      PERSONAL_IMAGE VARCHAR(225),BACKGROUND_IMAGE VARCHAR(225),BIRTH_DATE VARCHAR(225)
	  )
	  
ALTER TABLE product
ADD the_admin VARCHAR(225);
update product set the_admin ='ahmed';

