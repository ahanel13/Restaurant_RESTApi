# Restaurant_RESTApi
* [HTTP Verbs](#http-verbs)
* [Error handling](#error-handling)
* [Request & Response Examples](#all-endpoints-and-request/reponse-examples)
    * [Comps](#comps)
    * [Employees](#employees)
    * [Ingredients](#ingredients)
    * [MenuItems](#menuItems)
    * [Notifications](#notifications)
    * [Orders](#orders)
    * [TimeClock](#timeClock)
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
        {
            "_id": "5e7faa3e016004000436733d",
            "name": "eggs",
            "quantity": 43,
            "__v": 0
        },
        {
            "_id": "5e7fd823a3ba2c0004dda62a",
            "name": "Lettuce",
            "quantity": 23,
            "__v": 0
        },
        {
            "_id": "5e7fd8f8a3ba2c0004dda62b",
            "__v": 0
        },
        {
            "_id": "5e7fd964a3ba2c0004dda62c",
            "name": "Potatos",
            "quantity": 19,
            "__v": 0
        }
        ]
    }

For a single ingredient send request to /ingredients/{ingredient_id}    

#### POST Request
Request body:
    
    {
        "name": "Some ingredient name",
        "quantity": "12" 
    }

#### PATCH Request
Send request to /ingredients/{ingredient_id}    
Request body:
    
    [
        {"propName": "name", "value": "Some other name"},
        {"propName": "quantity", "value": "15"},
    ]

#### DELETE Request  
Request body:
    
    {
        "_id": "5e7fd823a3ba2c0004dda62a"
    }


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
        {
            "_id": "5e7faa3e016004000436733d",
            "name": "eggs",
            "quantity": 43,
            "__v": 0
        },
        {
            "_id": "5e7fd823a3ba2c0004dda62a",
            "name": "Lettuce",
            "quantity": 23,
            "__v": 0
        },
        {
            "_id": "5e7fd8f8a3ba2c0004dda62b",
            "__v": 0
        },
        {
            "_id": "5e7fd964a3ba2c0004dda62c",
            "name": "Potatos",
            "quantity": 19,
            "__v": 0
        }
        ]
    }

For a single ingredient send request to /ingredients/{ingredient_id}    

#### POST Request
Request body:
    
    {
        "name": "Some ingredient name",
        "quantity": "12" 
    }

#### PATCH Request
Send request to /ingredients/{ingredient_id}    
Request body:
    
    [
        {"propName": "name", "value": "Some other name"},
        {"propName": "quantity", "value": "15"},
    ]

#### DELETE Request  
Request body:
    
    {
        "_id": "5e7fd823a3ba2c0004dda62a"
    }


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
            "desctription": "This is a steak and some potatoes",
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
            "desctription": "This is a steak and some potatoes",
            "price": 29.99,
            "nutrition": "Meat, caloires",
            "item_type": "Steak",
            "category": "Entree",
            "paid": false,
            "__v": 0
        }
    ]
    }

For a single ingredient send request to /ingredients/{ingredient_id}    

#### POST Request
Request body:
    
    {
    	"ingredients": [
    		{"_id": "5e7faa3e016004000436733d"},
    		{"_id": "5e7fa943016004000436733c"}
    		],
        "name": "Steak and eggs " ,
        "picture": "This will be a picture" ,
        "desctription": "This is a steak and some potatoes",
        "price": "29.99",
        "nutrition": "Meat, caloires" ,
        "item_type": "Steak" ,
        "category": "Entree",
        "paid": "0",
        "special_instruct": "I want this to be medium-well" 
    }

#### PATCH Request
Send request to /ingredients/{ingredient_id}    
Request body:
    
    [
        {"propName": "name", "value": "Some other name"},
        {"propName": "quantity", "value": "15"},
    ]

#### DELETE Request  
Request body:
    



### /user
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
        {
            "_id": "5e7faa3e016004000436733d",
            "name": "eggs",
            "quantity": 43,
            "__v": 0
        },
        {
            "_id": "5e7fd823a3ba2c0004dda62a",
            "name": "Lettuce",
            "quantity": 23,
            "__v": 0
        },
        {
            "_id": "5e7fd8f8a3ba2c0004dda62b",
            "__v": 0
        },
        {
            "_id": "5e7fd964a3ba2c0004dda62c",
            "name": "Potatos",
            "quantity": 19,
            "__v": 0
        }
        ]
    }

For a single ingredient send request to /ingredients/{ingredient_id}    

#### POST Request
Request body:
    
    {
	    "first_name": "John",
        "last_name": "Smith",
        "email": "JohnSmith01@gmail.com",
        "password": "johnysmithy",
        "birthday": "1971-09-22T00:00:00Z"
    }

#### PATCH Request
Send request to /ingredients/{ingredient_id}    
Request body:
    
    [
        {"propName": "name", "value": "Some other name"},
        {"propName": "quantity", "value": "15"},
    ]

#### DELETE Request  
Request body:
    
    {
        "_id": "5e7fd823a3ba2c0004dda62a"
    }


### /tables
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
        {
            "_id": "5e7faa3e016004000436733d",
            "name": "eggs",
            "quantity": 43,
            "__v": 0
        },
        {
            "_id": "5e7fd823a3ba2c0004dda62a",
            "name": "Lettuce",
            "quantity": 23,
            "__v": 0
        },
        {
            "_id": "5e7fd8f8a3ba2c0004dda62b",
            "__v": 0
        },
        {
            "_id": "5e7fd964a3ba2c0004dda62c",
            "name": "Potatos",
            "quantity": 19,
            "__v": 0
        }
        ]
    }

