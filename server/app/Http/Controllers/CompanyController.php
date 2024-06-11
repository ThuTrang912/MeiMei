<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Contact;
use App\Models\Company;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Storage;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $company = Company::all();
        return response()->json($company, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     *
     */
    public function store(Request $request)
    {
        //
        $company = Company::create($request->all());
        return response()->json($company, 201);

    }

    /**
     * Display the specified resource.
     *
     *
     */
    public function show(string $id)
    {
        //
        $company= Company::find($id);
        return response()->json($company, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $company=Company::find($id);
        if (!$company) {
            return response()->json(['error' => 'User not found'], 404);
        }
        //lay data tu request gan vao company
        $company->fill($request->all()); // Use fill() instead of update() to assign the values

        $company->save();
        return response()->json($company, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
