<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;

class ApiController extends Controller
{
    public function getAllClients() {
      $Clients = Client::get()->toJson(JSON_PRETTY_PRINT);
      return response($Clients, 200);
    }

    public function getClient($search) {
      if (Client::where('name', 'LIKE', '%'.$search.'%')
                  ->orwhere('cpf', 'LIKE', '%'.$search.'%')
                  ->exists()) {
        $Client = Client::where('name', 'LIKE', '%'.$search.'%')
                        ->orwhere('cpf', 'LIKE', '%'.$search.'%')
                        ->get()->toJson(JSON_PRETTY_PRINT);
        return response($Client, 200);
      } else {
        return response()->json([
          "message" => "Client not found"
        ], 404);
      }
    }
 
    public function createClient(Request $request) {
      $Client = new Client;
      $Client->name = $request->name;
      $Client->cpf = $request->cpf;      
      $Client->birthDate = $request->birthDate;      
      $Client->phone = $request->phone;            
      $Client->save();

      return response()->json([
        "message" => "Client record created"
      ], 201);
    }

    public function deleteClient ($id) {
      if(Client::where('id', $id)->exists()) {
        $Client = Client::find($id);
        $Client->delete();

        return response()->json([
          "message" => "Cliente deleted"
        ], 202);
      } else {
        return response()->json([
          "message" => "Client not found"
        ], 404);
      }
    }
}