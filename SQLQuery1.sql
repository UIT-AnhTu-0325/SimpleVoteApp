create database MyAppDB
use MyAppDB

SET DATEFORMAT dmy; 

create table Users (
	IDUser  INT IDENTITY(1,1) PRIMARY KEY,
	UserName varchar(50) NOT NULL,
	Password varchar (200) NOT NULL,
)

create table Posts (
	IDPost int IDENTITY(1,1) PRIMARY KEY, 
	Title varchar (50) NOT NULL,
	Content text NOT NULL, 
	SumVotes int default 0
)
	
create table Votes(
	IDVote int IDENTITY(1,1) PRIMARY KEY,
	IDUser int NOT NULL,
	IDPost int NOT NULL,
	VoteDate DateTime NOT NULL
)

CREATE TRIGGER trg_Voting ON Votes AFTER INSERT AS
BEGIN
	UPDATE Posts
	SET SumVotes += 1
	FROM Posts JOIN inserted ON Posts.IDPost= inserted.IDPost
END


alter table Votes
add constraint FK_UserVote
foreign key(IDUser) references Users(IDUser)
alter table Votes
add constraint FK_PostVote
foreign key(IDPost) references Posts(IDPost)

alter table Users
add constraint UC_Users UNIQUE (UserName)

/*fix database*/


select * from Posts
select * from Votes