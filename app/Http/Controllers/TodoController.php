<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function createTodo(Request $request){
        $todo = Todo::create($request->all());

        return $todo;


    }

    public function deleteTodo($id){
        $todo = Todo::find($id);

        $todo->delete();
        

        return "deleted $todo";
    }
    public function getTodo(){
        $todo = Todo::all();
        return $todo;
    }
}
