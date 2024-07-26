# BloapgApp APIs 
BaseUrl : /v1/api

User APIs 
POST: /user/signUp
    {
        "username" : "User's username is required",
        "email" : "User's email is required",
        "phone" : "User's phone number is required",
        "password" : "User's password is required",
        "address" : {
            "addressLine1" : "adress line 1 is required",
            "addressLine2" : "adress line 2 is optional",
            "city" : "city is required,
            "state" : "state is required",
            "pincode" : "pincode is required",
            "country" : "country is required"
        }
    }
POST: /user/logIn
    {
        "email" : "User's email is required",
        "password" : "User's password is required"
    }
GET: /user/profile
    Headers : {
        authorization : "Bearer < token >"
    }

Blog APIs
POST:/blog/create
{
    "title": "Blog Title",
    "content": "Blog Content",
    "tags": [
        "tag1",
        "tag2"...
    ]
}
GET: /blog/:id
PUT: /blog/update/:id
DELETE: /blog/delete/:id

Comment APIs
POST: /comment/create
    {
        "content" : "your comment is required",
        "commentTo" : "id of the blog or comment on which you want to comment"
    }
GET: /comment/:id
PUT: /comment/update/:id
DELETE: /comment/delete/:id