<img src="https://webassets.telerikacademy.com/images/default-source/logos/telerik-academy.svg)" alt="logo" width="300px" style="margin-top: 20px;"/>

## Todo API - Part 1 - Nest Fundamentals, REST, CORS

### Description

You are working with a front-end team to deliver a **Todo app** for a very important client of your organization - **TelerikAcademy**. The front-end team is working hard and already have created a sample of the client side using **jQuery**. Your task is to create a back-end **REST API** for persisting and consuming the **Todo data**.

### General guide

1. Run `npm i -g @nestjs/cli` to install **NestJS** if you haven't
1. Run `nest new todo-api` to create your project
1. With `npm run start:dev` you can serve the application in **watch mode**
1. For this task we are going to modify and use just the generated **AppController**
1. You are provided with a sample **todos data** below that you should use for the task
1. You are provided with the client-side sample project in the **client** folder - we are gonna use it later

### Use Postman

In order to test your api while developing it use the **[Postman](https://www.getpostman.com/downloads/)** tool. We provided a **postman collection** with a couple of sample requests that will help you do that. Don't feel limited by them and try to create your own cases and requests.

1. Open the **Postman** tool
1. Click the **Import** button and choose the **postman_collection.json** file in the **postman** folder
1. Use the imported requests to **test the API** for the different tasks

![postman_import](./../postman/snapshots/postman_import.png)
![postman_collection](./../postman/snapshots/postman_collection.png)

### Tasks

The application should listen for the following requests and return the desired responses. Go to the **AppController** and create the desired **action methods** for handling the requests.

##### 1. GET: /todos

- Description: Return all todos that are not deleted from the system.
- Responses:
  - Status: **200**
    - Description: If everything is OK, return status **200 - OK** with a filtered **todos array** that contains only the todos that are not deleted
    - Content:
      - **application/json**
      - Type: **TodoDTO[]**

##### \*Guide\*

- The **AppController class** should have a method for handling the request - create such method
- In order to suggest to the framework that this is an action method that will handle a request, you should add a **decorator** above it - **Get(), Post(), Put(), Delete()** with the desired resource path - **Get('/todos')**
- In order to suggest the desired status code for the response, you should add another **decorator** - **HttpCode()** with the status code inside it - **HttpCode(200)**
- You should write the logic and return the desired response from the action method
- Nest will automatically serialize the JavaScript object response to **JSON format** for you
- Try it out using **Postman**

```ts
  @Get('/todos')
  @HttpCode(200)
  public allTodos() {
    return todos.filter(todo => !todo.isDeleted);
  }
```

##### 2. POST: /todos

- Description: Add a new todo in the system.
- Body Content:
  - **application/json**
  - Type: **{ name: string, due: string }**
- Responses:
  - Status: **201**
    - Description: If everything is OK, create a new **todo** using the **name** and **due** date sended in the **request body**, store it and return status **201 - Created** with the response **{ msg: 'Todo Added!' }**. The date should be in format - **YYYY-MM-DD**
    - Content:
      - **application/json**
      - Type: **{ msg: string }**
  - Status: **400**
    - Description: If the **name** or the **due** date in the body is invalid, return status **400 - Bad Request** with appropriate message
    - Content:
      - **application/json**
      - Type: **BadRequestException**

##### \*Guide\*

- You can get the **request body** using the **Body() decorator**
- You can return an error response by throwing one of the Nest specific **HttpExceptions** - in this case the **BadRequestException**
- You can validate the incoming date format using the **[moment library](https://momentjs.com/)**

```ts
  import * as moment from 'moment';

  ...

  if (!moment(due, ['YYYY-MM-DD']).isValid()) {
      throw new BadRequestException('Invalid date');
  }
```

##### 3. PUT: /todos/:id

- Description: Find a todo by id and update it with the passed object in the body.
- Path Parameter:
  - Description: The desired todo's id
  - Type: **string**
- Body Content:
  - **application/json**
  - Type: **{ name: string, due: string, isDone: boolean }**
- Responses:
  - Status: **200**
    - Description: If everything is OK, update the desired todo using the properties sended in the **request body** and return status **200 - OK** with the response **{ msg: 'Todo Updated!' }**
    - Content:
      - **application/json**
      - Type: **{ msg: string }**
  - Status: **404**
    - Description: If a todo with such **id** does not exist or it is **deleted**, return status **404 - Not Found** with appropriate message
    - Content:
      - **application/json**
      - Type: **NotFoundException**

##### \*Guide\*

- You can setup a route with path parameter by suggesting it with **todos/:{parameter}**. In our case - **todos/:id**
- You can get the **path parameter** using the **Param() decorator**. We can even specify the exact **id** parameter with **Param('id')**

##### 4. DELETE: /todos/:id

- Description: Find a todo by id and delete it.
- Path Parameter:
  - Description: The desired todo's id
  - Type: **string**
- Responses:
  - Status: **200**
    - Description: If everything is OK, find the desired todo, update its **isDeleted** property and return status **200 - OK** with the response **{ msg: 'Todo Deleted!' }**
    - Content:
      - **application/json**
      - Type: **{ msg: string }**
  - Status: **404**
    - Description: If a todo with such **id** does not exist or it is **deleted**, return status **404 - Not Found** with appropriate message
    - Content:
      - **application/json**
      - Type: **NotFoundException**

### Todo Data

```ts
export class TodoDTO {
  id: number;
  name: string;
  due: string;
  isDone: boolean;
  isDeleted: boolean;
}

export const todos: TodoDTO[] = [
  {
    id: 0,
    name: 'Buy Milk',
    due: '2019-05-02',
    isDone: true,
    isDeleted: false
  },
  {
    id: 1,
    name: 'Learn JavaScript',
    due: '2019-09-02',
    isDone: false,
    isDeleted: false
  }
];
```

### The Client

The provided client-side project and your api are mend to be used together! There are just a couple more steps.

1. Serve the api on **port 3000**
2. Serve the client using the **[live-server vscode package](https://github.com/ritwickdey/vscode-live-server)** or the **[http-server npm package](https://www.npmjs.com/package/http-server)**
3. On the **client console** you should see an error. This is because of the **CORS** policy. To fix that go in the server's **main.ts** and include the following line:

```ts
  async function bootstrap() {

    ...

    app.enableCors();

    ...

  }

  bootstrap();
```

4. Its all done! The **client** and the **server** now should be working together. Go ahead and see your work in action.

### For the curious ones

##### 5. GET: /

- Description: The landing route for the application.
- Responses:
  - Status: **301**
    - Description: Redirect to the main application resource - **/todos**. Research the **Redirect() decorator**

##### 6. GET: /todos?name=learn

- Description: Add an optional **query parameter** to your route that will filter the todos by their name.
- Query Parameter:
  - Description: The filtering name that the returned todos should include. Research the **Query() decorator**
  - Type: **string**
