<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller

{

    public function signup(SignupRequest $request)
    {
        
        $data = $request->validated();
        $user =   User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

      $token =  $user->createToken('main')->plainTextToken;

      return response([
        'user'=>$user,
        'token'=>$token,
      ]);
    }


    public function test(){
        $user = User::all();

        return $user;
    }
    public function login(LoginRequest $request)
    {
       
        $credentials = $request->validated();

        if(!Auth::attempt($credentials)){
            return response([
                'message' =>'Provided email address or password is incorrect'
            ],422);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

       return response(
        [
            'user'=>$user,
            'token'=>$token
        ]
        );


    }


    

    public function logout(Request $request)
    {
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }

    public function signupnew(Request $request){
        $validated = $request->validate(['email'=>'required', 'name'=>'required', 'password'=>'required']);

        if(!$validated){
            return $validated;
        }
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request['password']);
        $user->save();

        return $user;
    }

    public function loginnew(Request $request){
        $validated = $request->validate(['email'=>'email|required', 'password'=>'required']);

        if($validated){
            $user = User::where('email', $request['email']);
             
            if(!$user){
                return ['status'=>false, 'message'=>'email does not exist'];
            }
            if(Hash::check($request->password, $user->password)){
                return ['status'=>true, 'data'=>$user];
            }

        }else{
            return ['status'=>'false', 'message'=>'some fields were required'];
        }
    }
}
