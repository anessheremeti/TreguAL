create database TreguAL
USE TreguAL;
GO


CREATE TABLE Country (
    CountryId INT PRIMARY KEY IDENTITY(1,1),
    CountryName NVARCHAR(100) NOT NULL
);


CREATE TABLE [User] (
    UserId INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    CountryId INT NULL,
    Phone NVARCHAR(20),
    Status VARCHAR(20) CHECK (Status IN ('active','inactive','banned')) DEFAULT 'active',
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (CountryId) REFERENCES Country(CountryId)
);


CREATE TABLE Category (
    CategoryId INT PRIMARY KEY IDENTITY(1,1),
    CategoryName NVARCHAR(100) NOT NULL,
    ParentCategoryId INT NULL,
    FOREIGN KEY (ParentCategoryId) REFERENCES Category(CategoryId)
);


CREATE TABLE Product (
    ProductId INT PRIMARY KEY IDENTITY(1,1),
    ProductName NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX),
    Price DECIMAL(10,2),
    Condition VARCHAR(20) CHECK (Condition IN ('new','used')) DEFAULT 'used',
    CategoryId INT,
    UserId INT,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES [User](UserId),
    FOREIGN KEY (CategoryId) REFERENCES Category(CategoryId)
);


CREATE TABLE ProductImage (
    ImageId INT PRIMARY KEY IDENTITY(1,1),
    ProductId INT,
    ImageUrl NVARCHAR(500) NOT NULL,
    IsPrimary BIT DEFAULT 0,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (ProductId) REFERENCES Product(ProductId)
);


CREATE TABLE Favorite (
    FavoriteId INT PRIMARY KEY IDENTITY(1,1),
    UserId INT,
    ProductId INT,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES [User](UserId),
    FOREIGN KEY (ProductId) REFERENCES Product(ProductId),
    CONSTRAINT UQ_Favorite UNIQUE (UserId, ProductId)
);

CREATE TABLE Post (
    PostId INT PRIMARY KEY IDENTITY(1,1),
    ProductId INT,
    Title NVARCHAR(150) NOT NULL,
    Description NVARCHAR(MAX),
    Status VARCHAR(20) CHECK (Status IN ('active','sold','expired')) DEFAULT 'active',
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (ProductId) REFERENCES Product(ProductId)
);


CREATE TABLE Review (
    ReviewId INT PRIMARY KEY IDENTITY(1,1),
    UserId INT,
    ProductId INT,
    Rating INT CHECK (Rating BETWEEN 1 AND 5),
    Comment NVARCHAR(500),
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES [User](UserId),
    FOREIGN KEY (ProductId) REFERENCES Product(ProductId)
);


CREATE TABLE Verification (
    VerificationId INT PRIMARY KEY IDENTITY(1,1),
    UserId INT,
    Type VARCHAR(50),
    Status VARCHAR(20) CHECK (Status IN ('pending','verified','rejected')) DEFAULT 'pending',
    VerifiedAt DATETIME NULL,
    FOREIGN KEY (UserId) REFERENCES [User](UserId)
);


CREATE TABLE Ad (
    AdId INT PRIMARY KEY IDENTITY(1,1),
    ProductId INT,
    UserId INT,
    ImageId INT NULL,
    StartDate DATETIME DEFAULT GETDATE(),
    EndDate DATETIME,
    IsActive BIT DEFAULT 1,
    FOREIGN KEY (ProductId) REFERENCES Product(ProductId),
    FOREIGN KEY (UserId) REFERENCES [User](UserId),
    FOREIGN KEY (ImageId) REFERENCES ProductImage(ImageId)
);


CREATE TABLE Payment (
    PaymentId INT PRIMARY KEY IDENTITY(1,1),
    UserId INT,
    ProductId INT,
    Amount DECIMAL(10,2),
    Method VARCHAR(50) CHECK (Method IN ('card','paypal','cash')),
    Status VARCHAR(20) CHECK (Status IN ('pending','completed','failed')) DEFAULT 'pending',
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES [User](UserId),
    FOREIGN KEY (ProductId) REFERENCES Product(ProductId)
);


CREATE INDEX IX_Product_CategoryId ON Product(CategoryId);
CREATE INDEX IX_Product_UserId ON Product(UserId);
CREATE INDEX IX_Favorite_UserId ON Favorite(UserId);
CREATE INDEX IX_Post_ProductId ON Post(ProductId);
CREATE INDEX IX_Review_ProductId ON Review(ProductId);
CREATE INDEX IX_Ad_UserId ON Ad(UserId);
CREATE INDEX IX_Payment_UserId ON Payment(UserId);

GO
