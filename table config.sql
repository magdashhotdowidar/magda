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
/////////////////////////////
create table doctors(
id int PRIMARY KEY AUTO_INCREMENT,
first_name varchar(20),
last_name varchar(30),
speciality varchar(30)
)
create table patients(
id int PRIMARY KEY AUTO_INCREMENT,
first_name varchar(20),
last_name varchar(30),
phone varchar(30),
doctor_id int not null,
FOREIGN KEY (doctor_id)REFERENCES doctors(id)
)
create table appointments(
id int PRIMARY KEY AUTO_INCREMENT,
patient_id int,
doctor_id int,
appointment_time datetime,
started TINYINT(1),
ended TINYINT(1),
reason varchar(200),
FOREIGN KEY (patient_id)REFERENCES patients(id),
FOREIGN KEY (doctor_id)REFERENCES doctors(id)
)
///////////////////////////
create table vehicles(
id int PRIMARY KEY AUTO_INCREMENT,
plate_number varchar(15),
number_of_tires int,
price int ,
daily_fee int 
);
create table vehicles_trans(
trans_id int PRIMARY KEY AUTO_INCREMENT,
plate_num varchar(20),
start_date varchar(25),
end_date varchar(20)
  );
  create table reservations(
id int PRIMARY KEY AUTO_INCREMENT,
plate_num varchar(20),
start_date varchar(25),
end_date varchar(20),
employee varchar(220),
customer varchar(220),
reservation_type varchar(20),
transaction_id int not null,
constraint fk_Transaction_reservation foreign key(transaction_id) references vehicles_trans(trans_id)
  );
    create table locations (
      id  int PRIMARY KEY AUTO_INCREMENT,
      location varchar_ignorecase(250),
      reservation_id int not null,
       foreign key(reservation_id) references reservations(id)
	  );
    create table cancellations(
id int PRIMARY KEY AUTO_INCREMENT,
plate_num varchar(20),
start_date varchar(25),
end_date varchar(20),
employee varchar(220),
customer varchar(220),
transaction_id int not null,
 foreign key(transaction_id) references vehicles_trans(trans_id)
  );
create table cars(
id int not null,
color varchar(25),
seating_cap int ,
num_of_doors int ,
deliver_Dropping_off_remotely boolean,
  constraint fk_vehicles_cars foreign key(id) references vehicles(id)
  );
  create table trucks(
id int not null,
loading_cap int ,
  constraint fk_vehicles_trucks foreign key(id) references vehicles(id)
  );
    create table sports_cars(
id int not null,
horsepower_HP int ,
 foreign key (id) references cars
  );
  create table suv_cars(
id int not null,
wheel_drive_type varchar(30) ,
  foreign key(id) references cars(id)
  );
    create table sw_cars(
id int not null,
loading_cap int ,
  foreign key(id) references cars(id)
  );
      create table small_truck(
id int not null,
  foreign key(id) references trucks(id)
  );
  create table transport_truck(
id int not null,
goes_abroad boolean ,
  foreign key(id) references trucks(id)
  );
///////////////////////
create table taps(
id int PRIMARY KEY AUTO_INCREMENT,
title varchar(100)
);
create table links(
id int PRIMARY KEY AUTO_INCREMENT,
label varchar(200),
tab_id int not null,
  constraint fk_tap_links foreign key(tab_id) references taps(id));
  
  create table paragraphs(
  id int PRIMARY KEY AUTO_INCREMENT,
  header varchar(500),
  paragraph varchar(6300),
  tutorial_file varchar(300),
  link_id int not null,
    constraint fk_link_paragraphs foreign key(link_id) references links(id));
	
  create table videos(
   id int PRIMARY KEY AUTO_INCREMENT,
   name varchar(220),
   channel varchar(220),
   uploadDate varchar(220),
   views LONG
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
      constraint fk_INGREDIENTS_RECIPES foreign key(recipe_id) references RECIPES(id));
      

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

ALTER TABLE vehicles   
ADD (image_Name VARCHAR(225),vehicle_type VARCHAR(40))
	  
ALTER TABLE appointments
ADD appointment_date datetime;
update appointments set appointment_date ='20-9-2021';

