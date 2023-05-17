# MERN Todo App Api Documentation
- [Overview](##Overview)
  - [Installation](###Installation)
- [Endpoints](##Endpoints)

## Overview
 A simple documentation explaining the various endpoints and how to get started with the backend

### Installation

1. Create the `.env` file at the root of the backend folder 
``` 
$ touch .env
```
the Environment variables needed to get the server up and runinng

- [ ] MONGO_DB_URL
- [ ] SECRET_KEY

***you can create a secret key by running the file `generateSecret.ts` in the utils folder.***

2. to get the server runinng  in your terminal
 ```
 $ npm install
 ```
then run the script
```
$ npm start
```

## Endpoints

base url : `/api/v1/`
for authentication include `x-access-token` in the request header and as the value pass in `Bearer <Token>`

### User
##### POST
1. Route : `/users/signup/`
Access: `Public`

for the request body in `json` pass in the following data to sign up a user.
```json
{
    "firstname":"John",
    "email":"johndoe@gmail.com",
    "password":"test123456"
}
```
***Note: does not have to be the same values***
if successful
```json
{
    "accessToken":"user token"
}
```
inside the `user token` is the id and users first name, after it has been decoded using jwt.

2. Route:  `/users/login`
Access : `Public`
for the request body in `json` pass in the following data to login as a user.
```json
{
    "email":"johndoe@gmail.com",
    "password":"test123456"
}
```
***Note: does not have to be the same values***
if successfull
```json
{
    "accessToken":"user token"
}
```

***Note: the token is only valid for 7 days***

##### PUT

Route : `/users/password`

Access : `Private`

for the request body in `json` pass in the following data to change password  for a user.
```json
{
    "oldPassword":"test123456",
    "newPassword":"password1234"
}
```
if successful
```json
{
    "message":"successfully changed user password."
}
```

##### DELETE

Route : `/users/:id`

Access : `Private`

pass in a valid user id gotten from the jwt token.

if successful
```json
{
    "message":"successfully deleted <firstname> account :("
}
```

### Categories 
##### Get
Route : `/users/categories/`

Access : `Private`

if successful 

```json
{
    "categories":[
        {
            "id":"categoryId1",
            "name":"categoryName1"
        }, {
            "id":"categoryId2",
            "name":"categoryName2"
        }
    ]
}
```
***Note: the category ids are important for requests on user todos***

##### Post
Route : `/users/categories/`

Access : `Private`

the name passed in for a category must be **unique**

for the request body in `json` pass in the following data to create a new category of todos for a user.
```json
{
   "name":"Groceries"
}
```
if successful 

```json
{
   
        
     {
            "id":"newCategoryId",
            "name":"Groceries"
        }
   
}
```

#### Put

Route : `/users/categories/:categoryId`

Access : `Private`

for the request body in `json` pass in the following data to update the name  of a category.

```json
{
   "name":"Shopping"
}
```

```json
{
   
        
     {
            "id":"newCategoryId",
            "name":"Shopping"
        }
   
}
```

##### DELETE

Route : `/users/categories/:categoryId`

Access : `Private`

pass in a valid categoryId in the request url.

***Note: deleting a category deletes all the users todos***
 let say categoryId1 was passw
if successful 

```json
{
    "categories":[
        {
            "id":"categoryId1",
            "name":"categoryName1"
        }, {
            "id":"categoryId2",
            "name":"categoryName2"
        }
    ]
}
```
