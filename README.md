# Simple user & user orders crup app with express, typescript, mongoose, zod & bcrypt

## Step-1\_ How To run this app in locally

#### FOLLOW THE INSTRUCTION BELLOW

- copy this line -------> `git clone https://github.com/habibur18/express-mongoose-zod-crud-api-assignment-2.git`
- Open your terminal select download directory and past the command
- Then open the project your code editor ---> vs code recommanded
- After go to `package.json file` and now you are able to see what dependecy need to run the app. And shortcut
- Then run this command for download all dendency -> `npm i `
- Then go to .env file and replace your `PORT` and MongoDB database URL`DB_URL` and also change `BCRYPT_SALT_ROUNDS`
- Then \`ctrl +\` to open your vs code terminal or if your use different code this shortcut may not work!
- Past `npm run dev` for convert .ts file to JavaScript file.
- Past this command to run app `npm run build` this will run nodemon dist/server.js file
- Then server will run.

## Step 2\_ Download `postman` if not installed.

## Step 3\_

- Go to `src/module/User/4_User_Routes.ts` file. Now you have idea about all routes
- And check all other files as weell
- Now If you check all routes correctly, you may know how application made and could work

# User ManageMent part-1:

## 1. Create a new user process:

- EndPoint: POST /api/users
- Request Body:
  ````
  {
   "userId": "number",
   "username": "string",
   "password": "string",
   "fullName": {
       "firstName": "string",
       "lastName": "string"
   },
   "age": "number",
   "email": "string",
   "isActive": "boolean",
   "hobbies": [
       "string",
       "string"
   ],
   "address": {
       "street": "string",
       "city": "string",
       "country": "string"
   }
  }```
  ````

### orders are optional when creating a user and order is extendable so user can add orders latter

- Response: Newly created user object. Password is not included in the response data.

```
{
    "success": true,
    "message": "User created successfully!",
    "data": {
        "userId": "number",
        "username": "string",
        "fullName": {
            "firstName": "string",
            "lastName": "string"
        },
        "age": "number",
        "email": "string",
        "isActive": "boolean",
        "hobbies": [
            "string",
            "string"
        ],
        "address": {
            "street": "string",
            "city": "string",
            "country": "string"
        }
    }
}
```

## 2. Retrieve a list of all users

- Endpost: Endpoint: GET /api/users
- Response: List of user objects. Each object only contain username, fullName, age, email, address.

```
{
    "success": true,
    "message": "Users fetched successfully!",
    "data": [
        {
            "username": "string",
            "fullName": {
                "firstName": "string",
                "lastName": "string"
            },
            "age": "number",
            "email": "string",
            "address": {
                "street": "string",
                "city": "string",
                "country": "string"
            }
        },
        // more objects...
    ]
}
```

## 3. Retrieve a specific user by ID

- Endpoint: GET /api/users/:userId
- Response: User object and the password field is not included in the response data. And if user not found then give error sample error down.

```
{
    "success": true,
    "message": "User fetched successfully!",
    "data": {
        "userId": "number",
        "username": "string",
        "fullName": {
            "firstName": "string",
            "lastName": "string"
        },
        "age": "number",
        "email": "string",
        "isActive": "boolean",
        "hobbies": [
            "string",
            "string"
        ],
        "address": {
            "street": "string",
            "city": "string",
            "country": "string"
        }
    }
}
```

## 4. Update user information

- Endpoint: PUT /api/users/:userId
- Request Body: Updated user data (similar structure as in user creation).
- Response: Updated user object and the password field is not included in the response data. If the userid can't find information about the user, it will show a clear message. I had use statics methods. I give errror in bellow error sample

```{
    "success": true,
    "message": "User updated successfully!",
    "data": {
        "userId": "number",
        "username": "string",
        "fullName": {
            "firstName": "string",
            "lastName": "string"
        },
        "age": "number",
        "email": "string",
        "isActive": "boolean",
        "hobbies": [
            "string",
            "string"
        ],
        "address": {
            "street": "string",
            "city": "string",
            "country": "string"
        }
    }
}
```

## 5. Delete a user

- Endpoint: DELETE /api/users/:userId
- Response: Success message or, If can't find information about the user, then it will show a clear message. I had use customs statics method to check user existence.

```
{
	"success": true,
	"message": "User deleted successfully!",
	"data" : null
}
```

# ##Order management part-2

## 1. Add New Product in Order

- Endpoint: PUT /api/users/:userId/orders

- Request Body: If can't find information about the user, then it will show a clear message. Used static method to display this error message. (Used the format for error messages that is given below.)

```
{
    "productName": "string",
    "price": "number",
    "quantity": "number"
}
```

- Response:
-

```
{
   "success": true,
   "message": "Order created successfully!",
   "data": null
}
```

## 2. Retrieve all orders for a specific user

- Endpoint: GET /api/users/:userId/orders
- Request Body: If can't find information about the user, then it will show a clear message. Used static method to display this error message. (Used the format for error messages that is given below.)
- Response:

```
{
    "success": true,
    "message": "Order fetched successfully!",
    "data": {
        "orders": [
            {
                "productName": "Product 1",
                "price": 23.56,
                "quantity": 2
            },
            {
                "productName": "Product 2",
                "price": 23.56,
                "quantity": 5
            }
        ]
    }
}
```

## 3. Calculate Total Price of Orders for a Specific User

- Endpoint: GET /api/users/:userId/orders/total-price
- Request Body: If can't find information about the user, then it will show a clear message. Used static method to display this error message. (Used the format for error messages that is given below.)
- Response:

```
{
    "success": true,
    "message": "Total price calculated successfully!",
    "data": {
        "totalPrice": 454.32
    }
}
```

# Sample Error Message:

```
{
    "success": false,
    "message": "User not found",
    "error": {
        "code": 404,
        "description": "User not found!"
    }
}
```

# That all about the crud App

#### Thanks for reading!
