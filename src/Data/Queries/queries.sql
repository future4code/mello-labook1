CREATE TABLE Users (
id VARCHAR(36) PRIMARY KEY, 
email VARCHAR(255) NOT NULL UNIQUE,
name VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL)

CREATE TABLE Friendships (
transaction_id VARCHAR(36) PRIMARY KEY,
user1 VARCHAR(36) NOT NULL,
user2 VARCHAR(36) NOT NULL,
status ENUM("pending", "OK") NOT NULL DEFAULT "pending",
FOREIGN KEY (user1) REFERENCES Users(id),
FOREIGN KEY (user2) REFERENCES Users(id)
)

CREATE TABLE Posts (
id VARCHAR(36) PRIMARY KEY, 
photo_url VARCHAR(255),
description TEXT NOT NULL,
likes INT NOT NULL DEFAULT 0,
type ENUM("Normal", "Evento") NOT NULL DEFAULT "Normal",
created_at DATE NOT NULL,
creator VARCHAR(36) NOT NULL,
FOREIGN KEY (creator) REFERENCES Users(id)
)

CREATE TABLE Posts_Comments (
id VARCHAR(36) PRIMARY KEY,
comment_creator VARCHAR(36) NOT NULL,
content TEXT NOT NULL,
created_at DATE NOT NULL,
post_id VARCHAR(36) NOT NULL, 
FOREIGN KEY (comment_creator) REFERENCES Users(id),
FOREIGN KEY (post_id) REFERENCES Posts(id)
)