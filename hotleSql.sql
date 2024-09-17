
create database HotelDB;

go
use HotelDB

go

create table Peoples(
personID int identity(1,1) primary key, 
firstName nvarchar(20) not null,
lastName nvarchar(20) not null ,
brithDay DateTime not null,
createdDate Datetime default getDate(),
nationalNo nvarchar(15) not null
)

go

create table Departments(
departmentID int identity(1,1) primary key,
name  nvarchar(50) unique
)

insert into Departments(name)values('Room Service')

go
create table Employees(
employeeID int identity(1,1) primary key,
userName  nvarchar(50) null unique,
password  nvarchar(max)null,
departmentID int references Departments(departmentID),
personID int references Peoples(personID),
address nvarchar(200),
phone nvarchar(15) UNIQUE,
image nvarchar(max)  null,
isBlock bit default 0
)

go
create table RoomTypes(
roomTypeID int identity(1,1) primary key,
name  nvarchar(50) unique
)

go
create table Rooms(
roomID int identity(1,1) primary key,
roomTypeID int references RoomTypes(roomTypeID),
capacity SMALLINT not null,
bedNumber SMALLINT not null,
pricePerDay float not null,
--state SMALLINT not null,
addBy int references Employees(employeeID),
createdDate Datetime default getDate(),
floorNumber smallint not null,
description nvarchar(max),
title nvarchar(20),
 isRent bit DEFAULT 0
)

go 
create table RoomImages(
  roomImageID int identity(1,1) PRIMARY KEY,
  roomID int REFERENCES Rooms(roomID),
  imagePath nvarchar(max) 
)

go
create table Customers(
customerID int identity(1,1) primary key,
userName  nvarchar(50) null unique,
password  nvarchar(max)null,
personID int references Peoples(personID),
phone nvarchar(15) UNIQUE,
image nvarchar(max)  null,
isBlock bit default 0
)

select * from Employees