For a single ingredient send request to /ingredients/{ingredient_id}    

#### POST Request
Request body:
    
    {
        "name": "Some ingredient name",
        "quantity": "12" 
    }

#### PATCH Request
Send request to /ingredients/{ingredient_id}    
Request body:
    
    [
        {"propName": "name", "value": "Some other name"},
        {"propName": "quantity", "value": "15"},
    ]

#### DELETE Request  
Request body:
    
    {
        "_id": "5e7fd823a3ba2c0004dda62a"
    }


### /orders
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
        {
            "_id": "5e7faa3e016004000436733d",
            "name": "eggs",
            "quantity": 43,
            "__v": 0
        },
        {
            "_id": "5e7fd823a3ba2c0004dda62a",
            "name": "Lettuce",
            "quantity": 23,
            "__v": 0
        },
        {
            "_id": "5e7fd8f8a3ba2c0004dda62b",
            "__v": 0
        },
        {
            "_id": "5e7fd964a3ba2c0004dda62c",
            "name": "Potatos",
            "quantity": 19,
            "__v": 0
        }
        ]
    }

For a single ingredient send request to /ingredients/{ingredient_id}    

#### POST Request
Request body:
    
    {
        "name": "Some ingredient name",
        "quantity": "12" 
    }

#### PATCH Request
Send request to /ingredients/{ingredient_id}    
Request body:
    
    [
        {"propName": "name", "value": "Some other name"},
        {"propName": "quantity", "value": "15"},
    ]

#### DELETE Request  
Request body:
    
    {
        "_id": "5e7fd823a3ba2c0004dda62a"
    }


### /employees
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
        {
            "_id": "5e7faa3e016004000436733d",
            "name": "eggs",
            "quantity": 43,
            "__v": 0
        },
        {
            "_id": "5e7fd823a3ba2c0004dda62a",
            "name": "Lettuce",
            "quantity": 23,
            "__v": 0
        },
        {
            "_id": "5e7fd8f8a3ba2c0004dda62b",
            "__v": 0
        },
        {
            "_id": "5e7fd964a3ba2c0004dda62c",
            "name": "Potatos",
            "quantity": 19,
            "__v": 0
        }
        ]
    }

For a single ingredient send request to /ingredients/{ingredient_id}    

#### POST Request
Request body:
    
    {
        "name": "Some ingredient name",
        "quantity": "12" 
    }

#### PATCH Request
Send request to /ingredients/{ingredient_id}    
Request body:
    
    [
        {"propName": "name", "value": "Some other name"},
        {"propName": "quantity", "value": "15"},
    ]

#### DELETE Request  
Request body:
    
    {
        "_id": "5e7fd823a3ba2c0004dda62a"
    }


### /notifications
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
        {
            "_id": "5e7faa3e016004000436733d",
            "name": "eggs",
            "quantity": 43,
            "__v": 0
        },
        {
            "_id": "5e7fd823a3ba2c0004dda62a",
            "name": "Lettuce",
            "quantity": 23,
            "__v": 0
        },
        {
            "_id": "5e7fd8f8a3ba2c0004dda62b",
            "__v": 0
        },
        {
            "_id": "5e7fd964a3ba2c0004dda62c",
            "name": "Potatos",
            "quantity": 19,
            "__v": 0
        }
        ]
    }

For a single ingredient send request to /ingredients/{ingredient_id}    

#### POST Request
Request body:
    
    {
        "name": "Some ingredient name",
        "quantity": "12" 
    }

#### PATCH Request
Send request to /ingredients/{ingredient_id}    
Request body:
    
    [
        {"propName": "name", "value": "Some other name"},
        {"propName": "quantity", "value": "15"},
    ]

#### DELETE Request  
Request body:
    
    {
        "_id": "5e7fd823a3ba2c0004dda62a"
    }

    
### /timeClock
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
        {
            "_id": "5e7faa3e016004000436733d",
            "name": "eggs",
            "quantity": 43,
            "__v": 0
        },
        {
            "_id": "5e7fd823a3ba2c0004dda62a",
            "name": "Lettuce",
            "quantity": 23,
            "__v": 0
        },
        {
            "_id": "5e7fd8f8a3ba2c0004dda62b",
            "__v": 0
        },
        {
            "_id": "5e7fd964a3ba2c0004dda62c",
            "name": "Potatos",
            "quantity": 19,
            "__v": 0
        }
        ]
    }

For a single ingredient send request to /ingredients/{ingredient_id}    

#### POST Request
Request body:
    
    {
        "name": "Some ingredient name",
        "quantity": "12" 
    }

#### PATCH Request
Send request to /ingredients/{ingredient_id}    
Request body:
    
    [
        {"propName": "name", "value": "Some other name"},
        {"propName": "quantity", "value": "15"},
    ]

#### DELETE Request  
Request body:
    
    {
        "_id": "5e7fd823a3ba2c0004dda62a"
    }

        "id": "1234",
        "type": "magazine",
        "title": "Public Water Systems",
        "tags": [
            {"id": "125", "name": "Environment"},
            {"id": "834", "name": "Water Quality"}
        ],
        "created": "1231621302"
    }