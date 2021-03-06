from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

class Todos(BaseModel):
    id: int
    item: str

    class Config:
        validate_assignment = True


todos = []


app = FastAPI(title="Todo API")

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/", tags=["root"])
async def read_root():
    return {"message": "Welcome to your todo list!"}


@app.get("/todo", tags=["todos"])
async def get_todos():
    return {"data": todos}


@app.post("/todo", tags=["todos"])
async def add_todo(todo: Todos):
    todos.append(todo.dict())
    return {
        "data": "Todo added!"
    }


@app.put("/todo/{id}", tags=["todos"])
async def update_todo(id: int, body: dict) -> dict:
    for todo in todos:
        if todo["id"] == id:
            todo["item"] = body["item"]
            return {
                "data": f"Todo with id {id} has been updated!"
            }
    
    return {
        "data": f"Todo with id {id} not found!"
    }



@app.delete("/todo/{id}", tags=["todos"])
async def delete_todo(id: int, body: dict) -> dict:
    for todo in todos:
        if todo["id"] == id:
            if todo["item"] == body["item"]:
                todos.remove(todo)
                return {
                    "data": f"Todo with id {id} has been removed!"
                }
    
    return {
        "data": f":Todo with id {id} not found!"
    }