update Employees set token='' where employeeID=1
/*
go


create table FamilyRelations(
familyRelationID int identity(1,1)primary key,
name nvarchar(50) unique
)

go

create table Identities(
identityID int identity(1,1) primary key,
name nvarchar(50) unique
)

go
create table Customers(
customerID int identity(1,1) primary key,
addBy int references Employees(employeeID),
isBlock bit default 0,
personID int references Peoples(personID)
)


go



create function dbo.getEmployeeNameByPersonID(@personID int)returns nvarchar(max)
as 
  begin
  if @personID = 0
    BEGIN
     return 'none';
    END
  declare @FullName nvarchar(max);
  select @FullName = concat( firstName ,lastName, ' ') from Peoples where personID = @personID;
  return @FullName
  end

go
create function dbo.getEmployeeNameByID(@ID int)returns nvarchar(max)
as 
  begin
  if @ID = 0 or @ID is null
    BEGIN
     return 'none';
    END
  declare @FullName nvarchar(max);
  select @FullName = concat( p.firstName ,p.lastName, ' ') from Peoples p inner join Employees e on e.personID = p.personID and e.employeeID = @ID;
  return @FullName
  end





go

create function dbo.calculateEmployeeNumberInDepartment(@departmentID int)returns INT
as 
  begin
  declare @employeeNumber int;
  select @employeeNumber = (select count(*) from Employees where departmentID =@departmentID)
  return @employeeNumber ;
  end

go

create view Department_view as 
select  
departmentID,
name,
dbo.calculateEmployeeNumberInDepartment(departmentID)as employeeNumber
from Departments 


go

create view Employee_view as 
select 
e.employeeID ,
e.personID,
d.name as department,
e.userName ,
dbo.getEmployeeNameByPersonID(e.personID) as fullName,
Year(getdate())-Year(p.brithDay) as age,
cast (p.createdDate as nvarchar) as createdDate,
e.isBlock
from Employees e 
inner join Departments d
on e.departmentID = d.departmentID
inner join Peoples p 
on p.personID = e.personID;



go


create function dbo.getCustomerPersonID(@customerId int)returns int
as 
  begin
  if @customerId is null
    begin 
	 return 0;
	end
  declare @personID int;
  select @personID = c.personID from Customers c where customerID = @customerId;
  return @personID ;
  end


go

create view Customer_view as 
select 
c.customerID,
c.personID,
dbo.getEmployeeNameByPersonID(c.personID) as fullName,
c.isBlock,
p.createdDate as addDate,
case 
when c.addBy is null then 0
else c.addBy 
end as createdBy
from Customers c
inner join Peoples p
on c.personID = p.personID



go

create PROCEDURE  SP_deletEmployeeByID
    @personID int
as 
BEGIN
begin transaction;
begin try
     delete from Employees where personID = @personID;
     print'complate emplyee delete';
	 delete from Peoples where personID = @personID;
     commit;

end try
BEGIN catch
     print'hasError';

     ROLLBACK;
     DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
     DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
     DECLARE @ErrorState INT = ERROR_STATE();
	 Throw @ErrorMessage, @ErrorSeverity, @ErrorState;
END catch;

end;

go

create PROCEDURE  SP_deleteCustomer
    @personID int
as     
begin transaction;
begin try
     declare @id int;
	 set @id = 0;
	 select @id = customerID from Customers where personID = @personID;
	 delete from Customers where customerID = @id;
	 delete from Peoples where personID = @personID;
     commit;
	 return 1;
end try
BEGIN catch
     ROLLBACK;
     DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
     DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
     DECLARE @ErrorState INT = ERROR_STATE();
	 Throw @ErrorMessage, @ErrorSeverity, @ErrorState;
END catch;
     


go

create table Bookings(
bookingID int identity (1,1) primary key,
customerID int references Customers(customerID),
relationShip int references FamilyRelations(familyRelationID),
identityID int references Identities(identityID),
roomID int references Rooms(roomID),
addDate datetime default getdate(),
outDate DATETIME  null,
realDayOut DateTime null,
totalPrice DECIMAL(19,4) not null ,
firstPayment DECIMAL(19,4) not null,
reminderPayment DECIMAL(19,4)  not null,
adionalPayment DECIMAL(19,4) null,
isAvilable bit default 1,
addBy int references Employees(employeeID),
belongToBooking int references Bookings(bookingID),
)

go

create view booking_view as 
select 
b.bookingID,
b.customerID,
r.capacity,
(select COUNT(*) from Bookings where bookingID = b.bookingID or belongToBooking = b.bookingID)
as 'members',
case 
when b.belongToBooking is null then 0
else b.belongToBooking 
end as 'memberOf',
CONCAT(p.firstName,p.lastName , '  ') as fullName ,
fr.name as  relationShipe,
i.name as identityName,
p.nationalNo ,
YEAR(getdate())-YEAR(p.brithDay) as age,
b.addDate,
b.outDate,
b.isAvilable 
from Bookings b
inner join Customers c
on b.customerID = c.customerID
inner join FamilyRelations fr 
on b.relationShip = fr.familyRelationID
inner join Identities i
on i.identityID = b.identityID
inner join Peoples p 
on c.personID = p.personID
inner join Rooms r 
on b.roomID = r.roomID

--where b.belongToBooking is null


go

create function dbo.getbooking_by_belong (@BlongID int)returns table 
as 
return (select 
b.bookingID,
b.customerID,
CONCAT(p.firstName,p.lastName , '  ') as fullName ,
fr.name as  relationShipe,
i.name as identityName,
p.nationalNo ,
YEAR(getdate())-YEAR(p.brithDay) as age,
b.isAvilable 
from Bookings b
inner join Customers c
on b.customerID = c.customerID
inner join FamilyRelations fr 
on fr.familyRelationID = b.relationShip
inner join Identities i 
on b.identityID = i.identityID
inner join Peoples p 
on c.personID = p.personID 
)

go

CREATE PROCEDURE SP_joinCustomerToBooking
(
    @CustomerID INT,
    @BookingID INT,
    @AddBy INT
)

AS
BEGIN
    declare @Result int;
    insert  INTO Bookings
    (
        customerID,
        roomID,
        addDate,
        outDate,
        realDayOut,
        totalPrice,
        firstPayment,
        reminderPayment,
        adionalPayment,
        isAvilable,
        addBy,
        belongToBooking
    )
    SELECT
        @CustomerID,
        roomID,
        addDate, 
        outDate,
        realDayOut,
        totalPrice,
        firstPayment,
        reminderPayment,
        adionalPayment,
        isAvilable, 
         @AddBy,
        @bookingID 
    FROM Bookings
    WHERE bookingID = @BookingID; 
    SET @Result = @@ROWCOUNT;
	if @Result>0
	   begin
	     select SCOPE_IDENTITY();
	   end
    else
	  throw 10,'could not join Booking',1
END;

go 

create procedure sp_complateBooking
(@id int,@addBy int)
as 
declare @pricePerOneDay decimal;
select @pricePerOneDay = pricePerDay  from Rooms where roomID = (select roomID from Bookings where bookingID= @id);

begin transaction;
begin try
update Bookings  set 
outDate = getdate(),
reminderPayment =((day(addDate)-day(outDate))*@pricePerOneDay) - firstPayment,
adionalPayment = (select sum(fee)from Services where bookingID = @id),
isAvilable = 0,
addBy = @addBy
where bookingID = @id
select reminderPayment+adionalPayment as fullPayment from Bookings where bookingID = @id;
commit;
end try 
begin catch
    declare @ErrorMessage nvarchar(2024);
    select @ErrorMessage =ERROR_MESSAGE();
    rollback;
    throw 50001,@ErrorMessage,1
end catch;
	  


go

create table ServiceTypes(
serviceTypeID int identity(1,1) primary key,
name  nvarchar(100)not null unique,
fee  DECIMAL(19,4) not null,
addDate Datetime not null default getdate(),
addBy int references Employees(employeeID),
)

go

create table Services(
serviceID int identity(1,1) primary key,
serviceTypeID int references serviceTypes(serviceTypeID),
departmentID int references Departments(departmentID),
serveBy int references Employees(employeeID),
bookingId int references Bookings(bookingID),
fee  DECIMAL(19,4) not null,
addBy int references Employees(employeeID),
addDate Datetime not null default getdate(),
)

go

create trigger tr_isEmployee_Serv__Belgong_To_Department on Services
instead of  insert
as 
begin
declare @employeeId int,@departmentId int ,@isInDeparment bit;

set @isInDeparment = 0;

select  @departmentId = i.departmentID from inserted i ; 
select  @employeeId = i.serveBy from inserted i ; 

select @isInDeparment = 1 from Employees where departmentID = @departmentId and employeeID = @employeeId;
 if @isInDeparment = 0
    throw 50001,'employee not in that departmtnet',1
 else 
   insert into Services(addBy,departmentID,fee,serveBy,serviceID,serviceTypeID)
   select 
    i.addBy,
	i.departmentID,
	i.fee,
	i.serveBy,
	i.serviceID,
	i.serviceTypeID
	from inserted i ;

end


select * from Customers c
inner join Peoples p
on c.personID = p.personID

*/
