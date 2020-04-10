# Restaurant_RESTApi
* [HTTP Verbs](#http-verbs)
* [Error handling](#error-handling)
* [Request & Response Examples](#all-endpoints-and-request/reponse-examples)
    * [Comps](#comps)
    * [Coupons](#coupons)
    * [Employees](#employees)
    * [Ingredients](#ingredients)
    * [MenuItems](#menuItems)
    * [Notifications](#notifications)
    * [Orders](#orders)
    * [Shifts](#Shifts)
    * [Tables](#tables)
    * [Tips](#tips)
    * [Users](#user)

## HTTP Verbs

The idea behind RESTful APIs is that it follows some sort of formatting structure that is consistent throughout this and other APIs. below is an example of how one my structure the urls and kinds of requests. 

| HTTP METHOD | POST            | GET       | PUT         | DELETE |
| ----------- | --------------- | --------- | ----------- | ------ |
| CRUD OP     | CREATE          | READ      | UPDATE      | DELETE |
| /dogs       | Create new dogs | List dogs | Bulk update | Delete all dogs |
| /dogs/1234  | Error           | Show Bo   | If exists, update Bo; If not, error | Delete Bo |

(Example from Web API Design, by Brian Mulloy, Apigee.)


## Errors

There are generally three common response codes indicating (1) success, (2) failure due to client-side problem, (3) failure due to server-side problem:
* 200s - OK
* 400s - Bad Request
* 500s - Internal Server Error

## Endpoints and Request/Reponse Examples

### /comps
Base endpoint: https://dijkstras-steakhouse-restapi.herokuapp.com/comps

#### GET Request
Response body:

    {
        "comps": [
            {
                "_id": "5e8695b0cb2a6e3de83a7321",
                "employee_id": "5e8633fa467af70368376280",
                "menuItem_id": "5e8660d161b17c0004e46c8a",
                "createdAt": "2020-04-03T01:47:28.470Z",
                "updatedAt": "2020-04-03T01:50:12.273Z",
                "__v": 0
            },
            {
                "_id": "5e8696a130bee63bacf02722",
                "employee_id": "5e850b90c849ed00047b4ec9",
                "menuItem_id": "5e850b90c849ed00047b4ec9",
                "createdAt": "2020-04-03T01:51:29.344Z",
                "updatedAt": "2020-04-03T01:51:29.344Z",
                "__v": 0
            }
        ]
    }    

To GET all comps for a specific employee request from /employees/{employee_id} where {employee_id} is replaced with a valid employee id
    

#### POST Request
Request body:
    
    {
    	"employee_id": "5e850b90c849ed00047b4ec9",
    	"menuItem_id": "5e865ed02eccf8000445d5f2"
    }

#### PUT Request
Send request to /ingredients/{ingredient_id}    
Request body:
    
    [
    	{"propName":"employee_id", "value":"5e8633fa467af70368376280"},
    	{"propName":"menuItem_id", "value":"5e8660d161b17c0004e46c8a"}
    ]

#### DELETE Request  
Request body:


### /coupons

Base endpoint: https://dijkstras-steakhouse-restapi.herokuapp.com/coupons

#### GET Request
Response body:
    
   {
        "coupons": [
            {
                "requiredItems": [
                    "5e865ed02eccf8000445d5f2",
                    "5e8660d161b17c0004e46c8a"
                ],
                "appliedItems": [
                    "5e865ed02eccf8000445d5f2",
                    "5e8660d161b17c0004e46c8a"
                ],
                "active": true,
                "_id": "5e8aac098365003f886a922b",
                "couponType": "Customer",
                "discount": 100,
                "repeatable": false,
                "__v": 0
            }
        ]
    }

For a single ingredient send request to /ingredients/{ingredient_id}    

#### POST Request
Request body:
    
    {
	    "couponType": "Customer",
	    "requiredItems": [
	    	{"_id": "5e865ed02eccf8000445d5f2"},
	    	{"_id": "5e8660d161b17c0004e46c8a"}
	    	],
	    "appliedItems": [
	    	{"_id": "5e865ed02eccf8000445d5f2"},
	    	{"_id": "5e8660d161b17c0004e46c8a"}
	    	],
	    "discount": "100",
	    "active": "true",
	    "repeatable": "false"
    }

#### PUT Request
Send request to /ingredients/{ingredient_id}    
Request body:
    
    [
        {"propName": "name", "value": "Some other name"},
        {"propName": "quantity", "value": "15"},
    ]

#### DELETE Request  
Request body:


### /employees
Base endpoint: https://dijkstras-steakhouse-restapi.herokuapp.com/employees

#### GET Request
Response body:
    
    {
        "employees": [
            {
                "tables": [],
                "_id": "5e840707764c1d4504ea1fa0",
                "first_name": "Anthony",
                "last_name": "Hanel",
                "email": "testemail02@gmail.com",
                "password": "$2b$10$eJULvWZqQRanThpC8ntuJCz7w5HOzBQuxFdaLhZ1FJhSbrG9heFC",
                "position": 1,
                "__v": 0
            }
        ]
    }

For a single employee send request to /employees/{employee_id} 

#### POST Request
Request body:
    
    {
	    // list of table ideas in an array as well
        "first_name": "Anthony",
	    "last_name": "Hanel",
	    "email": "testemail02@gmail.com",
	    "password": "fakepassword",
	    "position": "1"
    }

https://dijkstras-steakhouse-restapi.herokuapp.com/employees/authentication
If you want to see if a single employee exists (for signing in) then send this to the same /employees endpoint. This will either return null if a employee wasn't found or the employee object that was found.
Request body:

    {
	    "username": "testemail02@gmail.com",
	    "password": "password"
    }

#### PUT Request
Send request to /employees/{employee_id}    
Request body:
    
    [
        {"propName": "name", "value": "Some other name"},
        {"propName": "quantity", "value": "15"},
    ]

#### DELETE Request  
Just send the delete request to /employess/{employeeId} where {employeeId} is replaced with an ID

### /ingredients

Base endpoint: https://dijkstras-steakhouse-restapi.herokuapp.com/ingredients

#### GET Request
Response body:
    
    {
    "doc": [
        {
            "_id": "5e7e68fc188294181cad7dec",
            "name": "carrots",
            "quantity": 254,
            "__v": 0
        },
        {
            "_id": "5e7fa943016004000436733c",
            "name": "steak",
            "quantity": 69,
            "__v": 0
        },
        ]
    }

For a single ingredient send request to /ingredients/{ingredient_id}    

#### POST Request
Request body:
    
    {
        "name": "Some ingredient name",
        "quantity": "12" 
    }

#### PUT Request
Send request to /ingredients/{ingredient_id}    
Request body:
    
    [
        {"propName": "name", "value": "Some other name"},
        {"propName": "quantity", "value": "15"},
    ]

#### DELETE Request  
Request body:
    


### /menuItems
Base endpoint: https://dijkstras-steakhouse-restapi.herokuapp.com/menuItems

#### GET Request
Response body:
    
    {
    "menuItems": [
        {
            "ingredients": [
                {
                    "_id": "5e7fd964a3ba2c0004dda62c",
                    "name": "Potatos"
                },
                {
                    "_id": "5e7fa943016004000436733c",
                    "name": "steak"
                }
            ],
            "_id": "5e80333bc4d4630d9c47c799",
            "name": "Serlion and ",
            "picture": "This will be a picture",
            "description": "This is a steak and some potatoes",
            "price": 29.99,
            "nutrition": "Meat, caloires",
            "item_type": "Steak",
            "category": "Entree",
            "paid": false,
            "__v": 0
        },
        {
            "ingredients": [
                {
                    "_id": "5e7faa3e016004000436733d",
                    "name": "eggs"
                },
                {
                    "_id": "5e7fa943016004000436733c",
                    "name": "steak"
                }
            ],
            "_id": "5e803477bef467215ca98b9d",
            "name": "Steak and eggs ",
            "picture": "This will be a picture",
            "description": "This is a steak and some potatoes",
            "price": 29.99,
            "nutrition": "Meat, caloires",
            "item_type": "Steak",
            "category": "Entree",
            "paid": false,
            "__v": 0
        }
    ]
    }

For a single menuItem send request to /menuItems/{menuItem_id}    

#### POST Request
Request body:
    
    {
    	"ingredients": [
    		{"_id": "5e7faa3e016004000436733d"},
    		{"_id": "5e7fa943016004000436733c"}
    		],
        "name": "Steak and eggs " ,
        "picture": "This will be a picture" ,
        "description": "This is a steak and some potatoes",
        "price": "29.99",
        "nutrition": "Meat, caloires" ,
        "item_type": "Steak" ,
        "category": "Entree",
        "paid": "0",
        "special_instruct": "I want this to be medium-well" 
    }

#### PUT Request
Send request to /menuItems/{menuItem_id}    
Request body:
    
    [
        {"propName": "name", "value": "Some other name"},
        {"propName": "quantity", "value": "15"},
    ]

#### DELETE Request  
Request body:
    



### /notifications
Base endpoint: https://dijkstras-steakhouse-restapi.herokuapp.com/notifications

#### GET Request
Getting every notification in the database
Response body:

    {
        "notifications": [
            {
                "_id": "5e8665dec524770de4b3fa5f",
                "employee_id": "5e85f4c18017ef0004ea6f3b",
                "sender": "Table 5",
                "notificationType": "Refill",
                "__v": 0
            },
            {
                "_id": "5e86695aca77c23f90105f62",
                "employee_id": "5e85f4c18017ef0004ea6f3b",
                "sender": "Kitchen",
                "notificationType": "Question",
                "__v": 0
            },
            {
                "_id": "5e866a6bca77c23f90105f63",
                "employee_id": "5e8633fa467af70368376280",
                "sender": "Table2",
                "notificationType": "Help",
                "__v": 0
            }
        ]
    }

Getting everynotification for a specific employee. Send get request to /notifications/{employee_id} and replace the {employee_id} with a valid ID of an employee
Response body:

    {
        "notifications": [
            {
                "_id": "5e8665dec524770de4b3fa5f",
                "employee_id": "5e85f4c18017ef0004ea6f3b",
                "sender": "Table 5",
                "notificationType": "Refill",
                "__v": 0
            },
            {
                "_id": "5e86695aca77c23f90105f62",
                "employee_id": "5e85f4c18017ef0004ea6f3b",
                "sender": "Kitchen",
                "notificationType": "Question",
                "__v": 0
            }
        ]
    }
    
#### POST Request
Request body:
   
    {
	    "employee_id": "5e85f4c18017ef0004ea6f3b",
	    "sender": "Kitchen",
	    "notificationType": "Question"
    }

#### PUT Request
Send request to /notifications/{notification_id}    
Request body:
    
    [
    	{"propName":"sender", "value":"Table 5"},
    	{"propName":"notificationType", "value":"Refill"}
    ]

#### DELETE Request  
Just send the delete request to /notifications/{notification_id} where {notification_id} is replaced with an ID

### /orders
Base endpoint: https://dijkstras-steakhouse-restapi.herokuapp.com/orders

#### GET Request
Response body:

    {
        "Orders": [
            {
                "_id": "5e852a47908ad93e74b040d3",
                "menuItems": [
                    {
                        "ingredients": [
                            "5e7faa3e016004000436733d",
                            "5e7fa943016004000436733c"
                        ],
                        "name": "Steak and eggs ",
                        "picture": "This will be a picture",
                        "description": "This is a steak and some potatoes",
                        "price": 29.99,
                        "nutrition": "Meat, caloires",
                        "item_type": "Steak",
                        "category": "Entree",
                        "paid": false,
                        "special_instruct": "I want this to be medium-well"
                    }
                ],
                "createdAt": "2020-04-01T23:56:55.456Z",
                "updatedAt": "2020-04-01T23:56:55.456Z",
                "__v": 0
            },
            {
                "_id": "5e852d8680350304c823297b",
                "menuItems": [
                    {
                        "ingredients": [
                            "5e7faa3e016004000436733d",
                            "5e7fa943016004000436733c"
                        ],
                        "name": "Steak and eggs ",
                        "picture": "This will be a picture",
                        "description": "This is a steak and some potatoes",
                        "price": 29.99,
                        "nutrition": "Meat, caloires",
                        "item_type": "Steak",
                        "category": "Entree",
                        "paid": false,
                        "special_instruct": "I want this to be medium-well"
                    }
                ],
                "createdAt": "2020-04-02T00:10:46.495Z",
                "updatedAt": "2020-04-02T00:10:46.495Z",
                "__v": 0
            }
        ]
    }

#### POST Request
Request body:
    
    {
	    "menuItems": [
	    	{
	    		"ingredients": [
						{"_id": "5e7faa3e016004000436733d"},
						{"_id": "5e7fa943016004000436733c"}
					],
    			"name": "Steak and eggs " ,
    			"picture": "This will be a picture" ,
    			"description": "This is a steak and some potatoes",
    			"price": "29.99",
    			"nutrition": "Meat, caloires" ,
    			"item_type": "Steak" ,
    			"category": "Entree",
    			"paid": "0",
    			"special_instruct": "I want this to be medium-well" 	
	    	}
	    ]
    }

#### PUT Request
Send request to /orders/{order_id}    
Request body:

#### DELETE Request  
Request body



    
### /shifts
Base endpoint: https://dijkstras-steakhouse-restapi.herokuapp.com/shifts

#### GET Request
Getting all shifts in the database
Response body:

    {
        "shifts": [
            {
                "_id": "5e867421881b0d50e0bc0273",
                "employee_id": "5e8633fa467af70368376280",
                "clock_in": "2020-04-02T23:24:17.510Z",
                "__v": 0
            },
            {
                "_id": "5e86747f554393381872ec4a",
                "employee_id": "5e850b90c849ed00047b4ec9",
                "clock_in": "2020-04-02T23:25:51.756Z",
                "__v": 0
            }
        ]
    }

Getting all shifts for a single employee. Send GET request with shift ID to /shifts/{shiftId} where the ID replaces {shiftIf}

#### POST Request
Request body:
    
    {
    	"employee_id": "5e850b90c849ed00047b4ec9"
    }

#### PUT Request
Send request to /shifts/{shift_id}    
Request body:

I had to use postmans Pre-script tab to produce the time stamp 

Pre-script Tab

    {
        var current_timestamp = new Date();
        postman.setEnvironmentVariable("current_timestamp", current_timestamp.toISOString());
    }

Patch request

    [
        {"propName": "clock_out", "value": "{{current_timestamp}}"}
    ]


#### DELETE Request  
Request body:

### /tables
Base endpoint: https://dijkstras-steakhouse-restapi.herokuapp.com/tables

#### GET Request
Returns all tables with their object populated
Response body:
    
    "tables": [
        {
            "user_ids": [],
            "_id": "5e840f5706c59636ccf6b10c",
            "table_number": "1",
            "employee_id": "5e8651fc2d493750d0bc14d7",
            "__v": 0,
            "order_id": {
                "send_to_kitchen": true,
                "_id": "5e852a47908ad93e74b040d3",
                "menuItems": [
                    {
                        "ingredients": [],
                        "prepared": false,
                        "paid": true,
                        "special_instruct": "add more steak",
                        "name": "Steak and eggs ",
                        "price": 29.99,
                        "_id": "5e865ed02eccf8000445d5f2"
                    }
                ],
                "createdAt": "2020-04-01T23:56:55.456Z",
                "updatedAt": "2020-04-09T23:55:08.254Z",
                "__v": 0
            }
        },
        {
            "user_ids": [],
            "_id": "5e851121c849ed00047b4ed3",
            "table_number": "2",
            "employee_id": "5e840707764c1d4504ea1fa0",
            "__v": 0,
            "order_id": {
                "send_to_kitchen": true,
                "_id": "5e8cd7b29eaf153a20af68a3",
                "menuItems": [
                    {
                        "ingredients": [],
                        "prepared": false,
                        "paid": true,
                        "special_instruct": "more steak",
                        "name": "Steak and eggs ",
                        "price": 29.99,
                        "_id": "5e865ed02eccf8000445d5f2"
                    },
                    {
                        "ingredients": [
                            "5e852fca070c080004bc03db"
                        ],
                        "prepared": false,
                        "paid": true,
                        "special_instruct": "sgjeng",
                        "name": "Omelette du Waitstaff",
                        "price": 19.99,
                        "_id": "5e8660d161b17c0004e46c8a"
                    }
                ],
                "createdAt": "2020-04-07T19:42:42.478Z",
                "updatedAt": "2020-04-10T02:34:52.687Z",
                "__v": 0
            }
        },
        {
            "user_ids": [],
            "_id": "5e8515c59fbc2b0004b279f7",
            "table_number": "3",
            "employee_id": "5e840707764c1d4504ea1fa0",
            "__v": 0,
            "order_id": {
                "send_to_kitchen": false,
                "_id": "5e8cd80fee007044c0c3b090",
                "menuItems": null,
                "createdAt": "2020-04-07T19:44:15.095Z",
                "updatedAt": "2020-04-07T19:44:15.095Z",
                "__v": 0
            }
        },
        {
            "user_ids": [],
            "_id": "5e8515de9fbc2b0004b279fa",
            "table_number": "6",
            "employee_id": "5e840707764c1d4504ea1fa0",
            "__v": 0,
            "order_id": null
        }

There will also be a GET for an employee to view all tables with or without an order. This GET will return a table object without the order object being populated.

    "tables": [
            {
                "user_ids": [],
                "_id": "5e840f5706c59636ccf6b10c",
                "table_number": "1",
                "employee_id": "5e8651fc2d493750d0bc14d7",
                "__v": 0,
                "order_id": "5e852a47908ad93e74b040d3"
            },
            {
                "user_ids": [],
                "_id": "5e851121c849ed00047b4ed3",
                "table_number": "2",
                "employee_id": "5e840707764c1d4504ea1fa0",
                "__v": 0,
                "order_id": "5e8cd7b29eaf153a20af68a3"
            },
            {
                "user_ids": [],
                "_id": "5e8515de9fbc2b0004b279fa",
                "table_number": "3",
                "employee_id": "5e840707764c1d4504ea1fa0",
                "__v": 0,
                "order_id": null
        }
    ]

To view a single table then send request to /tables/employeeview/{table_id}. This will return a table without changing any data. 
Reponse body:

    {
        "user_ids": [],
        "_id": "5e85165d9fbc2b0004b279fc",
        "table_number": "8",
        "employee_id": "5e840707764c1d4504ea1fa0",
        "__v": 0,
        "order_id": null
    }

If you want to view a table and have an order connected to the table instead of null this endpoint will create and link a new, empty order to the table if an order does not already exist. Send GET request to /tables/{table_number} where {table_number} is relaced with an interger like "5"
Reponse body: 

    {
        "user_ids": [],
        "_id": "5e8515d69fbc2b0004b279f9",
        "table_number": "5",
        "employee_id": "5e840707764c1d4504ea1fa0",
        "__v": 0,
        "order_id": "5e8cda76ee007044c0c3b091"
    }


#### POST Request
Request body:
    
    {
	    "employee_id": "5e840707764c1d4504ea1fa0",
	    "table_number": "1"
        //add some order_id
        //add some array of user_ids
    }

#### PUT Request
Send request to /tables/{table_id}    
Request body:
    
    [
        {"propName": "name", "value": "Some other name"},
        {"propName": "quantity", "value": "15"},
    ]

#### DELETE Request
Request body:


### /tips
Base endpoint: https://dijkstras-steakhouse-restapi.herokuapp.com/tips

#### GET Request
Response body:

    {
        "tips": [
            {
                "_id": "5e90c9999cc2254a88c69d33",
                "employee_id": "5e8e6d4b9696520004639e73",
                "tip_amount": 1.99,
                "createdAt": "2020-04-10T19:31:37.554Z",
                "updatedAt": "2020-04-10T19:32:53.013Z",
                "__v": 0
            },
            {
                "_id": "5e90ce7a0e82082d98c6dc1d",
                "employee_id": "5e8e6d4b9696520004639e73",
                "tip_amount": 3.6,
                "createdAt": "2020-04-10T19:52:26.804Z",
                "updatedAt": "2020-04-10T19:52:26.804Z",
                "__v": 0
            }
        ]
    }

To GET all tips for a specific employee request from /employees/{employee_id} where {employee_id} is replaced with a valid employee id

#### POST Request
Request body:
    
    {
	    "employee_id": "5e8e6d4b9696520004639e73",
	    "tip_amount": "2.75"
    }

#### PUT Request
Send request to /comps/{comp_id}    
Request body:
    
    [
	    {"propName":"tip_amount", "value":"1.99"}
    ]

#### DELETE Request  
Request body:



### /user
Base endpoint: https://dijkstras-steakhouse-restapi.herokuapp.com/user

#### GET Request
Response body:
    
    {
        "users": [
            {
                "_id": "5e7fb9268cdb75342c869e87",
                "first_name": "John",
                "last_name": "Smith",
                "email": "JohnSmith01@gmail.com",
                "password": "$2b$10$tuENl1R6wJbPvYUsat5.6ulKNBk7NHbXnBx93OlypmjF49fKASMBa",
                "birthday": "1971-09-22T00:00:00.000Z",
                "__v": 0
            }
        ]
    }


#### POST Requests
https://dijkstras-steakhouse-restapi.herokuapp.com/user/signup

If you want to create a user then side post request to above URL
Request body:
    
    {
	    "first_name": "John",
        "last_name": "Smith",
        "email": "JohnSmith01@gmail.com",
        "password": "johnysmithy",
        "birthday": "1971-09-22T00:00:00Z"
    }

https://dijkstras-steakhouse-restapi.herokuapp.com/user/authentication
If you want to see if a single user exists (for signing in) then send this to the same /user endpoint. This will either return null if a user wasn't found or the user that was found.
    
    {
        "email": "JohnSmith03@gmail.com",
        "password": "johnysmithy"
    }

#### PUT Request
Send request to /user/{user_id}     
Request body:
    
    [
        {"propName": "name", "value": "Some other name"},
        {"propName": "quantity", "value": "15"},
    ]

#### DELETE Request  



