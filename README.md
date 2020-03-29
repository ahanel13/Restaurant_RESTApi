# Restaurant_RESTApi
* [HTTP Verbs](#http-verbs)
* [Error handling](#error-handling)
* [Request & Response Examples](#all-endpoints-and-request/reponse-examples)


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

## All Endpoints and Request/Reponse Examples

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

### /user

Example: http://example.gov/api/v1/magazines/[id].json

Response body:

    {
        "id": "1234",
        "type": "magazine",
        "title": "Public Water Systems",
        "tags": [
            {"id": "125", "name": "Environment"},
            {"id": "834", "name": "Water Quality"}
        ],
        "created": "1231621302"
    }


### /menuItems
Base endpoint: https://dijkstras-steakhouse-restapi.herokuapp.com/menuItems

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

### /user

Example: http://example.gov/api/v1/magazines/[id].json

Response body:

    {
        "id": "1234",
        "type": "magazine",
        "title": "Public Water Systems",
        "tags": [
            {"id": "125", "name": "Environment"},
            {"id": "834", "name": "Water Quality"}
        ],
        "created": "1231621302"
    }

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

### /user

Example: http://example.gov/api/v1/magazines/[id].json

Response body:

    {
        "id": "1234",
        "type": "magazine",
        "title": "Public Water Systems",
        "tags": [
            {"id": "125", "name": "Environment"},
            {"id": "834", "name": "Water Quality"}
        ],
        "created": "1231621302"
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

### /user

Example: http://example.gov/api/v1/magazines/[id].json

Response body:

    {
        "id": "1234",
        "type": "magazine",
        "title": "Public Water Systems",
        "tags": [
            {"id": "125", "name": "Environment"},
            {"id": "834", "name": "Water Quality"}
        ],
        "created": "1231621302"
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

### /user

Example: http://example.gov/api/v1/magazines/[id].json

Response body:

    {
        "id": "1234",
        "type": "magazine",
        "title": "Public Water Systems",
        "tags": [
            {"id": "125", "name": "Environment"},
            {"id": "834", "name": "Water Quality"}
        ],
        "created": "1231621302"
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

### /user

Example: http://example.gov/api/v1/magazines/[id].json

Response body:

    {
        "id": "1234",
        "type": "magazine",
        "title": "Public Water Systems",
        "tags": [
            {"id": "125", "name": "Environment"},
            {"id": "834", "name": "Water Quality"}
        ],
        "created": "1231621302"
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

### /user

Example: http://example.gov/api/v1/magazines/[id].json

Response body:

    {
        "id": "1234",
        "type": "magazine",
        "title": "Public Water Systems",
        "tags": [
            {"id": "125", "name": "Environment"},
            {"id": "834", "name": "Water Quality"}
        ],
        "created": "1231621302"
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

### /user

Example: http://example.gov/api/v1/magazines/[id].json

Response body:

    {
        "id": "1234",
        "type": "magazine",
        "title": "Public Water Systems",
        "tags": [
            {"id": "125", "name": "Environment"},
            {"id": "834", "name": "Water Quality"}
        ],
        "created": "1231621302"
    }